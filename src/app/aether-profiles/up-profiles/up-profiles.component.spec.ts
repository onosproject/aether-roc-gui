/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpProfilesComponent} from './up-profiles.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ActivatedRoute, Params} from '@angular/router';
import {from, of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiModule} from '../../../openapi3/aether/1.0.0/api.module';

describe('UpProfilesComponent', () => {
    let component: UpProfilesComponent;
    let fixture: ComponentFixture<UpProfilesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpProfilesComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatSnackBarModule,
                ApiModule
            ],
            providers: [
                {provide: ActivatedRoute, useValue: {paramMap: of({ get: (key) => 'value' })}},
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpProfilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
