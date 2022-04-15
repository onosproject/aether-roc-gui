/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {
    authConfig,
    BASKET_SERVICE_ENABLED,
    environment,
} from '../environments/environment';
import { Meta } from '@angular/platform-browser';
import { BasketService } from './basket.service';
import {
    AETHER_ROC_ADMIN_USER,
    OpenPolicyAgentService,
} from './open-policy-agent.service';
import { Router } from '@angular/router';
import { IdTokClaims } from './idtoken';
import { SocketService } from './socket.service';
import { EnterpriseService } from './enterprise.service';

export const USERNAME_ATTR = 'name';
export const GROUPS_ATTR = 'groups';
export const ID_TOKEN_ATTR = 'id_token';
export const ACCESS_TOKEN_ATTR = 'access_token';
const ID_TOKEN_CLAIMS_OBJ = 'id_token_claims_obj';
const ID_TOKEN_EXPIRES_AT = 'id_token_expires_at';

@Component({
    selector: 'aether-root',
    templateUrl: './aether.component.html',
    styleUrls: ['./aether.component.scss'],
})
export class AetherComponent implements OnInit, OnDestroy {
    userProfileDisplay = false;
    apiKeyDisplay = false;
    basketServiceEnabled: boolean = BASKET_SERVICE_ENABLED;
    AETHER_ROC_ADMIN_USER = AETHER_ROC_ADMIN_USER;
    constructor(
        private oauthService: OAuthService,
        private meta: Meta,
        private bs: BasketService,
        public opaService: OpenPolicyAgentService,
        private router: Router,
        private socketService: SocketService,
        private enterpriseService: EnterpriseService
    ) {}

    async ngOnInit(): Promise<boolean> {
        const issuerMeta = this.meta.getTag('name=openidcissuer');
        console.log('Starting aether.component with ', issuerMeta.content);
        if (
            issuerMeta.content !== undefined &&
            issuerMeta.content !== '' &&
            issuerMeta.content !== '$OPENIDCISSUER'
        ) {
            authConfig.issuer = issuerMeta.content;
        }
        if (authConfig.issuer !== undefined) {
            console.log('Authentication Enabled');

            this.oauthService.configure(authConfig);

            return await this.oauthService
                .loadDiscoveryDocumentAndLogin({
                    customHashFragment: window.location.search,
                })
                .then((fulfilled) => {
                    console.log(
                        'Login',
                        fulfilled ? 'succeeded' : 'failed',
                        this.idTokClaims
                    );
                    this.enterpriseService.loadTargets();
                    this.opaService.userGroups = this.idTokClaims.groups;
                    this.router.navigate(['/dashboard']);
                    this.socketService.connect(this.apiKey);
                    return fulfilled;
                });
        } else {
            // When no auth is used just open Web socket and accept everything
            this.socketService.connect();
        }
    }

    ngOnDestroy(): void {
        this.socketService.close();
    }

    showhelp(): void {
        window.open(environment.helpURL, '_blank');
    }

    signingOut(): void {
        if (this.bs.totalNumChanges() === 0) {
            this.oauthService.logOut();
            localStorage.clear();
            this.socketService.close();
            window.location.href = this.logoutUrl;
        } else {
            const decision = confirm(
                'You have ' +
                    this.bs.totalNumChanges() +
                    ' changes stored in basket. All changes made will be discarded upon signing out. Continue?'
            );
            if (decision === true) {
                this.oauthService.logOut();
                localStorage.clear();
                this.socketService.close();
                window.location.href = this.logoutUrl;
            }
        }
    }

    get logoutUrl(): string {
        if (authConfig.issuer.includes('/auth/realms/')) {
            // For Keycloak
            return authConfig.issuer + '/account';
        }
        // For Dex
        return window.location.href;
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
