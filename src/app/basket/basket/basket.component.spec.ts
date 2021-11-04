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
import {ApiModule} from '../../../openapi3/aether/4.0.0/api.module';
import {ApiService} from "../../../openapi3/top/level/services";
import {Observable, Observer} from "rxjs";

describe('The BasketComponent', () => {
    let component: BasketComponent;
    let fixture: ComponentFixture<BasketComponent>;
    let mockApiService;

    beforeEach(async () => {
        mockApiService = jasmine.createSpyObj(['patchTopLevel']);
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
            ],
            providers: [
                {provide: ApiService, useValue: mockApiService}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        localStorage.clear();
        localStorage.clear();
        fixture = TestBed.createComponent(BasketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        localStorage.clear();
        localStorage.clear();
        expect(component).toBeTruthy();
    });

    it('should display stuff from localstorage', () => {
        localStorage.clear();
        localStorage.clear();
        localStorage.setItem('/basket-update/Security-profile-4.0.0/Security-profile[]/0/key', '{"newValue":"key2","oldValue":"key1"}');
        localStorage.setItem('/basket-update/Security-profile-4.0.0/Security-profile[]/0/opc', '{"newValue":"opcValue2","oldValue":"opcValue1"}');
        localStorage.setItem('/basket-update/Security-profile-4.0.0/Security-profile[]/0/id', '{"newValue":"ap2","oldValue":"ap1"}');
        localStorage.setItem('/basket-update/Security-profile-4.0.0/Security-profile[]/1/key', '{"newValue":"key2","oldValue":"key1"}');
        localStorage.setItem('/basket-update/Security-profile-4.0.0/Security-profile[]/1/num', '{"newValue":5678,"oldValue":1234}');
        localStorage.setItem('/basket-update/Security-profile-4.0.0/Security-profile[]/0/boolean', '{"newValue":true,"oldValue":false}');
        localStorage.setItem('/basket-delete/Security-profile-4.0.0/Security-profile[]/0/desc', '{"newValue":"undefined","oldValue":"desc1"}');
        localStorage.setItem('/basket-delete/Security-profile-4.0.0/Security-profile[]/0/something', '{"newValue":"undefined","oldValue":"something1"}');
        localStorage.setItem('/basket-delete/Security-profile-4.0.0/Security-profile[]/1/desc', '{"newValue":"undefined","oldValue":"desc2"}');
    });

    describe('when committing the content', () => {
        let confirmSpy;
        beforeEach(() => {
            confirmSpy = spyOn(window, 'confirm');
        })
        it('should ask for confirmation', () => {
            confirmSpy.and.returnValue(false);
            component.commitChanges()
            expect(mockApiService.patchTopLevel).not.toHaveBeenCalled();
        })

        it('should not clear the basket in case of error', () => {

            // spy on the clear basket method
            const clearBasketSpy = spyOn(component, "clearBasket")

            // mock the system to call the backend and return an error
            confirmSpy.and.returnValue(true);
            const observableWithFailure = new Observable((observer: Observer<any>) => {
                observer.error("test-error")
            })
            mockApiService.patchTopLevel.and.returnValue(observableWithFailure)
            component.commitChanges()
            expect(clearBasketSpy).not.toHaveBeenCalled()
        })

        it('should clear the basket in case of success', () => {

            // spy on the clear basket method
            const clearBasketSpy = spyOn(component, "clearBasket")

            // mock the system to call the backend and return an error
            confirmSpy.and.returnValue(true);
            const observableWithFailure = new Observable((observer: Observer<any>) => {
                observer.next("test-success")
            })
            mockApiService.patchTopLevel.and.returnValue(observableWithFailure)
            component.commitChanges()
            expect(clearBasketSpy).toHaveBeenCalled()
        })
    });
});
