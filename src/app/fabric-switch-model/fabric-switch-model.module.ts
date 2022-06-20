/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchModelComponent } from './switch-model/switch-model.component';
import { ApiModule as ApiModuleFabric } from '../../openapi3/sdn-fabric/0.1.0/api.module';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { UtilsModule } from '../utils/utils.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';

@NgModule({
    declarations: [SwitchModelComponent],
    imports: [
        CommonModule,
        ApiModuleFabric.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'switch-model', component: SwitchModelComponent },
            { path: '', component: SwitchModelComponent, pathMatch: 'full' },
        ]),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatIconModule,
        CdkTableModule,
        UtilsModule,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'standard' },
        },
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ],
})
export class FabricSwitchModelModule {}
