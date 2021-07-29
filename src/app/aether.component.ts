/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig, BASKET_SERVICE_ENABLED} from '../environments/environment';
import {Meta} from '@angular/platform-browser';
import {BasketService} from './basket.service';
import {OpenPolicyAgentService} from './open-policy-agent.service';
import {Router} from '@angular/router';
import {IdTokClaims} from './idtoken';

export const USERNAME_ATTR = 'name';
export const GROUPS_ATTR = 'groups';
export const ID_TOKEN_ATTR = 'id_token';
export const ACCESS_TOKEN_ATTR = 'access_token';
const ID_TOKEN_CLAIMS_OBJ = 'id_token_claims_obj';
const ID_TOKEN_EXPIRES_AT = 'id_token_expires_at';


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
        private bs: BasketService,
        public opaService: OpenPolicyAgentService,
        private router: Router,
    ) {
    }

    async ngOnInit(): Promise<boolean> {
        const issuerMeta = this.meta.getTag('name=openidcissuer');
        console.log('Starting aether.component with ', issuerMeta.content);
        if (issuerMeta.content !== undefined && issuerMeta.content !== '' && issuerMeta.content !== '$OPENIDCISSUER') {
            authConfig.issuer = issuerMeta.content;
        }
        if (authConfig.issuer !== undefined) {
            console.log('Authentication Enabled');

            this.oauthService.configure(authConfig);

            return await this.oauthService.loadDiscoveryDocumentAndLogin(
                {customHashFragment: window.location.search}
            ).then(fulfilled => {
                console.log('Login', fulfilled ? 'succeeded' : 'failed', this.idTokClaims);
                this.opaService.userGroups = this.idTokClaims.groups;
                this.router.navigate(['/dashboard']);
                return fulfilled;
            });
        }
    }

    showhelp(): void {
        window.open('https://aetherproject.org/', '_blank');
    }

    signingOut(): void {
        if (this.bs.totalNumChanges() === 0) {
            this.oauthService.logOut();
            localStorage.clear();
            window.location.reload();
        } else {
            const decision = confirm('You have ' + this.bs.totalNumChanges() + ' changes stored in basket. All changes made will be discarded upon signing out. Continue?');
            if (decision === true) {
                this.oauthService.logOut();
                localStorage.clear();
                window.location.reload();
            }
        }
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
