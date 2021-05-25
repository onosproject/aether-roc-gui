/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApnProfileEditComponent} from './apn-profile-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('ApnProfileEditComponent', () => {
    let component: ApnProfileEditComponent;
    let fixture: ComponentFixture<ApnProfileEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApnProfileEditComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatToolbarModule,
                MatCardModule,
                MatButtonModule,
                MatSnackBarModule,
                MatSelectModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApnProfileEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
