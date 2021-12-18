/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { AuthConfig } from 'angular-oauth2-oidc';

export const environment = {
    production: false,
};

export const AETHER_ROC_API_URL =
    'https://8324e344-31cf-413b-b2b9-f7160e3520cc.mock.pstmn.io';
export const KUBERNETES_API_PROXY = 'http://localhost:8001';
export const GRAFANA_PROXY = 'http://localhost:3000/grafana/';
export const PROMETHEUS_PROXY = 'http://localhost:9090';
export const WEBSOCKET_PROXY = 'ws://localhost:8120/ws';

export const AETHER_TARGETS = ['connectivity-service-v4'];
export const SDCORE_ADAPTER = 'sdcore-adapter-v4';

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
    requireHttps: false, // TODO: Change back to true
    scope: 'openid profile email groups',
    showDebugInformation: false,
    timeoutFactor: 0.01,
    strictDiscoveryDocumentValidation: true, // TODO: Change back to true
};
