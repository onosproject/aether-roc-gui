/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {VcsMonitorComponent} from './vcs-monitor.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatSelectModule} from '@angular/material/select'
import {GRAFANA_PROXY} from '../../../environments/environment'
import {UtilsModule} from '../../utils/utils.module'
import {OAuthLogger, OAuthModule, OAuthService, UrlHelperService} from 'angular-oauth2-oidc'

describe('VcsMonitorComponent', () => {
    let component: VcsMonitorComponent
    let fixture: ComponentFixture<VcsMonitorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VcsMonitorComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatToolbarModule,
                MatCardModule,
                MatButtonModule,
                MatDividerModule,
                MatSnackBarModule,
                MatSlideToggleModule,
                MatAutocompleteModule,
                MatSelectModule,
                UtilsModule,
                OAuthModule.forRoot(),
            ],
            providers: [
                {provide: OAuthService},
                {provide: UrlHelperService},
                {provide: OAuthLogger},
                {provide: 'grafana_api_proxy', useValue: GRAFANA_PROXY},
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(VcsMonitorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
