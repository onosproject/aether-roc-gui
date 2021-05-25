/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IpSelectorComponent} from './ip-selector.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatCardModule} from '@angular/material/card';
import {NgxIpModule} from 'ngx-ip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('IpSelectorComponent', () => {
    let component: IpSelectorComponent;
    let fixture: ComponentFixture<IpSelectorComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IpSelectorComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserDynamicTestingModule,
                BrowserAnimationsModule,
                MatCardModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatRadioModule,
                FormsModule,
                NgxIpModule,
            ],
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(IpSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        localStorage.clear();
        expect(component).toBeTruthy();
    });
});
