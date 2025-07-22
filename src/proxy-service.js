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
  { host: '45.169.70.9', port: 8080 }
];

class ProxyService {
  constructor() {
    this.proxies = [...STATIC_PROXIES];
    this.currentProxyIndex = 0;
    this.maxRetries = 3;
    this.workingProxies = [];
    this.deadProxies = new Set();
  }

  async loadProxies() {
    console.info(`  Using ${this.proxies.length} static proxies`);
    return this.proxies.length > 0;
  }

  getNextProxy() {
    if (this.proxies.length === 0) {
      return null;
    }
    
    // Filter out dead proxies
    const availableProxies = this.proxies.filter(proxy => 
      !this.deadProxies.has(`${proxy.host}:${proxy.port}`)
    );
    
    if (availableProxies.length === 0) {
      // Reset dead proxies if all are marked dead
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
    // First try with proxies
    for (let proxyAttempt = 0; proxyAttempt < Math.min(this.maxRetries, this.proxies.length); proxyAttempt++) {
      const proxy = this.getNextProxy();
      if (proxy) {
        try {
          const axiosConfig = {
            ...options,
            proxy: {
              host: proxy.host,
              port: proxy.port,
            },
            timeout: 10000, // Reduced timeout for faster failover
            validateStatus: (status) => status === 200,
          };
          
          const response = await axios.get(url, axiosConfig);
          return response.data;
        } catch (error) {
          // Mark this proxy as dead and continue
          this.markProxyAsDead(proxy);
          continue;
        }
      }
    }

    // If all proxies fail, try direct connection as fallback
    try {
      console.info('  All proxies failed, trying direct connection...');
      const response = await axios.get(url, { 
        ...options, 
        timeout: 15000,
        validateStatus: (status) => status === 200,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}

module.exports = ProxyService;