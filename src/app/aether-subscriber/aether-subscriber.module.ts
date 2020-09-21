/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscriberListComponent} from './subscriber-list/subscriber-list.component';
import {SubscriberEditComponent} from './subscriber-edit/subscriber-edit.component';
import {ApiModule as ApiModuleAether} from '../../openapi3/aether/1.0.0/api.module';
import {AETHER_ROC_API_URL} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [SubscriberListComponent, SubscriberEditComponent],
    imports: [
        CommonModule,
        ApiModuleAether.forRoot({rootUrl: AETHER_ROC_API_URL}),
        HttpClientModule,
        RouterModule.forChild([
            {path: 'subscriber-list', component: SubscriberListComponent},
            {path: '', component: SubscriberListComponent, pathMatch: 'full'}
        ]),
    ],

})
export class AetherSubscriberModule {
}
