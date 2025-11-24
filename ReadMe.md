# Aurora Focus App

A beautiful productivity and focus timer application built with Next.js, React, and TypeScript.

## Features

- ⏱️ **Pomodoro Timer** - Focus and break timer with customizable durations
- ✅ **Task Management** - Create and manage tasks with priority levels
- 📊 **Statistics & Analytics** - Track your focus time and productivity
- 🔥 **Streak Tracking** - Maintain your daily focus streak
- 🎵 **Music Player Integration** - Spotify integration for focus music
- 🌓 **Dark/Light Mode** - Beautiful theme switching
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aurora-focus-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Main page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── ui/          # UI component library
│   └── ...          # Feature components
├── public/          # Static assets
├── lib/             # Utility functions
└── hooks/           # Custom React hooks
```

## Features Overview

### Timer Section
- Customizable focus and break durations
- Fullscreen mode for distraction-free focus
- Session tracking and completion counter

### Task Management
- Add, edit, and delete tasks
- Priority levels (High, Medium, Low)
- Task completion tracking

### Statistics
- Daily/weekly focus time tracking
- Task completion statistics
- Visual charts and progress indicators

### Streak System
- Track consecutive days of focus
- Best streak record
- Motivation through gamification

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint
```

## License

This project is created for educational purposes.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)