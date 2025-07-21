<img src="public/favicon.svg" align="right" alt="GOG Regions Logo" width="150" height="150" />

# GOG Regions Prices

A WebApp where you can see the price of a given game on GOG's platform in all regions, so you can compare the difference in the price and choose where to buy the game.

**Since v2.4.1 the webpage only scrap this countries: ES, RU, AR, CN, SE, AM, NO and BR.**

## How does it work?

Using GitHub actions and a cron job, it obtains the prices for all games from all regions and saves them in the repo. Using that information, a simple web consumes this data to show the best deals when it comes to regional pricing between those countries

## Development workflow

```bash
# Installation
git clone https://github.com/RodrigoTomeES/gog-regions-prices.git
cd gog-regions-prices
npm install

# Test GOG API connectivity (recommended before extraction)
npm run validate-api

# Extract GOG data (requires internet access)
npm run extract

# Development with Hot Reloading
npm run dev

# Build
npm run build
```

## Troubleshooting GOG API Issues

If you encounter issues with the GOG API extraction:

1. **Test API connectivity first:**
   ```bash
   npm run validate-api
   ```

2. **Check for common issues:**
   - Network connectivity problems
   - GOG API endpoint changes
   - Rate limiting or IP blocking
   - Temporary GOG API downtime

3. **The system automatically tries multiple endpoints:**
   - `https://www.gog.com/games/ajax/filtered` (primary)
   - `https://gog.com/games/ajax/filtered` (fallback)
   - `https://api.gog.com/games/filtered` (API subdomain)
   - `https://www.gog.com/api/games/filtered` (API path)

## Recent Updates

**v2.5.0+**: Fixed GOG API integration issues by:
- Replacing deprecated `request` library with modern `axios`
- Adding fallback endpoint support for API resilience
- Improving error handling and logging
- Adding modern HTTP headers for better compatibility

## Resorces

- [GOG Russian Prices](https://github.com/Dionakra/gog-russian-prices) - Original Code
- [Flags Icons](https://github.com/lipis/flag-icons) - Flags in SVG
- [GOG SVG](https://commons.wikimedia.org/wiki/File:GOG.com_logo.svg) - GOG Logo

## Built with

- [Svelte](https://svelte.dev/) - Frontend Framework
- [Tailwind](https://tailwindcss.com/) - CSS Framework
