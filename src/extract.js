const fs = require("fs");
const regions = require("./regions");

const gamesDB = `${__dirname}/../public/games.json`;
const salesDB = `${__dirname}/../public/sales.json`;
const lastUpdate = `${__dirname}/../public/lastUpdate.json`;
const GRACE_TIME = 200;
const MAX_RETRIES = 25;
const COUNTRY_OF_REFERENCE = "ES";

// Potential GOG API endpoints to try (in order of preference)
const GOG_API_ENDPOINTS = [
  'https://www.gog.com/games/ajax/filtered',
  'https://gog.com/games/ajax/filtered',
  'https://api.gog.com/games/filtered',
  'https://www.gog.com/api/games/filtered',
];

let workingEndpoint = null;

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

async function findWorkingEndpoint() {
  if (workingEndpoint) {
    return workingEndpoint;
  }

  console.info(" Testing GOG API endpoints...");
  
  for (const endpoint of GOG_API_ENDPOINTS) {
    try {
      console.info(`  Testing: ${endpoint}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(`${endpoint}?sort=title&page=1`, {
        method: 'GET',
        headers: {
          'Cookie': 'gog_lc=ES_USD_en-US; path=/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Accept-Language': 'en-US,en;q=0.9',
          'X-Requested-With': 'XMLHttpRequest'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok && response.status < 500) {
        const data = await response.json();
        if (data && data.products) {
          console.info(`  ✅ Found working endpoint: ${endpoint}`);
          workingEndpoint = endpoint;
          return endpoint;
        }
      }
    } catch (error) {
      console.info(`  ❌ ${endpoint} failed: ${error.message}`);
    }
  }

  throw new Error('No working GOG API endpoints found. GOG may have changed their API.');
}

async function getGOGData(country, page) {
  const endpoint = await findWorkingEndpoint();
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${endpoint}?sort=title&page=${page}`, {
      method: 'GET',
      headers: {
        'Cookie': `gog_lc=${country}_USD_en-US; path=/`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'X-Requested-With': 'XMLHttpRequest'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok && response.status < 500) {
      const data = await response.json();
      
      if (data && typeof data === 'object' && data.products) {
        return data;
      } else {
        console.warn(`Unexpected response format for ${country} page ${page}`);
        return {
          totalPages: 1,
          products: [],
        };
      }
    } else {
      console.warn(`Non-200 response: ${response.status} for ${country} page ${page}`);
      return {
        totalPages: 1,
        products: [],
      };
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`Request failed for ${country} page ${page}:`, error.message);
    throw error;
  }
}

const orderByID = (a, b) => a.id - b.id;
const orderByPrice = (a, b) => a.price - b.price;
const percentOfDiscount = (countryPrice, userCountryPrice) =>
  Math.round(
    (100 - (countryPrice * 100) / userCountryPrice + Number.EPSILON) * 100
  ) / 100;


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
          if (!info.hasOwnProperty("sale")) info.sale = {};

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

function randomGraceTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
