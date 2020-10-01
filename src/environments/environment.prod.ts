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
export const AETHER_TARGETS = ['spgw-1'];
export const RBAC_TARGET = 'internal';

export const OIDC_AUTH_CLIENT_ID = undefined;
export const OIDC_AUTH_SECRET = undefined;
export const OIDC_ISSUER = undefined;

export const authConfig: AuthConfig = {
    issuer: OIDC_ISSUER,
    redirectUri: window.location.origin,
    clientId: OIDC_AUTH_CLIENT_ID,
    responseType: 'code',
    requireHttps: true,
    scope: 'openid profile email offline_access',
    dummyClientSecret: OIDC_AUTH_SECRET,
    showDebugInformation: false,
    timeoutFactor: 0.01,
    strictDiscoveryDocumentValidation: true
};
