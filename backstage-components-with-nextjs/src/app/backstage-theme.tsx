/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { UnifiedThemeProvider, themes as backstageThemes } from '@backstage/theme';
import { useThemes } from '@redhat-developer/red-hat-developer-hub-theme';

const useBackstageTheme = false;

export function BackstageThemeProvider(props: Readonly<{
  children: React.ReactNode;
}>) {
  if (useBackstageTheme) {
    return (
      <UnifiedThemeProvider theme={backstageThemes.light}>
        {props.children}
      </UnifiedThemeProvider>
    );
  }

  const rhdhThemes = useThemes();
  const RHDHThemeProvider = rhdhThemes[0].Provider;
  return (
    <RHDHThemeProvider>
      {props.children}
    </RHDHThemeProvider>
  );
}
