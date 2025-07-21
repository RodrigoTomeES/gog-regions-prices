const request = require("request");

function testGOGAPI(country = "ES", page = 1) {
  const options = {
    url: `https://www.gog.com/games/ajax/filtered?sort=title&page=${page}`,
    headers: {
      'Cookie': `gog_lc=${country}_USD_en-US; path=/`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    timeout: 10000
  };

  console.log('Testing GOG API with options:', JSON.stringify(options, null, 2));
  
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      console.log('\n=== Response Details ===');
      console.log('Error:', error);
      console.log('Status Code:', response ? response.statusCode : 'No response');
      console.log('Headers:', response ? response.headers : 'No headers');
      console.log('Body length:', body ? body.length : 0);
      console.log('Body preview (first 500 chars):', body ? body.substring(0, 500) : 'No body');
      
      if (error) {
        reject(error);
      } else if (!error && response.statusCode == 200) {
        try {
          const parsed = JSON.parse(body);
          console.log('Successfully parsed JSON');
          console.log('Products count:', parsed.products ? parsed.products.length : 'No products');
          console.log('Total pages:', parsed.totalPages);
          resolve(parsed);
        } catch (parseError) {
          console.log('Failed to parse JSON:', parseError.message);
          reject(parseError);
        }
      } else {
        console.log('Non-200 status code or other error');
        resolve({
          totalPages: 1,
          products: [],
          statusCode: response ? response.statusCode : null
        });
      }
    });
  });
}

// Test the API
testGOGAPI("ES", 1)
  .then(result => {
    console.log('\n=== Success ===');
    console.log('Result:', JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.log('\n=== Error ===');
    console.log('Error:', error.message);
    console.log('Stack:', error.stack);
  });