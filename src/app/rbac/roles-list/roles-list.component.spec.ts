/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RolesListComponent} from './roles-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

describe('RolesListComponent', () => {
    let component: RolesListComponent;
    let fixture: ComponentFixture<RolesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RolesListComponent],
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatSnackBarModule,
                MatToolbarModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RolesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
