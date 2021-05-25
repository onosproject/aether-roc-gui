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
        localStorage.clear();
        localStorage.clear();
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/0/key', '{"newValue":"key2","oldValue":"key1"}');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/0/opc', '{"newValue":"opcValue2","oldValue":"opcValue1"}');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/0/id', '{"newValue":"ap2","oldValue":"ap1"}');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/1/key', '{"newValue":"key2","oldValue":"key1"}');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/1/num', '{"newValue":5678,"oldValue":1234}');
        localStorage.setItem('/basket-update/Security-profile-2.1.0/Security-profile[]/0/boolean', '{"newValue":true,"oldValue":false}');
        localStorage.setItem('/basket-delete/Security-profile-2.1.0/Security-profile[]/0/desc', '{"newValue":"undefined","oldValue":"desc1"}');
        localStorage.setItem('/basket-delete/Security-profile-2.1.0/Security-profile[]/0/something', '{"newValue":"undefined","oldValue":"something1"}');
        localStorage.setItem('/basket-delete/Security-profile-2.1.0/Security-profile[]/1/desc', '{"newValue":"undefined","oldValue":"desc2"}');
    });
});
