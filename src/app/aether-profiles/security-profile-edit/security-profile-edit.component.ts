/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {AETHER_TARGETS} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {
    ApiService,
    Service as AetherV200TargetService,
    SecurityProfileSecurityProfileService
} from '../../../openapi3/aether/2.0.0/services';
import {
    SecurityProfileSecurityProfile
} from "../../../openapi3/aether/2.0.0/models";

@Component({
    selector: 'aether-security-profile-edit',
    templateUrl: './security-profile-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
        './security-profile-edit.component.scss'
    ]
})
export class SecurityProfileEditComponent implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
    isNew: boolean;
    data: SecurityProfileSecurityProfile;

    spForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        key: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        opc: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(32),
        ])],
        sqn: [''],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])]
    });

    constructor(
        private securityProfileSecurityProfileService: SecurityProfileSecurityProfileService,
        private aetherV200TargetService: AetherV200TargetService,
        private aetherApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            value => {
                if (value.get('id') === 'new') {
                    this.isNew = true;
                } else {
                    this.id = value.get('id');
                    this.loadSecurityProfileSecurityProfile(this.target, this.id);
                }
            }
        );
    }

    loadSecurityProfileSecurityProfile(target: string, id: string): void {
        this.securityProfileSecurityProfileService.getSecurityProfileSecurityProfile({
            target,
            id,
        }).subscribe(
            (value => {
                this.data = value;
                this.spForm.get('id').setValue(value.id);
                this.spForm.get('display-name').setValue(value['display-name']);
                this.spForm.get('key').setValue(value.key);
                this.spForm.get('opc').setValue(value.opc);
                this.spForm.get('sqn').setValue(value.sqn);
                this.spForm.get('description').setValue(value.description);
            }),
            error => {
                console.warn('Error getting SecurityProfileSecurityProfile(s) for ', target, error);
            },
            () => {
                console.log('Finished loading SecurityProfileSecurityProfile(s)', target, id);
            }
        );
    }

    onSubmit(): void {
        console.log('Submitted!', this.spForm.getRawValue());
        //This will be changed to a for loop taking in all attributes of a security profile object to be compared to later
        let dataValues = [
            this.spForm.get('id'),
            this.spForm.get('display-name'),
            this.spForm.get('key'),
            this.spForm.get('opc'),
            this.spForm.get('sqn'),
            this.spForm.get('description')
        ];
        //First for loop for checking first attribute
        console.log('BEFORE LOOP');
        for(let i =0; i < dataValues.length; i++) {
            let submitId = this.id;
            if (dataValues[0] === undefined) {
                submitId = this.spForm.get('id').value as unknown as string;
            }
            if (dataValues[i].valid == false) {
                console.log("INVALID DATA PROVIDED")
                break;
            } else {
                if (dataValues[i].dirty == true && dataValues[i].touched == true) {
                    //Add to basket
                    console.log(dataValues[i].value, ' is sent to basket');
                    //Setting the item changed to be named itself
                    localStorage.setItem(dataValues[i].toString(), dataValues[i].value);
                } else {
                    //Do nothing
                    console.log('Not sent to basket');
                }
            }
        }
        console.log('AFTER LOOP');
        
        //Commented this out since the POST will be 1 big POST on the basket instead of individual POSTs

        //POST
        // this.aetherApiService.postSecurityProfileSecurityProfile({
        //     id: submitId,
        //     target: AETHER_TARGETS[0],
        //     body: this.spForm.getRawValue()
        // }).subscribe(
        //     value => {
        //         console.log('POST Response', value);
        //         // TODO: Add a string to the response in the OpenAPI yaml (so that this is not unknown)
        //         this.router.navigate(['/profiles', 'securityprofiles', value as unknown as string]);
        //     },
        //     error => console.warn('POST error', error),
        //     () => {
        //         console.log('POST finished');
        //     }
        // );
    }
}
