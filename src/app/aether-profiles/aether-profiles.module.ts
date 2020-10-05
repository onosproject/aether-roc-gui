/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpProfilesComponent } from './up-profiles/up-profiles.component';
import { QosProfilesComponent } from './qos-profiles/qos-profiles.component';
import { AccessProfilesComponent } from './access-profiles/access-profiles.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {ApiModule as ApiModuleAether} from '../../openapi3/aether/1.0.0/api.module';
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ApnProfilesComponent } from './apn-profiles/apn-profiles.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [UpProfilesComponent, QosProfilesComponent, AccessProfilesComponent, ApnProfilesComponent],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'accessprofiles', component: AccessProfilesComponent},
            {path: 'apnprofiles', component: ApnProfilesComponent},
            {path: 'qosprofiles', component: QosProfilesComponent},
            {path: 'upprofiles', component: UpProfilesComponent},
            {path: '', component: UpProfilesComponent, pathMatch: 'full'}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule
    ]
})
export class AetherProfilesModule { }
