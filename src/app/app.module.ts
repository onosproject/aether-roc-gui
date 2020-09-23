/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';
import {ConsoleLoggerService, Gui2FwLibModule, LogService} from 'gui2-fw-lib';
import {OAuthModule} from 'angular-oauth2-oidc';
import {KUBERNETES_API_PROXY} from '../environments/environment';
import {K8sClientService} from './k8sclient.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const API_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => AuthInterceptor),
    multi: true
};

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        Gui2FwLibModule
    ],
    providers: [
        {provide: 'Window', useValue: window},
        {provide: LogService, useClass: ConsoleLoggerService},
        {provide: 'kubernetes_api_proxy', useValue: KUBERNETES_API_PROXY},
        {provide: K8sClientService, useClass: K8sClientService},
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
