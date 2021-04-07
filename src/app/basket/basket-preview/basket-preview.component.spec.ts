/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BasketPreviewComponent} from './basket-preview.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('BasketPreviewComponent', () => {
    let component: BasketPreviewComponent;
    let fixture: ComponentFixture<BasketPreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatListModule,
                ClipboardModule,
                MatSnackBarModule,
            ],
            declarations: [BasketPreviewComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BasketPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
