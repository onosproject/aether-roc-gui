/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig, BASKET_SERVICE_ENABLED} from '../environments/environment';
import {Meta} from '@angular/platform-browser';

export const USERNAME_ATTR = 'name';
export const GROUPS_ATTR = 'groups';
export const ID_TOKEN_ATTR = 'id_token';
export const ACCESS_TOKEN_ATTR = 'access_token';
const ID_TOKEN_CLAIMS_OBJ = 'id_token_claims_obj';
const ID_TOKEN_EXPIRES_AT = 'id_token_expires_at';

export interface IdTokClaims {
    at_hash: string;
    aud: string;
    email: string;
    email_verified: boolean;
    exp: number;
    groups: string[];
    iat: number;
    iss: string;
    name: string;
    nonce: string;
    sub: string;
}

@Component({
    selector: 'aether-root',
    templateUrl: './aether.component.html',
    styleUrls: ['./aether.component.scss']
})
export class AetherComponent implements OnInit {
    userProfileDisplay: boolean = false;
    apiKeyDisplay: boolean = false;
    basketServiceEnabled: boolean = BASKET_SERVICE_ENABLED;

    constructor(
        private oauthService: OAuthService,
        private meta: Meta,
    ) {
    }

    async ngOnInit(): Promise<boolean> {
        const issuerMeta = this.meta.getTag('name=openidcissuer');
        console.log('Starting onos.component with ', issuerMeta.content);
        if (issuerMeta.content !== undefined && issuerMeta.content !== '' && issuerMeta.content !== '$OPENIDCISSUER') {
            authConfig.issuer = issuerMeta.content;
        }
        if (authConfig.issuer !== undefined) {

            this.oauthService.configure(authConfig);

            return await this.oauthService.loadDiscoveryDocumentAndLogin(
                {customHashFragment: window.location.search}
            );
        }

    }

    showhelp(): void {
        alert('Showing help');
    }

    signingOut(): void {
        this.oauthService.logOut();
        localStorage.clear();
        window.location.reload();
    }

    get idTokClaims(): IdTokClaims {
        const idTokClaims = localStorage.getItem(ID_TOKEN_CLAIMS_OBJ);
        if (idTokClaims !== null) {
            return JSON.parse(idTokClaims) as IdTokClaims;
        }
        return {} as IdTokClaims;
    }

    get idTokenExpAt(): Date {
        const milliSeconds = Number(localStorage.getItem(ID_TOKEN_EXPIRES_AT));
        const expiry = new Date();
        expiry.setTime(milliSeconds);
        return expiry;
    }

    get apiKey(): string {
        return localStorage.getItem(ID_TOKEN_ATTR);
    }
}
