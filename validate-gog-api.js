#!/usr/bin/env node
/**
 * GOG API Test Script
 * 
 * Run this script to test if the GOG API is accessible from your environment.
 * Usage: node validate-gog-api.js
 */

const axios = require("axios");

const GOG_API_ENDPOINTS = [
  'https://www.gog.com/games/ajax/filtered',
  'https://gog.com/games/ajax/filtered',
  'https://api.gog.com/games/filtered',
  'https://www.gog.com/api/games/filtered',
];

async function validateGOGAPI() {
  console.log('🔍 Testing GOG API endpoints...\n');
  
  let workingEndpoint = null;
  
  for (const endpoint of GOG_API_ENDPOINTS) {
    try {
      console.log(`Testing: ${endpoint}`);
      
      const response = await axios({
        method: 'GET',
        url: `${endpoint}?sort=title&page=1`,
        headers: {
          'Cookie': 'gog_lc=ES_USD_en-US; path=/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 10000,
      });

      if (response.status === 200 && response.data && response.data.products) {
        console.log(`✅ SUCCESS: ${endpoint}`);
        console.log(`   Products found: ${response.data.products.length}`);
        console.log(`   Total pages: ${response.data.totalPages}`);
        workingEndpoint = endpoint;
        break;
      } else {
        console.log(`⚠️  Unexpected response format from ${endpoint}`);
      }
    } catch (error) {
      console.log(`❌ FAILED: ${endpoint}`);
      console.log(`   Error: ${error.message}`);
    }
    console.log('');
  }
  
  if (workingEndpoint) {
    console.log('🎉 GOG API is accessible!');
    console.log(`Working endpoint: ${workingEndpoint}`);
    console.log('\nYou can now run: npm run extract');
  } else {
    console.log('💥 No working GOG API endpoints found.');
    console.log('\nPossible causes:');
    console.log('1. Network connectivity issues');
    console.log('2. GOG has changed their API endpoints');
    console.log('3. Your IP might be blocked by GOG');
    console.log('4. GOG API might be temporarily down');
    console.log('\nTry running this script again later or check your network connection.');
  }
}

if (require.main === module) {
  validateGOGAPI().catch(console.error);
}

module.exports = { validateGOGAPI };