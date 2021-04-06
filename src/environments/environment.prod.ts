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
export const AETHER_TARGETS = ['connectivity-service-v2'];
export const RBAC_TARGET = 'rbac';

export const OIDC_AUTH_CLIENT_ID = 'aether-roc-gui';
export const OIDC_ISSUER = undefined;

export const BASKET_SERVICE_ENABLED = true;

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
