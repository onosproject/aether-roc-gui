/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {ApiModule as ApiModuleAether} from '../../openapi3/aether/2.1.0/api.module';
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AuthInterceptor} from '../auth-interceptor';
import {API_INTERCEPTOR_PROVIDER} from '../aether.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PolicyComponent } from './service-policy/policy/policy.component';
import { RuleComponent } from './service-rule/rule/rule.component';
import { GroupComponent } from './service-group/group/group.component';

@NgModule({
    declarations: [
        PolicyComponent,
        RuleComponent,
        GroupComponent
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'servicegroup', component: GroupComponent},
            // {path: 'accessprofiles/:lastChange', component: AccessProfilesComponent},
            // {path: 'accessprofile-edit/:id', component: AccessProfileEditComponent},

            {path: 'servicepolicy', component: PolicyComponent},
            // {path: 'apnprofiles/:lastChange', component: ApnProfilesComponent},
            // {path: 'apnprofile-edit/:id', component: ApnProfileEditComponent},

            {path: 'servicerule', component: RuleComponent},
            // {path: 'qosprofiles/:lastChange', component: QosProfilesComponent},
            // {path: 'qosprofile-edit/:id', component: QosProfileEditComponent},

            // {path: 'upprofiles', component: UpProfilesComponent},

            // {path: 'securityprofiles', component: SecurityProfilesComponent},
            // {path: 'securityprofiles/:lastChange', component: SecurityProfilesComponent},
            // {path: 'securityprofile-edit/:id', component: SecurityProfileEditComponent},

            // {path: '', component: UpProfilesComponent, pathMatch: 'full'}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatSlideToggleModule,

    ],
    providers: [
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ]
})
export class AetherServiceModule {}
