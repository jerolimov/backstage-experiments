import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';

import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LightIcon from '@material-ui/icons/WbSunnySharp';
import DarkIcon from '@material-ui/icons/Brightness2';

import ButtonV4 from '@material-ui/core/Button';
import ButtonV5 from '@mui/material/Button';
import AutocompleteV4 from '@material-ui/lab/Autocomplete';
import AutocompleteV5 from '@mui/material/Autocomplete';
import TextFieldV4 from '@material-ui/core/TextField';
import TextFieldV5 from '@mui/material/TextField';

import {
  createUnifiedTheme,
  genPageTheme,
  lightTheme,
  darkTheme,
  themes,
  UnifiedThemeProvider,
} from '@backstage/theme';

const components: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
  },
  MuiToggleButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        // backgroundColor: 'red',
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        // backgroundColor: 'blue',
      },
    },
  },
  MuiTab: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        minWidth: 'initial !important',
      },
      // @ts-ignore: Tab contains a span 'wrapper'
      wrapper: {
        textTransform: 'none',
      },
    },
  },
  BackstageIconLinkVertical: {
    styleOverrides: {
      label: {
        textTransform: 'none',
      },
    },
  },
}

const myLightTheme = createUnifiedTheme({
  palette: {
    ...themes.light.getTheme('v5')?.palette,
    primary: {
      main: 'rgb(0, 102, 204)',
    },
    secondary: {
      main: 'rgb(0, 64, 128)',
    },
    error: {
      main: '#8c4351',
    },
    warning: {
      main: '#8f5e15',
    },
    info: {
      main: '#34548a',
    },
    success: {
      main: '#485e30',
    },
    background: {
      default: '#F0F0F0',
      paper: '#FFFFFF',
    },
    banner: {
      info: '#34548a',
      error: '#8c4351',
      text: '#343b58',
      link: '#565a6e',
    },
    errorBackground: '#FAEAE8',
    warningBackground: '#FDF7E7',
    infoBackground: '#E7F1FA',
    navigation: {
      background: 'rgb(33, 36, 39)',
      indicator: 'rgb(115, 188, 247)',
      color: '#ffffff',
      selectedColor: 'rgb(78, 82, 85)',
    },
  },
  defaultPageTheme: 'all',
  fontFamily: 'RedHatDisplay, helvetica, arial, sans-serif',
  /* below drives the header colors */
  pageTheme: {
    all: genPageTheme({
      colors: ['rgb(21, 21, 21)'],
      shape: 'url("")',
      options: {
        fontColor: '#ffffff',
      },
    }),
  },
  components,
});

const myDarkTheme = createUnifiedTheme({
  palette: {
    ...themes.dark.getTheme('v5')?.palette,
    primary: {
      main: 'rgb(0, 102, 204)',
    },
    secondary: {
      main: 'rgb(0, 64, 128)',
    },
    warning: {
      main: '#8f5e15',
    },
    info: {
      main: '#34548a',
    },
    success: {
      main: '#485e30',
    },
    background: {
      default: 'rgb(15, 18, 20)',
      paper: 'rgb(27, 29, 33)',
    },
    banner: {
      info: '#34548a',
      error: '#8c4351',
      text: '#343b58',
      link: '#565a6e',
    },
    errorBackground: '#FAEAE8',
    warningBackground: '#FDF7E7',
    infoBackground: '#E7F1FA',
    navigation: {
      background: 'rgb(33, 36, 39)',
      indicator: 'rgb(115, 188, 247)',
      color: '#ffffff',
      selectedColor: 'rgb(78, 82, 85)',
    },
  },
  defaultPageTheme: 'all',
  fontFamily: 'RedHatDisplay, helvetica, arial, sans-serif',
  /* below drives the header colors */
  pageTheme: {
    all: genPageTheme({
      colors: ['rgb(3, 3, 3)'],
      shape: 'url("")',
      options: {
        fontColor: '#ffffff',
      }
    }),
  },
  components,
});

const app = createApp({
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  themes: [
    {
      id: 'backstage-light-theme',
      title: 'Backstage Light Theme',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <ThemeProvider theme={lightTheme}>
          <CssBaseline>{children}</CssBaseline>
        </ThemeProvider>
      ),
    },
    {
      id: 'backstage-dark-theme',
      title: 'Backstage Dark Theme',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: ({ children }) => (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline>{children}</CssBaseline>
        </ThemeProvider>
      ),
    },
    {
      id: 'my-light-theme',
      title: 'My Light Theme',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={myLightTheme}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
    {
      id: 'my-dark-theme',
      title: 'My Dark Theme',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={myDarkTheme}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
  ]
});

const ButtonTest = () => {
  const movies = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
  ];

  return (
    <div>
      <h1>Material UI v4 buttons</h1>
      <div>
        <ButtonV4 variant="contained">Default</ButtonV4>
        <ButtonV4 variant="contained" color="primary">
          Primary
        </ButtonV4>
        <ButtonV4 variant="contained" color="secondary">
          Secondary
        </ButtonV4>
        <ButtonV4 variant="contained" disabled>
          Disabled
        </ButtonV4>
        <ButtonV4 variant="contained" color="primary" href="#contained-buttons">
          Link
        </ButtonV4>
      </div>

      <h1>MUI v5 buttons</h1>
      <div>
        <ButtonV5 variant="contained">Default</ButtonV5>
        <ButtonV5 variant="contained" color="primary">
          Primary
        </ButtonV5>
        <ButtonV5 variant="contained" color="secondary">
          Secondary
        </ButtonV5>
        <ButtonV5 variant="contained" disabled>
          Disabled
        </ButtonV5>
        <ButtonV5 variant="contained" color="primary" href="#contained-buttons">
          Link
        </ButtonV5>
      </div>

      <h1>Material UI v4 Autocomplete</h1>
      <div>
        <AutocompleteV4
          options={movies}
          renderInput={(params) => <TextFieldV4 {...params} label="Movie" />}
          getOptionLabel={(option) => option.title}
        />
      </div>

      <h1>MUI v5 Autocomplete</h1>
      <div>
        <AutocompleteV5
          options={movies}
          renderInput={(params) => <TextFieldV5 {...params} label="Movie" />}
          getOptionLabel={(option) => option.title}
        />
      </div>
    </div>
  );
}

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Navigate to="catalog" />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/button-test" element={<ButtonTest />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
