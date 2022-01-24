/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthConfig } from 'angular-oauth2-oidc';

export const environment = {
    production: false,
    helpURL: 'https://docs.aetherproject.org',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
export const AETHER_ROC_API_URL = 'http://localhost:8181';
export const KUBERNETES_API_PROXY = 'http://localhost:8001';
export const GRAFANA_PROXY = 'http://localhost:3000/grafana/';
export const PROMETHEUS_PROXY = 'http://localhost:9090';
export const WEBSOCKET_PROXY = 'ws://localhost:8120/ws';

export const AETHER_TARGETS = ['connectivity-service-v4'];
export const SDCORE_ADAPTER = 'sdcore-adapter-v4';
export const RBAC_TARGET = 'rbac';

export const OIDC_AUTH_CLIENT_ID = 'aether-roc-gui';
export const OIDC_ISSUER = undefined;

export const BASKET_SERVICE_ENABLED = true;
export const PERFORMANCE_METRICS_ENABLED = false;

export const maxDeviceGroupRange = 5000;

export const authConfig: AuthConfig = {
    issuer: OIDC_ISSUER,
    redirectUri: window.location.origin,
    clientId: OIDC_AUTH_CLIENT_ID,
    responseType: 'code',
    requireHttps: false,
    scope: 'openid profile email groups',
    showDebugInformation: true,
    timeoutFactor: 0.01,
    strictDiscoveryDocumentValidation: true,
};
