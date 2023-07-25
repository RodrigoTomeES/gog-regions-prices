const request = require("request");
const fs = require("fs");
const regions = require("./regions");

const gamesDB = `${__dirname}/../public/games.json`;
const salesDB = `${__dirname}/../public/sales.json`;
const lastUpdate = `${__dirname}/../public/lastUpdate.json`;
const GRACE_TIME = 200;
const MAX_RETRIES = 25;
const COUNTRY_OF_REFERENCE = "ES";

updateGOGGames();

async function updateGOGGames(maxPages = undefined) {
  console.time("updateGOGGames");
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

  const games = [];
  const regionsLength = regions.length;

  for (let i = 0; i < regionsLength; i++) {
    const country = regions[i];
    const countryGames = await getGames(country, maxPages);
    games.push(countryGames);
  }

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

  console.timeEnd("updateGOGGames");
}

function getGames(country, maxPages) {
  return new Promise(async (resolve, reject) => {
    const games = new Map();
    let page = 1,
      totalPages = maxPages;

    do {
      const currentPage = `${country} - Page ${page}`;
      let currentRetry = 0;
      let hasError = false;

      if (page % 10 == 1) console.info(`  ${currentPage}`);

      const getResult = async (country, page) => {
        const result = await getGOGData(country, page);

        if (result.products.length === 0)
          throw Error("GOG blocked the API call");

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
      };

      do {
        try {
          await getResult(country, page);
          hasError = false;
        } catch (error) {
          currentRetry++;
          hasError = true;
          console.error(
            `  There was an error getting games of ${currentPage} (Retry: ${currentRetry}), retrying...`
          );
          await sleep(randomGraceTime(GRACE_TIME, GRACE_TIME * currentRetry));
        }
      } while (currentRetry < MAX_RETRIES && hasError);

      if (hasError)
        reject(new Error(`Games could not be retrieved of ${currentPage}`));

      await sleep(GRACE_TIME);
    } while (page++ !== totalPages);

    resolve(games);
  });
}

function getGOGData(country, page) {
  return new Promise((resolve, reject) => {
    request(options(country, page), (error, response, body) => {
      if (error || response.statusCode === 500) {
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
const percentOfDiscount = (countryPrice, userCountryPrice) =>
  Math.round(
    (100 - (countryPrice * 100) / userCountryPrice + Number.EPSILON) * 100
  ) / 100;

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
      info.sale[game.country] = {
        price: game.sale,
        country: game.country,
      };
    }

    args.forEach((mapGamesOfCountry) => {
      if (mapGamesOfCountry.has(key)) {
        const gameOtherCountry = mapGamesOfCountry.get(key);
        info.price[gameOtherCountry.country] = {
          price: gameOtherCountry.price,
          country: gameOtherCountry.country,
        };

        if (gameOtherCountry.hasOwnProperty("sale")) {
          info.sale[gameOtherCountry.country] = {
            price: gameOtherCountry.sale,
            country: gameOtherCountry.country,
          };
        }
      }
    });

    info.price = Object.values(info.price)
      .sort(orderByPrice)
      .reduce((obj, item) => {
        obj[item.country] = info.price[item.country].price;
        return obj;
      }, {});

    if (info.hasOwnProperty("sale")) {
      info.sale = Object.values(info.sale)
        .sort(orderByPrice)
        .reduce((obj, item) => {
          obj[item.country] = info.sale[item.country].price;
          return obj;
        }, {});

      const CHEAPEST_COUNTRY = Object.keys(info.sale)[0];
      info["discount-rate"] = percentOfDiscount(
        info.sale[CHEAPEST_COUNTRY],
        info.sale[COUNTRY_OF_REFERENCE]
      );
    } else {
      const CHEAPEST_COUNTRY = Object.keys(info.price)[0];
      info["discount-rate"] = percentOfDiscount(
        info.price[CHEAPEST_COUNTRY],
        info.price[COUNTRY_OF_REFERENCE]
      );
    }

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

function randomGraceTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
