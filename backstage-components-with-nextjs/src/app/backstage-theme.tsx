"use client";
import { UnifiedThemeProvider, themes } from '@backstage/theme';

export function BackstageThemeProvider(props: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UnifiedThemeProvider theme={themes.light}>
      {props.children}
    </UnifiedThemeProvider>
  );
}
