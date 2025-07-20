# Comprehensive Guide: Tailwind CSS v4 with Vite, React & TypeScript

This guide walks you through setting up a project with Vite, Bun, React, and TypeScript, including Tailwind CSS v4 for theme switching. It also explains the major changes from v3 to v4.

### Step 1: Create Your Vite + React Project 🚀

First, scaffold a new project using Bun.

1.  **Create the project**:
    ```bash
    bun create vite my-tailwind-app --template react-ts
    ```
2.  **Navigate into the project directory**:
    ```bash
    cd my-tailwind-app
    ```
3.  **Install dependencies**:
    ```bash
    bun install
    ```

### Step 2: Install and Configure Tailwind CSS v4 ⚙️

Next, add Tailwind CSS to the project.

1.  **Install Tailwind packages**:
    ```bash
    bun add -D tailwindcss @tailwindcss/vite
    ```
2.  **Configure Vite**: Open `vite.config.ts` and add the `tailwindcss` plugin.
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite' // ` element.
    ```tsx
    import { useState, useEffect } from 'react';

    export default function ThemeToggler() {
      const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

      useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
      }, [theme]);

      const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      };

      return (
        
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        
      );
    }
    ```
3.  **Integrate into Your App**: Update `src/App.tsx` to use the `ThemeToggler`.
    ```tsx
    import ThemeToggler from './ThemeToggler';

    function App() {
      return (
        
          
            Hello, Tailwind! 👋
          
          
            Theme switching with Tailwind CSS v4 is working!
          
          
        
      );
    }

    export default App;
    ```

### Step 5: Troubleshooting Common Errors ✅

These solutions address common issues that arise during setup.

*   **Problem**: TypeScript error `Cannot find module './index.css'`.
    *   **Solution**: Ensure your `src/vite-env.d.ts` file contains `/// `. This tells TypeScript how to handle CSS imports in a Vite project.
*   **Problem**: Linter warning `Unknown at rule @custom-variant`.
    *   **Solution**: Install the official **Tailwind CSS IntelliSense** extension for your code editor. It adds support for the new CSS syntax used in v4.