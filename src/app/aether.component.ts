/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from '../environments/environment';
import {Meta} from '@angular/platform-browser';

export const USERNAME_ATTR = 'name';
export const EMAIL_ATTR = 'email';
export const GROUPS_ATTR = 'groups';
export const ID_TOKEN_ATTR = 'idToken';
export const ACCESS_TOKEN_ATTR = 'accessToken';
export const EXPIRY_ATTR = 'exp';

@Component({
    selector: 'aether-root',
    templateUrl: './aether.component.html',
    styleUrls: ['./aether.component.scss']
})
export class AetherComponent implements OnInit {
    userProfileDisplay: boolean = false;
    apiKeyDisplay: boolean = false;

    constructor(
        private oauthService: OAuthService,
        private meta: Meta,
    ) {
    }

    async ngOnInit(): Promise<void> {
        const issuerMeta = this.meta.getTag('name=openidcissuer');
        console.log('Starting onos.component with ', issuerMeta.content);
        let validToken = false;
        if (issuerMeta.content !== undefined && issuerMeta.content !== '' && issuerMeta.content !== '$OPENIDCISSUER') {
            authConfig.issuer = issuerMeta.content;
        }
        if (authConfig.issuer !== undefined) {

            this.oauthService.configure(authConfig);

            if (this.oauthService.hasValidAccessToken()) {
                validToken = true;
            }

            const loggedIn = await this.oauthService.loadDiscoveryDocumentAndLogin();

            if (loggedIn) {
                localStorage.setItem(EMAIL_ATTR, this.oauthService.getIdentityClaims()[EMAIL_ATTR]);
                localStorage.setItem(USERNAME_ATTR, this.oauthService.getIdentityClaims()[USERNAME_ATTR]);
                localStorage.setItem(GROUPS_ATTR, this.oauthService.getIdentityClaims()[GROUPS_ATTR]);
                localStorage.setItem(EXPIRY_ATTR, this.oauthService.getIdentityClaims()[EXPIRY_ATTR]);
                localStorage.setItem(ACCESS_TOKEN_ATTR, this.oauthService.getIdToken());
                localStorage.setItem(ID_TOKEN_ATTR, this.oauthService.getAccessToken());
                console.log('Logged in', this.oauthService.hasValidIdToken(),
                    'as', localStorage.getItem(USERNAME_ATTR),
                    '(' + localStorage.getItem(EMAIL_ATTR) + ') Groups:' + localStorage.getItem(GROUPS_ATTR));
            } else {
                console.warn('Not logged in');
            }
        }

    }

    showhelp(): void {
        alert('Showing help');
    }

    signingOut(): void {
        this.oauthService.logOut();
        localStorage.clear();
    }

    userName(): string {
        return localStorage.getItem(USERNAME_ATTR);
    }

    userEmail(): string {
        return localStorage.getItem(EMAIL_ATTR);
    }

    userGroups(): string[] {
        if (localStorage.getItem(GROUPS_ATTR) === null) {
            return [];
        }
        return localStorage.getItem(GROUPS_ATTR).split(',');
    }

    apiKey(): string {
        return localStorage.getItem(ID_TOKEN_ATTR);
    }

    expiry(): Date {
        const milliSeconds = Number(localStorage.getItem(EXPIRY_ATTR));
        const expiry = new Date();
        expiry.setTime(milliSeconds * 1000);
        return expiry;
    }
}
