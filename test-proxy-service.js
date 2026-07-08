/**
 * Test script to verify proxy functionality
 * This script can be run to test if the proxy service works with a simple HTTP request
 */

const ProxyService = require('./src/proxy-service');

async function testWithSimpleEndpoint() {
  console.log('Testing proxy service with a simple HTTP endpoint...');
  
  const proxyService = new ProxyService();
  await proxyService.loadProxies();
  
  try {
    // Test with a simple endpoint that returns JSON
    const testUrl = 'https://httpbin.org/json';
    const result = await proxyService.makeRequest(testUrl);
    console.log('✅ Successfully made request through proxy service');
    console.log('Response preview:', JSON.stringify(result).substring(0, 100) + '...');
    return true;
  } catch (error) {
    console.error('❌ Failed to make request:', error.message);
    return false;
  }
}

async function testGOGEndpoint() {
  console.log('\nTesting with actual GOG endpoint...');
  
  const proxyService = new ProxyService();
  await proxyService.loadProxies();
  
  try {
    const headers = {
      Cookie: "gog_lc=ES_USD_en-US; path=/",
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://www.gog.com/games',
      'X-Requested-With': 'XMLHttpRequest'
    };
    
    const result = await proxyService.makeRequest(
      'https://www.gog.com/games/ajax/filtered?sort=title&page=1', 
      { headers }
    );
    
    const parsed = JSON.parse(result);
    if (parsed.products && parsed.products.length > 0) {
      console.log('✅ Successfully retrieved GOG data');
      console.log(`Found ${parsed.products.length} products`);
      return true;
    } else {
      console.log('⚠️  Got response but no products found');
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to get GOG data:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('PROXY SERVICE TEST SUITE');
  console.log('='.repeat(60));
  
  const simpleTest = await testWithSimpleEndpoint();
  const gogTest = await testGOGEndpoint();
  
  console.log('\n' + '='.repeat(60));
  console.log('TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`Simple endpoint test: ${simpleTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`GOG endpoint test:    ${gogTest ? '✅ PASS' : '❌ FAIL'}`);
  
  if (simpleTest && gogTest) {
    console.log('\n🎉 All tests passed! The proxy service should work in GitHub Actions.');
  } else if (simpleTest && !gogTest) {
    console.log('\n⚠️  Proxy service works, but GOG may be blocking requests.');
    console.log('This suggests the solution should help in GitHub Actions environment.');
  } else {
    console.log('\n❌ Tests failed. Check network connectivity and proxy availability.');
  }
}

if (require.main === module) {
  runTests().catch(console.error);
}