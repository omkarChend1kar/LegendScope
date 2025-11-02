# 🏆 LegendScope - League of Legends Analytics Platform

LegendScope is a comprehensive React TypeScript web application that provides League of Legends players with detailed analytics, insights, and social features to enhance their gaming experience.

## ✨ Features

### 🎯 Player Insights
- **Persistent Strengths & Weaknesses Analysis**: AI-powered analysis of your gameplay patterns
- **Performance Metrics**: Detailed statistics on mechanical skill, strategic thinking, and teamwork
- **Personalized Recommendations**: Actionable advice to improve your gameplay

### 📊 Progress Visualizations
- **Rank Progress Tracking**: Visual representation of your climbing journey
- **Skill Development Charts**: Track improvement in specific areas over time
- **Win Rate Analysis**: Detailed breakdowns by champion, role, and timeframe

### 🎉 Year-End Summaries
- **Most-Played Champions**: Your champion preferences and performance
- **Biggest Improvements**: Celebrate your growth throughout the year
- **Highlight Matches**: Your best performances and memorable games
- **Achievement Gallery**: Unlock and showcase your accomplishments

### 👥 Social Features
- **Friend Comparisons**: See how you stack up against friends
- **Playstyle Compatibility**: Find compatible duo partners
- **Shareable Moments**: Create social media content from your achievements
- **Community Integration**: Connect across Discord, Twitter, and more

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Riot Games API Key (for live data)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables** (Optional)
   ```bash
   # Add your Riot Games API key for live data
   echo "VITE_RIOT_API_KEY=your_api_key_here" >> .env
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── charts/         # Data visualization components
│   └── PlayerSearch/   # Player search functionality
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── services/           # API services and data fetching
├── store/              # Zustand state management
├── styles/             # Global styles and theme
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Architecture Highlights

- **Clean Architecture**: Separation of concerns with clear layer boundaries
- **Component-Based Design**: Reusable, composable UI components
- **Type Safety**: Full TypeScript implementation with strict mode
- **State Management**: Zustand for efficient, simple state management
- **Styled Components**: CSS-in-JS with League of Legends theming
- **Responsive Design**: Mobile-first approach with breakpoint system

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#C8AA6E` - Inspired by League's prestigious elements
- **Mystical Blue**: `#0596AA` - Strategic and analytical feel
- **Accent Purple**: `#9D4EDD` - Magical and engaging highlights
- **Role Colors**: Unique colors for each League position

### Typography
- **Primary**: Cinzel (elegant serif for headings)
- **Secondary**: Inter (clean sans-serif for body text)  
- **Monospace**: JetBrains Mono (stats and code)

## 🌟 Key Technologies

- **React 19** - Latest React with Concurrent Features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Styled Components** - CSS-in-JS styling
- **Zustand** - Lightweight state management
- **Recharts** - Data visualization library
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon library

---

<div align="center">

**Built with ❤️ for the League of Legends community**

</div>
