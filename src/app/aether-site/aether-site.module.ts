/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiModule as ApiModuleAether} from '../../openapi3/aether/4.0.0/api.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {AuthInterceptor} from '../auth-interceptor';
import {API_INTERCEPTOR_PROVIDER} from '../aether.module';
import { SiteComponent } from './site/site.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkTableModule} from '@angular/cdk/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SiteEditComponent } from './site-edit/site-edit.component';
import {UtilsModule} from '../utils/utils.module';
import { ShowParentModulesComponent } from './show-parent-modules/show-parent-modules.component';
import { SmallCellSelectComponent } from './small-cell-select/small-cell-select.component';
import {SiteMonitorComponent} from "./site-monitor/site-monitor.component";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
    declarations: [
        SiteComponent,
        SiteEditComponent,
        ShowParentModulesComponent,
        SmallCellSelectComponent,
        SiteMonitorComponent
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'site', component: SiteComponent},
            {path: 'site-edit/:id', component: SiteEditComponent},
            {path: 'site-monitor/:id', component: SiteMonitorComponent},
            {path: '', component: SiteComponent, pathMatch: 'full'}
        ]),
        MatToolbarModule,
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
        UtilsModule
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'standard'}},
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ]
})
export class AetherSiteModule {}
