# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

```bash
# Development
bun dev          # Start development server at http://localhost:5173
bun build        # Build production bundle in dist/
bun preview      # Preview production build locally
bun deploy       # Deploy to GitHub Pages

# Package management
bun install      # Install dependencies
bun update       # Update dependencies
```

## Project Overview

**Prescription Helper** - A React-based medication management application for patients to calculate dosages, track follow-up appointments, and manage checklists. All data persists in browser localStorage.

## Architecture

### Tech Stack
- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: Lucide React
- **Package Manager**: bun

### Key Features
1. **Appointment Calculator**: Calculates follow-up dates based on appointment date and weeks interval
2. **Medication List**: Manages medications with automatic dosage calculations
3. **Checklist**: Track pre-appointment tasks
4. **Theme System**: Light/dark mode toggle with persistent preference
5. **Font Size**: Normal/large font options with persistent preference

### Data Model

Located in `types.ts`:
- `Medication`: { id, name, dailyDosage, pillsPerBox, notes }
- `ChecklistItem`: { id, text, completed }
- `Theme`: 'light' | 'dark'
- `FontSize`: 'normal' | 'large'

### File Structure

```
prescription-helper/
├── components/           # React components (TypeScript)
│   ├── Header.tsx       # Theme/font controls, app title
│   ├── AppointmentCalculator.tsx  # Date calculation logic
│   ├── MedicationList.tsx        # CRUD operations for medications
│   ├── Checklist.tsx             # Todo list functionality
│   ├── ConfirmModal.tsx          # Reusable confirmation dialog
│   └── icons.tsx                 # Custom icon components
├── App.tsx              # Main app component, state management
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration (GitHub Pages base path)
└── tsconfig.json        # TypeScript configuration
```

### State Management

All state managed via React hooks with localStorage persistence:
- `appointmentDate`: string (ISO date format)
- `followUpWeeks`: number (default: 4)
- `medications`: Medication[]
- `checklistItems`: ChecklistItem[]
- `theme`: Theme
- `fontSize`: FontSize

State changes automatically sync to localStorage via useEffect hooks.

### Component Patterns

**Props Pattern**: All components receive typed props interfaces
**Calculation Logic**: Medication calculations use `totalDays = followUpWeeks * 7`
**Styling**: Consistent Tailwind classes with dark mode variants
**Font Size**: Dynamic styling based on fontSize prop

### Deployment

GitHub Pages configured via `homepage` field in package.json and `base` in vite.config.ts. Deploy with `bun run deploy` which runs build + gh-pages deployment.

### Development Notes

- All data stored locally in browser localStorage
- No backend dependencies
- Responsive design works on mobile/desktop
- Chinese language interface (繁體中文)
- Uses native browser APIs for date formatting (`zh-TW` locale)