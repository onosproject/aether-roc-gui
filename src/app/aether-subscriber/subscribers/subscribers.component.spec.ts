/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {
    ComponentFixture,
    TestBed,
    waitForAsync
} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import {SubscribersComponent} from './subscribers.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ActivatedRoute, Params} from '@angular/router';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiModule} from '../../../openapi3/aether/1.0.0/api.module';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';

describe('SubscribersComponent', () => {
    let component: SubscribersComponent;
    let fixture: ComponentFixture<SubscribersComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SubscribersComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatSnackBarModule,
                MatCardModule,
                MatListModule,
                MatToolbarModule,
                ApiModule
            ],
            providers: [
                {provide: ActivatedRoute, useValue: {paramMap: of({ get: (key) => 'value' })}},
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscribersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
