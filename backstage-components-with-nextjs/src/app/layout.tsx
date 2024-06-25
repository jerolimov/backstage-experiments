import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Router } from "./react-router";
import { BackstageApiProvider } from "./backstage-apis";
import { BackstageThemeProvider } from "./backstage-theme";

export const metadata: Metadata = {
  title: "Backstage components with Next.js",
};

export default function RootLayout(props: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <BackstageThemeProvider>
            <BackstageApiProvider>
              <Router>
                {props.children}
              </Router>
            </BackstageApiProvider>
          </BackstageThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
