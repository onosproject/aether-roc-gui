/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SdcoreComponent} from './sdcore/sdcore.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ApiModule as ApiModuleAether} from '../../openapi3/top/level/api.module';
import {AETHER_ROC_API_URL, SDCORE_ADAPTER} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthInterceptor} from '../auth-interceptor';
import {API_INTERCEPTOR_PROVIDER} from '../aether.module';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        SdcoreComponent
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'sdcore', component: SdcoreComponent},
            {path: '', component: SdcoreComponent, pathMatch: 'full'}
        ]),
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule
    ],
    providers: [
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
        {provide: 'sdcore-adapter-service', useValue: SDCORE_ADAPTER}
    ]
})
export class DiagnosticsModule {
}
