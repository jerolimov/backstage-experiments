"use client";
import { ApiHolder, ApiRef, configApiRef, errorApiRef } from "@backstage/core-plugin-api";

import {
  ApiProvider,
  ConfigReader,
  AlertApiForwarder,
  ErrorAlerter,
  ErrorApiForwarder,
} from "@backstage/core-app-api";

const configApi = new ConfigReader({});
const alertApi = new AlertApiForwarder();
const errorApi = new ErrorAlerter(alertApi, new ErrorApiForwarder());

export const apis = [
  [configApiRef, configApi],
  [errorApiRef, errorApi],
  // [translationApiRef, translationApi],
] as const;

const apiLookup = apis.reduce((acc, [apiRef, api]) => {
  acc[apiRef.id] = api;
  return acc;
}, {} as Record<string, any>);

const apiHolder: ApiHolder = {
  get<T>(apiRef: ApiRef<T>): T | undefined {
    console.log('ApiHolder get', apiRef.id, apiRef, apiLookup[apiRef.id]);
    return apiLookup[apiRef.id];
  },
};

export function BackstageApiProvider(props: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ApiProvider apis={apiHolder}>
      {props.children}
    </ApiProvider>
  );
}
