/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AuthConfig} from 'angular-oauth2-oidc';

export const environment = {
    production: true
};

export const AETHER_ROC_API_URL = window.location.origin + '/aether-roc-api';
export const KUBERNETES_API_PROXY = window.location.origin + '/kubernetes-api';
export const GRAFANA_PROXY = window.location.origin + '/grafana';
export const PROMETHEUS_PROXY = window.location.origin + '/prometheus';
export const WEBSOCKET_PROXY = window.location.origin.toString().replace('http', 'ws') + '/ws';

export const AETHER_TARGETS = ['connectivity-service-v3'];

export const OIDC_AUTH_CLIENT_ID = 'aether-roc-gui';
export const OIDC_ISSUER = undefined;

export const BASKET_SERVICE_ENABLED = true;
export const CONNECTIVITY_METRICS_ENABLED = false;

export const authConfig: AuthConfig = {
    issuer: OIDC_ISSUER,
    redirectUri: window.location.origin,
    clientId: OIDC_AUTH_CLIENT_ID,
    responseType: 'code',
    requireHttps: false, // TODO: Change back to true
    scope: 'openid profile email offline_access groups',
    showDebugInformation: false,
    timeoutFactor: 0.01,
    strictDiscoveryDocumentValidation: true, // TODO: Change back to true
};
