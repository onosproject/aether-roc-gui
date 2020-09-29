/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RolesListComponent } from './roles-list/roles-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import {ApiModule as ApiModuleRbac} from '../../openapi3/rbac/1.0.0/api.module';
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [RolesListComponent, GroupsListComponent],
    imports: [
        CommonModule,
        ApiModuleRbac.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'roles', component: RolesListComponent},
            {path: 'groups', component: GroupsListComponent},
            {path: '', component: RolesListComponent, pathMatch: 'full'}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
    ]
})
export class RbacModule {
}
