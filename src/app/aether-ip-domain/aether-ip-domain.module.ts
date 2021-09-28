/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IpDomainComponent} from './ip-domain/ip-domain.component';
import {ApiModule as ApiModuleAether} from '../../openapi3/aether/3.0.0/api.module';
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkTableModule} from '@angular/cdk/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AuthInterceptor} from '../auth-interceptor';
import {API_INTERCEPTOR_PROVIDER} from '../aether.module';
import { IpDomainEditComponent } from './ip-domain-edit/ip-domain-edit.component';
import {IpSelectorComponent} from '../ip-selector/ip-selector.component';
import {NgxIpModule} from 'ngx-ip';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {TruncateTextPipe} from '../utils/truncate-text.pipe';
import {UtilsModule} from '../utils/utils.module';
import { ShowParentModulesComponent } from './show-parent-modules/show-parent-modules.component';

@NgModule({
    declarations: [
        IpDomainComponent,
        IpDomainEditComponent,
        IpSelectorComponent,
        ShowParentModulesComponent,
        // Edit page
    ],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'ipdomain', component: IpDomainComponent},
            {path: 'ipdomain-edit/:id', component: IpDomainEditComponent},

            {path: '', component: IpDomainComponent, pathMatch: 'full'}
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
        NgxIpModule,
        MatRadioModule,
        MatMenuModule,
        UtilsModule
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'standard'}},
        AuthInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ]
})
export class AetherIpDomainModule {
}
