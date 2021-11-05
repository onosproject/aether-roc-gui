/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IpDomainComponent } from './ip-domain.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {MatTableModule} from '@angular/material/table'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {ApiModule} from '../../../openapi3/aether/4.0.0/api.module'
import {ActivatedRoute} from '@angular/router'
import {of} from 'rxjs'
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field'

describe('IpDomainComponent', () => {
  let component: IpDomainComponent
  let fixture: ComponentFixture<IpDomainComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpDomainComponent ],
        imports: [
            HttpClientTestingModule,
            RouterTestingModule,
            BrowserAnimationsModule,
            MatPaginatorModule,
            MatFormFieldModule,
            MatSortModule,
            MatTableModule,
            MatSnackBarModule,
            MatToolbarModule,
            MatIconModule,
            ApiModule
        ],
        providers: [
            {
                provide: ActivatedRoute, useValue: {paramMap: of({ get: () => 'value' })}
            },
            {
                provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'standard'}
            }
        ],
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(IpDomainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
