/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiModule as ApiModuleAether} from '../openapi3/aether/1.0.0/api.module';
import {ApiModule as ApiModuleRbac} from '../openapi3/rbac/1.0.0/api.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';
import {AETHER_ROC_API_URL} from '../environments/environment';

export const API_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => AuthInterceptor),
    multi: true
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        ApiModuleRbac.forRoot({rootUrl: AETHER_ROC_API_URL}),
    ],
    providers: [
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
