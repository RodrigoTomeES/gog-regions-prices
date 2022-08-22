const request = require("request");
const fs = require("fs");
const regions = require("./regions");

const gamesDB = `${__dirname}/../public/games.json`;
const salesDB = `${__dirname}/../public/sales.json`;
const lastUpdate = `${__dirname}/../public/lastUpdate.json`;
const GRACE_TIME = 750;

updateGOGGames();

async function updateGOGGames(maxPages = undefined) {
  console.info(
    `Retrieving information from GOG with Max Pages set to ${maxPages}`
  );
  console.info(" Reading DB...");

  let gamesJSON = null;

  try {
    gamesJSON = fs.readFileSync(gamesDB, "utf-8");
  } catch (err) {
    console.error("  DB doesn't exist, creating...");
  }

  console.info(" Obtaining games prices...");
  const games = await Promise.all(
    regions.map(async (country) => await getGames(country, maxPages))
  );

  console.info(" Putting everything together...");
  const [newGames, newSales] = joinPrices(...games);

  if (
    gamesJSON === null ||
    gamesJSON.localeCompare(JSON.stringify(newGames)) != 0
  ) {
    console.info(" SOME DIFFERENCES FOUND, writing to disk...");
    fs.writeFileSync(gamesDB, JSON.stringify(newGames));
    fs.writeFileSync(salesDB, JSON.stringify(newSales));
    fs.writeFileSync(
      lastUpdate,
      JSON.stringify({ last: new Date().toISOString() })
    );
  } else {
    console.info(" NOTHING CHANGED SINCE LAST RUN, aborting...");
  }
}

function getGames(country, maxPages) {
  return new Promise(async (resolve, _) => {
    let page = 1,
      totalPages = maxPages,
      games = new Map();

    do {
      if (page % 10 == 1) console.info(`  ${country} - Page ${page}`);
      const result = await getGOGData(country, page);
      totalPages = totalPages || result.totalPages;

      result.products
        .filter((product) => product.isGame)
        .forEach((product) => {
          const mapped = {
            id: product.id,
            title: product.title,
            category: product.category,
            url: product.url,
            image: product.image,
            price: product.price.baseAmount,
            country: country,
          };

          if (product.price.baseAmount != product.price.finalAmount) {
            mapped.sale = product.price.finalAmount;
          }

          games.set(product.id, mapped);
        });

      await sleep(GRACE_TIME);
    } while (page++ != totalPages);

    resolve(games);
  });
}

function getGOGData(country, page) {
  return new Promise((resolve, reject) => {
    request(options(country, page), (error, response, body) => {
      if (error || response.statusCode == 500) {
        reject(error);
      } else if (!error && response.statusCode == 200 && IsJsonString(body)) {
        resolve(JSON.parse(body));
      } else {
        resolve({
          totalPages: 1,
          products: [],
        });
      }
    });
  });
}

const orderByID = (a, b) => a.id - b.id;
const orderByPrice = (a, b) => a.price - b.price;

function options(country = "RU", page = 1) {
  return {
    url: `https://www.gog.com/games/ajax/filtered?sort=title&page=${page}`,
    headers: {
      Cookie: "gog_lc=" + country + "_USD_en-US; path=/",
    },
  };
}

function joinPrices(first, ...args) {
  const newGames = [];
  const newSales = [];

  for (const [key, game] of first) {
    const info = {
      id: game.id,
      title: game.title,
      category: game.category,
      url: game.url,
      image: game.image,
      price: {},
    };

    info.price[game.country] = { price: game.price, country: game.country };

    if (game.hasOwnProperty("sale")) {
      info.sale = {};
      info.sale[game.country] = game.sale;
    }

    args.forEach((mapGamesOfCountry) => {
      if (mapGamesOfCountry.has(key)) {
        const gameOtherCountry = mapGamesOfCountry.get(key);
        info.price[gameOtherCountry.country] = {
          price: gameOtherCountry.price,
          country: gameOtherCountry.country,
        };

        if (gameOtherCountry.hasOwnProperty("sale")) {
          info.sale[gameOtherCountry.country] = gameOtherCountry.sale;
        }
      }
    });

    info.price = Object.values(info.price)
      .sort(orderByPrice)
      .reduce((obj, item) => {
        obj[item.country] = info.price[item.country].price;
        return obj;
      }, {});

    newGames.push(info);

    if (game.sale) newSales.push(info);
  }

  return [newGames.sort(orderByID), newSales.sort(orderByID)];
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
