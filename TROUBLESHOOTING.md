# Troubleshooting Guide for GOG API Proxy Solution

## Quick Test

To test if the proxy service is working locally:

```bash
npm run test:proxy
```

## Configuration Options

### Environment Variables

- `DISABLE_PROXIES=true` - Completely disable proxy usage and use direct connections
- `LOAD_DYNAMIC_PROXIES=true` - Load additional proxies from online sources (enabled in GitHub Actions)

### Local Testing

```bash
# Test with direct connections only
DISABLE_PROXIES=true npm run extract

# Test with dynamic proxy loading
LOAD_DYNAMIC_PROXIES=true npm run extract

# Normal operation with static proxies
npm run extract
```

## Common Issues and Solutions

### 1. All Proxies Are Dead
- The service automatically resets dead proxy tracking when all proxies fail
- Consider updating the proxy list in `src/proxy-service.js`
- Enable dynamic proxy loading: `LOAD_DYNAMIC_PROXIES=true`

### 2. GitHub Actions Still Failing
- Check if the error messages indicate proxy timeouts vs. IP blocking
- Consider adding more proxy sources to `PROXY_API_SOURCES` array
- Temporarily disable proxies to test: `DISABLE_PROXIES=true`

### 3. Slow Performance
- Adjust timeouts in `src/proxy-service.js` (currently 8 seconds for proxies, 15 for direct)
- Modify `MAX_CONCURRENT_REGIONS` in `src/extract.js` (currently 2)
- Adjust `MAX_RETRIES` if needed (currently 15)

## Updating Proxy Lists

### Static Proxies
Edit the `STATIC_PROXIES` array in `src/proxy-service.js`:

```javascript
const STATIC_PROXIES = [
  { host: 'new-proxy-ip', port: 8080 },
  // ... existing proxies
];
```

### Dynamic Sources
Add new proxy sources to `PROXY_API_SOURCES` array:

```javascript
const PROXY_API_SOURCES = [
  'https://your-proxy-source.com/proxies.txt',
  // ... existing sources
];
```

## Monitoring

The service provides detailed logging:
- Proxy loading status
- Success/failure per region
- Fallback to direct connections
- Error details for debugging

## Alternative Solutions

If proxies continue to fail:

1. **Use a proxy service**: Services like ProxyMesh, Bright Data, or similar
2. **GitHub Actions with different runners**: Use self-hosted runners with different IPs
3. **External service**: Move extraction to a external service with rotating IPs
4. **API keys**: Check if GOG offers an official API with authentication

## Testing in Production

The GitHub Actions workflow now includes `LOAD_DYNAMIC_PROXIES=true` by default. Monitor the workflow logs for:

- Proxy loading success/failure
- Request success rates
- Error patterns

## Support

If issues persist, check:
1. Recent proxy list updates from community sources
2. GOG's robots.txt or API terms changes
3. Consider reaching out to GOG for official API access