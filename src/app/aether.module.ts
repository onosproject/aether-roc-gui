/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule, Provider} from '@angular/core';

import {AetherRoutingModule} from './aether-routing.module';
import {AetherComponent} from './aether.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import {KUBERNETES_API_PROXY} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

export const API_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => AuthInterceptor),
    multi: true
};

@NgModule({
    declarations: [
        AetherComponent,
        UserProfileComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AetherRoutingModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatCardModule,
        MatListModule,
    ],
    providers: [
        {provide: 'Window', useValue: window},
        {provide: 'kubernetes_api_proxy', useValue: KUBERNETES_API_PROXY},
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ],
    bootstrap: [AetherComponent]
})
export class AetherModule {
}
