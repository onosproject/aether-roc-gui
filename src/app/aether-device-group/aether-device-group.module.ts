/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule as ApiModuleAether } from '../../openapi3/aether/4.0.0/api.module';
import { AETHER_ROC_API_URL } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DeviceGroupComponent } from './device-group/device-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthInterceptor } from '../auth-interceptor';
import { API_INTERCEPTOR_PROVIDER } from '../aether.module';
import { DeviceGroupEditComponent } from './device-group-edit/device-group-edit.component';
import { ImsisSelectComponent } from './imsis-select/imsis-select.component';
import { DeviceGroupMonitorComponent } from './device-group-monitor/device-group-monitor.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UtilsModule } from '../utils/utils.module';
import { UeMonitorComponent } from './ue-monitor/ue-monitor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ShowVcsUsageComponent } from './show-vcs-usage/show-vcs-usage.component';

@NgModule({
    declarations: [
        DeviceGroupComponent,
        DeviceGroupEditComponent,
        ImsisSelectComponent,
        DeviceGroupMonitorComponent,
        UeMonitorComponent,
        ShowVcsUsageComponent,
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({ rootUrl: AETHER_ROC_API_URL }),
        HttpClientModule,
        RouterModule.forChild([
            { path: 'devicegroups', component: DeviceGroupComponent },
            {
                path: 'devicegroups-edit/:id',
                component: DeviceGroupEditComponent,
            },
            {
                path: 'devicegroups-monitor/:id',
                component: DeviceGroupMonitorComponent,
            },
            { path: '', component: DeviceGroupComponent, pathMatch: 'full' },
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        CdkTableModule,
        MatCheckboxModule,
        MatExpansionModule,
        UtilsModule,
        MatAutocompleteModule,
        MatTooltipModule,
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
export class AetherDeviceGroupModule {}
