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
import { RoleEditComponent } from './role-edit/role-edit.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { GroupEditComponent } from './group-edit/group-edit.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthInterceptor} from '../auth-interceptor';
import {API_INTERCEPTOR_PROVIDER} from '../aether.module';

@NgModule({
    declarations: [RolesListComponent, GroupsListComponent, RoleEditComponent, GroupEditComponent],
    imports: [
        CommonModule,
        ApiModuleRbac.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'roles', component: RolesListComponent},
            {path: 'roles/:lastChange', component: RolesListComponent},
            {path: 'role/:roleid', component: RoleEditComponent},
            {path: 'groups', component: GroupsListComponent},
            {path: 'groups/:lastChange', component: GroupsListComponent},
            {path: 'group/:groupid', component: GroupEditComponent},
            {path: '', component: RolesListComponent, pathMatch: 'full'}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatToolbarModule,
    ],
    providers: [
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ]
})
export class RbacModule {
}
