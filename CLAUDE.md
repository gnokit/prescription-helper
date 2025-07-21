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

# Type checking and debugging
bun tsc --noEmit # TypeScript type checking
bun run build    # Also runs type checking as part of build process
```

## Project Overview

**Prescription Helper** - A React-based medication management application for patients to calculate dosages, track follow-up appointments, and manage checklists. All data persists in browser localStorage.

## Architecture

### Tech Stack
- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with dark mode support
- **Icons**: Lucide React
- **Package Manager**: bun

### Core Architecture Patterns

**State Management**: Centralized in `App.tsx` using React hooks with localStorage persistence via useEffect hooks. Each state variable has dedicated localStorage sync.

**Component Communication**: 
- Top-down props passing from App.tsx to child components
- Callback functions for state updates (setMedications, setChecklistItems, etc.)
- Shared calculation logic via props (e.g., totalDays = followUpWeeks * 7)

**Persistence Layer**: Browser localStorage with JSON serialization. All state auto-saves on change with error handling for JSON.parse failures.

### Key Features
1. **Appointment Calculator**: Calculates follow-up dates based on appointment date and weeks interval
2. **Medication List**: Manages medications with automatic dosage calculations
3. **Checklist**: Track pre-appointment tasks
4. **Theme System**: Light/dark mode toggle with persistent preference and DOM class manipulation
5. **Font Size**: Normal/large font options with persistent preference and dynamic CSS updates

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
│   ├── Header.tsx       # Theme/font controls, app title, clear data button
│   ├── AppointmentCalculator.tsx  # Date calculation logic with zh-TW locale
│   ├── MedicationList.tsx        # CRUD operations for medications with dosage calculations
│   ├── Checklist.tsx             # Todo list functionality with add/delete/mark complete
│   ├── ConfirmModal.tsx          # Reusable confirmation dialog for destructive actions
│   └── icons.tsx                 # Custom icon components (currently empty)
├── App.tsx              # Main app component, centralized state management
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration (GitHub Pages base path '/prescription-helper/')
├── tsconfig.json        # TypeScript configuration
└── index.css            # Global styles and Tailwind imports
```

### State Management Details

**State Variables** (all with localStorage persistence):
- `appointmentDate`: string (ISO date format, defaults to today)
- `followUpWeeks`: number (default: 4 weeks)
- `medications`: Medication[] (JSON parsed from localStorage)
- `checklistItems`: ChecklistItem[] (JSON parsed from localStorage)
- `theme`: Theme (affects document.documentElement classList)
- `fontSize`: FontSize (affects document.body.style.fontSize)

**State Update Patterns**:
- Direct state setters from useState hooks
- useEffect hooks automatically sync changes to localStorage
- No custom hooks or context - simple props-based architecture

### Component Patterns

**Props Interface Pattern**: Each component exports typed props interface for TypeScript safety
**Calculation Logic**: Medication calculations use `totalDays = followUpWeeks * 7` passed as prop
**Styling**: Consistent Tailwind classes with dark: variants, responsive design (p-4 sm:p-6 md:p-8)
**Font Size**: Dynamic styling based on fontSize prop passed to all components
**Modal Pattern**: ConfirmModal uses isOpen/onClose/onConfirm callback pattern

### Component-Specific Patterns

**Single-File Components**: All components defined in single .tsx files with inline interfaces
**Prop Drilling**: State and callbacks passed explicitly through component tree via props
**Direct DOM Manipulation**: Theme and font size changes applied directly to document.documentElement/document.body
**Hardcoded i18n**: All UI text in Traditional Chinese (繁體中文) with no i18n framework

### Responsive Design System

**Breakpoints**: 
- Mobile: < 640px (default mobile-first approach)
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Spacing Pattern**: Consistent p-4 → sm:p-6 → md:p-8 progression across components

### Troubleshooting

**localStorage Issues**:
- Check browser dev tools → Application → Local Storage → file:// or localhost:5173
- Clear storage manually if data corruption suspected
- Data format: JSON strings with keys matching state variable names

**GitHub Pages Deployment**:
- Ensure `homepage` field in package.json matches your repo URL
- Check vite.config.ts has correct `base: "/prescription-helper/"`
- Build must complete without TypeScript errors

**CORS/Local File Access**:
- Always use `bun dev` for development (file:// protocol has localStorage limitations)
- Production build tested with `bun preview` before deployment

### Key Functions & Calculations

**Medication Calculations**:
- Total pills needed: dailyDosage * totalDays
- Boxes needed: Math.floor(totalPills / pillsPerBox)
- Remainder pills: totalPills % pillsPerBox

**Date Calculations**:
- Follow-up date: appointmentDate + (followUpWeeks * 7 days)
- Date formatting: toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })

### Deployment Configuration

**GitHub Pages Setup**:
- `homepage`: "https://gnokit.github.io/prescription-helper" in package.json
- `base`: "/prescription-helper/" in vite.config.ts
- Deploy workflow: `bun run build` → `gh-pages -d dist`

### Development Workflow

**Adding New Features**:
1. Define new types in types.ts if needed
2. Add new state variables in App.tsx with localStorage integration
3. Create new component in components/ with proper props interface
4. Import and integrate into App.tsx
5. Test localStorage persistence and responsive design

**Testing Considerations**:
- All state persists automatically - test by refreshing browser
- Responsive breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Theme switching: test both light/dark modes
- Font size: test both normal/large options
- Clear data: test the reset functionality

### Browser APIs Used

- localStorage (data persistence)
- Date.toLocaleDateString with zh-TW locale
- document.documentElement.classList (theme switching)
- document.body.style.fontSize (font size changes)
- window.location.reload() (data reset)

### Internationalization Notes

- Interface language: Traditional Chinese (繁體中文)
- Date formatting: Chinese calendar format
- All user-facing text in Chinese - no i18n framework currently implemented