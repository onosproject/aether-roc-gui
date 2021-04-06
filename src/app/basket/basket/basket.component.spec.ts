/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BasketComponent} from './basket.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {ApiModule} from '../../../openapi3/aether/2.1.0/api.module';


describe('BasketComponent', () => {
    let component: BasketComponent;
    let fixture: ComponentFixture<BasketComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BasketComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatSortModule,
                MatTableModule,
                MatSnackBarModule,
                MatToolbarModule,
                MatIconModule,
                ApiModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BasketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display stuff from localstorage', () => {
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/0/key', 'keyValue1');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/0/opc', 'opcValue1');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/0/id', 'ap1');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/1/key', 'keyValue2');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/1/opc', 'opcValue2');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/1/id', 'ap2');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/0/sqn', 'sqnValue1');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/0/opc', 'opcValue1');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/0/id', 'id1');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/1/sqn', 'sqnValue2');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/1/opc', 'opcValue2');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/1/id', 'id2');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/1/New-Array[]/0/id', 'id200');
        localStorage.setItem('/basket-update/Access-profile-2.1.0/Access-profile[]/1/New-Array[]/0/desc', 'text');
        localStorage.setItem('/basket-delete/Security-profile-2.1.0/Security-profile[]/0/desc', '');
        localStorage.setItem('/basket-delete/Security-profile-2.1.0/Security-profile[]/0/something', '');
        localStorage.setItem('/basket-delete/Security-profile-2.1.0/Security-profile[]/1/desc', '');
        localStorage.setItem('/basket-delete/Security-profile-2.1.0/Security-profile[]/1/something', '');
        localStorage.setItem('/basket-delete/Access-profile-2.1.0/Access-profile[]/0/id', 'id4');
        localStorage.setItem('/basket-delete/Access-profile-2.1.0/Access-profile[]/0/desc', '');
        localStorage.setItem('/basket-delete/Access-profile-2.1.0/Access-profile[]/1/id', 'id5');
        localStorage.setItem('/basket-delete/Access-profile-2.1.0/Access-profile[]/1/desc', '');
    });
});
