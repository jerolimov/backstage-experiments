import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
  identityApiRef,
  errorApiRef,
} from '@backstage/core-plugin-api';

import {
  visitsApiRef,
  VisitsWebStorageApi,
} from '@backstage/plugin-home';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  ScmAuth.createDefaultApiFactory(),

  createApiFactory({
    api: visitsApiRef,
    deps: {
      identityApi: identityApiRef,
      errorApi: errorApiRef
    },
    factory: ({ identityApi, errorApi }) => VisitsWebStorageApi.create({ identityApi, errorApi }),
  }),
];
