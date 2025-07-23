const axios = require('axios');

// Static list of free public proxies (these can be updated as needed)
const STATIC_PROXIES = [
  { host: '103.149.162.194', port: 80 },
  { host: '103.149.162.195', port: 80 },
  { host: '185.199.229.156', port: 7492 },
  { host: '185.199.228.220', port: 7300 },
  { host: '185.199.231.45', port: 8382 },
  { host: '188.74.210.207', port: 6286 },
  { host: '188.74.183.10', port: 8279 },
  { host: '188.74.210.21', port: 6100 },
  { host: '45.155.68.129', port: 8133 },
  { host: '154.95.36.199', port: 6893 },
  { host: '45.94.47.66', port: 8110 },
  { host: '194.33.191.118', port: 8080 },
  { host: '103.127.1.130', port: 80 },
  { host: '14.207.120.81', port: 8080 },
  { host: '168.220.196.24', port: 80 },
  { host: '45.183.241.74', port: 999 },
  { host: '181.78.18.219', port: 999 },
  { host: '181.78.105.140', port: 999 },
  { host: '200.105.215.18', port: 33630 },
  { host: '45.169.70.9', port: 8080 },
  // Additional proxies from various sources
  { host: '8.210.83.33', port: 80 },
  { host: '47.74.152.29', port: 8888 },
  { host: '20.111.54.16', port: 80 },
  { host: '139.59.1.14', port: 3128 },
  { host: '182.253.6.204', port: 8080 }
];

// Backup proxy sources that can be tried if static proxies fail
const PROXY_API_SOURCES = [
  'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
  'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
  'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt'
];

class ProxyService {
  constructor() {
    this.proxies = [...STATIC_PROXIES];
    this.currentProxyIndex = 0;
    this.maxRetries = Math.min(5, this.proxies.length);
    this.workingProxies = [];
    this.deadProxies = new Set();
    this.useProxies = process.env.DISABLE_PROXIES !== 'true'; // Allow disabling proxies via env var
  }

  async loadProxies() {
    if (!this.useProxies) {
      console.info('  Proxies disabled via DISABLE_PROXIES environment variable');
      this.proxies = [];
      return false;
    }

    console.info(`  Using ${this.proxies.length} static proxies`);
    
    // Optionally try to load additional proxies from online sources
    if (process.env.LOAD_DYNAMIC_PROXIES === 'true') {
      await this.loadDynamicProxies();
    }
    
    return this.proxies.length > 0;
  }

  async loadDynamicProxies() {
    console.info('  Attempting to load additional proxies from online sources...');
    
    for (const source of PROXY_API_SOURCES) {
      try {
        const response = await axios.get(source, { timeout: 10000 });
        const additionalProxies = response.data
          .split('\n')
          .map(proxy => proxy.trim())
          .filter(proxy => proxy.length > 0 && proxy.includes(':'))
          .slice(0, 20) // Limit to 20 additional proxies per source
          .map(proxy => {
            const [host, port] = proxy.split(':');
            return { host, port: parseInt(port) };
          })
          .filter(proxy => !isNaN(proxy.port));
        
        this.proxies.push(...additionalProxies);
        console.info(`    Loaded ${additionalProxies.length} proxies from ${source}`);
        break; // Use first successful source
      } catch (error) {
        console.warn(`    Failed to load from ${source}: ${error.message}`);
      }
    }
  }

  getNextProxy() {
    if (this.proxies.length === 0 || !this.useProxies) {
      return null;
    }
    
    // Filter out dead proxies
    const availableProxies = this.proxies.filter(proxy => 
      !this.deadProxies.has(`${proxy.host}:${proxy.port}`)
    );
    
    if (availableProxies.length === 0) {
      // Reset dead proxies if all are marked dead
      console.info('  All proxies marked as dead, resetting...');
      this.deadProxies.clear();
      return this.proxies[0];
    }
    
    const proxy = availableProxies[this.currentProxyIndex % availableProxies.length];
    this.currentProxyIndex = (this.currentProxyIndex + 1) % availableProxies.length;
    return proxy;
  }

  markProxyAsDead(proxy) {
    this.deadProxies.add(`${proxy.host}:${proxy.port}`);
  }

  async makeRequest(url, options = {}) {
    let lastError = null;

    // First try with proxies if enabled
    if (this.useProxies && this.proxies.length > 0) {
      for (let proxyAttempt = 0; proxyAttempt < this.maxRetries; proxyAttempt++) {
        const proxy = this.getNextProxy();
        if (proxy) {
          try {
            const axiosConfig = {
              ...options,
              proxy: {
                host: proxy.host,
                port: proxy.port,
              },
              timeout: 8000, // Reduced timeout for faster failover
              validateStatus: (status) => status === 200,
            };
            
            const response = await axios.get(url, axiosConfig);
            // Mark successful proxy as working
            if (!this.workingProxies.find(p => p.host === proxy.host && p.port === proxy.port)) {
              this.workingProxies.push(proxy);
            }
            return response.data;
          } catch (error) {
            lastError = error;
            // Mark this proxy as dead and continue
            this.markProxyAsDead(proxy);
            continue;
          }
        }
      }
    }

    // If all proxies fail or proxies are disabled, try direct connection as fallback
    try {
      const logMessage = this.useProxies ? '  All proxies failed, trying direct connection...' : '  Making direct connection...';
      console.info(logMessage);
      
      const response = await axios.get(url, { 
        ...options, 
        timeout: 15000,
        validateStatus: (status) => status === 200,
      });
      return response.data;
    } catch (error) {
      const errorMessage = lastError ? `Request failed. Last proxy error: ${lastError.message}, Direct error: ${error.message}` : `Request failed: ${error.message}`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = ProxyService;