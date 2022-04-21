/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpDomainEditComponent } from './ip-domain-edit.component';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { TargetsNames } from '../../../openapi3/top/level/models/targets-names';
import { TargetName } from '../../../openapi3/top/level/models/target-name';
import { EnterpriseService } from '../../enterprise.service';
import { HttpClient } from '@angular/common/http';
import { SiteIpDomain } from '../../../openapi3/aether/2.1.0/models/site-ip-domain';

const testData: SiteIpDomain = {
    'ip-domain-id': 'test-ipd-1',
    dnn: 'test.dnn',
    subnet: '10.10.10.10/24',
};

class mockEnterpriseService {
    get enterprises(): TargetsNames {
        return [
            {
                name: 'test-ent',
            },
        ] as TargetName[];
    }
}

describe('IpDomainEditComponent', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let component: IpDomainEditComponent;
    let fixture: ComponentFixture<IpDomainEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IpDomainEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
                {
                    provide: EnterpriseService,
                    useClass: mockEnterpriseService,
                },
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatSelectModule,
                MatIconModule,
                MatToolbarModule,
                MatCardModule,
                MatButtonModule,
                MatSnackBarModule,
                MatSlideToggleModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        // Inject the http service and test controller for each test
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(IpDomainEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(
            '/aether/v2.1.x//site//ip-domain/'
        );

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate subnet with port in 10-20 range', () => {
        const subnetControl = component.ipForm.get('subnet');
        subnetControl.setValue('10.11.12.13/16');
        expect(subnetControl.valid).toBeTruthy();
    });

    it('should not validate subnet with port over 32', () => {
        const subnetControl = component.ipForm.get('subnet');
        subnetControl.setValue('10.11.12.13/33');
        expect(subnetControl.valid).toBeFalse();
    });

    it('should not validate mtu if it exceeds', () => {
        const subnetControl = component.ipForm.get('mtu');
        subnetControl.setValue(65536);
        expect(subnetControl.valid).toBeFalse();
    });

    it('should validate mtu if it does not exceeds', () => {
        const subnetControl = component.ipForm.get('mtu');
        subnetControl.setValue(6555);
        expect(subnetControl.valid).toBeTruthy();
    });

    it('should validate dnn if it doesnt exceeds', () => {
        const dnnControl = component.ipForm.get('dnn');
        dnnControl.setValue(12);
        console.log(dnnControl, 'dnnControl');
        expect(dnnControl.valid).toBeTruthy();
    });

    it('should change admin status', () => {
        const adminStControl = component.ipForm.get('admin-status');
        expect(adminStControl.value).toBeNull();
        component.option = 'ENABLE';
        component.changeAdminStatus();
        expect(adminStControl.value).toEqual('ENABLE');
    })
});
