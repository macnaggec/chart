# A/B Test Interactive Line Chart

An interactive line chart for visualizing A/B test conversion rate statistics, built with React, TypeScript, and Recharts.

## Visualization Library

**Recharts** - A composable charting library built on React components with excellent TypeScript support and customization options.

## Features

### Core Features

- ✅ Conversion rate line chart displaying all variations as percentages
- ✅ Hover interactions with vertical cursor line and tooltip popup
- ✅ Variations selector (minimum one variation always selected)
- ✅ Auto-scaling X and Y axes based on visible data
- ✅ Day / Week timeframe selector

### Bonus Features

- ✅ Zoom / Reset zoom (drag to select area)
- ✅ Line style selector (Linear, Monotone, Area, Glow)
- ✅ Light / Dark theme toggle
- ✅ Export chart to PNG

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- Recharts (charting)
- CSS Modules (styling)

## Local Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/macnaggec/chart.git
cd chart

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |

## License

MIT
