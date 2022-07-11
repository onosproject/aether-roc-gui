/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch/switch.component';
import { RouterModule } from '@angular/router';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UtilsModule } from '../utils/utils.module';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule as ApiModuleFabric } from '../../openapi3/sdn-fabric/0.1.0/api.module';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PortComponent } from './port/port.component';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { PortEditComponent } from './port-edit/port-edit.component';
import { SelectVlanComponent } from './select-vlan/select-vlan.component';
import { MatChipsModule } from '@angular/material/chips';
import { SelectDhcpConnectPointComponent } from './select-dhcp-connect-point/select-dhcp-connect-point.component';
import { SelectAttributeComponent } from './select-attribute/select-attribute.component';

@NgModule({
    declarations: [
        SwitchComponent,
        PortComponent,
        SwitchEditComponent,
        PortEditComponent,
        SelectVlanComponent,
        SelectDhcpConnectPointComponent,
        SelectAttributeComponent,
    ],
    imports: [
        CommonModule,
        ApiModuleFabric.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'switch', component: SwitchComponent },
            {
                path: 'switch-edit/:fabric-id/:id',
                component: SwitchEditComponent,
            },
            { path: 'port/:fabric/:switch', component: PortComponent },
            {
                path: 'port/:fabric-id/:switch-id/:cage-number/:channel-number',
                component: PortEditComponent,
            },
            { path: '', component: SwitchComponent, pathMatch: 'full' },
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        CdkTableModule,
        UtilsModule,
        MatDividerModule,
        MatChipsModule,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'standard' },
        },
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ],
    exports: [SelectAttributeComponent],
})
export class FabricSwitchModule {}
