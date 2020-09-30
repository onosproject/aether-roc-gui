/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiModule as ApiModuleAether} from '../../openapi3/aether/1.0.0/api.module';
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {SubscriberEditComponent} from './subscriber-edit/subscriber-edit.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SubscriberViewComponent } from './subscriber-view/subscriber-view.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
    declarations: [SubscribersComponent, SubscriberEditComponent, SubscriberViewComponent],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'subscribers', component: SubscribersComponent},
            {path: 'subscribers/:lastChange', component: SubscribersComponent},
            {path: 'subscriber-edit/:ueid', component: SubscriberEditComponent},
            {path: '', component: SubscribersComponent, pathMatch: 'full'}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatSliderModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatListModule,
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ],
})
export class AetherSubscriberModule {
}
