# GOG Russian Prices

A WebApp where you can see the price of a given game on GOG's platform in all regions, so you can compare the difference in the price and choose where to buy the game.

## How does it work?

Using GitHub actions and a cron job, it obtains the prices for all games from all regions and saves them in the repo. Using that information, a simple web consumes this data to show the best deals when it comes to regional pricing between those countries

## Development workflow

```bash
# Installation
git clone https://github.com/RodrigoTomeES/gog-regions-prices.git
cd gog-regions-prices
npm install

# Development with Hot Reloading
npm run dev

# Build
npm run build
```

## Resorces

- [GOG Russian Prices](https://github.com/Dionakra/gog-russian-prices) - Original Code
- [Flags Icons](https://github.com/lipis/flag-icons) - Flags in SVG

## Built with

- [Svelte](https://svelte.dev/) - Frontend Framework
- [Tailwind](https://tailwindcss.com/) - CSS Framework
