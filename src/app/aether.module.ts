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
import {OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';
import {GRAFANA_PROXY, KUBERNETES_API_PROXY} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { ApiKeyComponent } from './api-key/api-key.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatPaginatorModule} from '@angular/material/paginator';

export const API_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => AuthInterceptor),
    multi: true
};

@NgModule({
    declarations: [
        AetherComponent,
        UserProfileComponent,
        ApiKeyComponent
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
        ClipboardModule,
        MatPaginatorModule,
    ],
    providers: [
        {provide: 'Window', useValue: window},
        {provide: 'kubernetes_api_proxy', useValue: KUBERNETES_API_PROXY},
        {provide: 'grafana_api_proxy', useValue: GRAFANA_PROXY},
        // AuthInterceptor, not needed here - use in child modules
        // API_INTERCEPTOR_PROVIDER,
        {provide: OAuthStorage, useValue: localStorage},
    ],
    exports: [
    ],
    bootstrap: [AetherComponent]
})
export class AetherModule {
}
