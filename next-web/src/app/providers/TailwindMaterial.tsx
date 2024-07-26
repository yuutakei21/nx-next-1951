"use client";

import { ThemeProvider } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { materialTheme } from "../theme";

export default function TailwindMaterial({
  children,
}: Readonly<{
  children: any;
}>) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("check  document");
    if (document && !loaded) setLoaded(true);
  }, []);

  return (
    <ThemeProvider value={materialTheme}>
      <div className="app-root min-h-screen">
        {loaded && <ThemeProvider>{children}</ThemeProvider>}
      </div>
    </ThemeProvider>
  );
}
