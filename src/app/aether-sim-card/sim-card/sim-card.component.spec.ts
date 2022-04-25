/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimCardComponent } from './sim-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ApiModule } from '../../../openapi3/aether/2.1.0/api.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SimCardComponent', () => {
    let component: SimCardComponent;
    let fixture: ComponentFixture<SimCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SimCardComponent],
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
                ApiModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({ get: () => 'value' }) },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SimCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
