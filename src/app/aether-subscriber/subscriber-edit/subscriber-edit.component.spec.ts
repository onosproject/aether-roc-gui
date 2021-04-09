/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubscriberEditComponent} from './subscriber-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

describe('SubscriberEditComponent', () => {
    let component: SubscriberEditComponent;
    let fixture: ComponentFixture<SubscriberEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubscriberEditComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatSliderModule,
                MatToolbarModule,
                MatSelectModule,
                MatOptionModule,
                MatCardModule,
                MatButtonModule,
                MatSnackBarModule,
                MatSlideToggleModule
            ],
            providers: [
                {provide: FormBuilder, useClass: FormBuilder},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriberEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
