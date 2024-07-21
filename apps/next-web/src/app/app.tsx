"use client";

import { ThemeProvider } from '@material-tailwind/react/context/theme';
import { theme } from './theme';

export default function App({ children }: any) {
  return (
    <ThemeProvider value={theme}>
      <div className="app-root">{children}</div>
    </ThemeProvider>
  );
}
