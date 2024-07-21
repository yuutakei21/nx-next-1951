"use client";

import { ThemeProvider } from '@material-tailwind/react/context/theme';
import { materialTheme } from './theme';

export default function App({ children }: any) {
  return (
    <ThemeProvider value={materialTheme}>
      <div className="app-root min-h-screen">{children}</div>
    </ThemeProvider>
  );
}
