"use client";

import { ThemeProvider } from "@material-tailwind/react";

export default function TailwindMaterial({
  children,
}: Readonly<{
  children: any;
}>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
