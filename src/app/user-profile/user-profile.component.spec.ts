/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileComponent} from './user-profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {IdTokClaims} from '../aether.component';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserProfileComponent],
            imports: [
                MatCardModule,
                MatListModule,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        const testTokClObj = {
            name: 'Test User',
            email: 'test@opennetworking.org',
            groups: ['group1', 'group2'],
        } as IdTokClaims;
        localStorage.setItem('id_token_claims_obj', JSON.stringify(testTokClObj));
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
