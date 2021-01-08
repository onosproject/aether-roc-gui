/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {RBAC_TARGET} from '../../../environments/environment';
import {
    ApiService,
    RbacRoleService as RbacV100TargetRbacService,
} from '../../../openapi3/rbac/1.0.0/services';

export enum Operation {
    UNKNOWN = 'UNKNOWN',
    READ = 'READ',
    CREATE = 'CREATE',
    ALL = 'ALL'
}

export enum Type {
    UNKNOWN = 'UNKNOWN',
    CONFIG = 'CONFIG',
    GRPC = 'GRPC'
}

@Component({
    selector: 'aether-role-edit',
    templateUrl: './role-edit.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class RoleEditComponent implements OnInit {
    roleid: string = 'new';
    ops: Array<Operation> = [Operation.UNKNOWN, Operation.CREATE, Operation.READ, Operation.ALL];
    types: Array<Type> = [Type.UNKNOWN, Type.CONFIG, Type.GRPC];
    nouns: Array<string> = [];
    nounControls: FormArray = new FormArray([]);
    roleForm = this.fb.group({
        roleid: [''],
        description: [''],
        RbacV100targetRbacRolePermission: this.fb.group({
            operation: [''],
            type: [''],
            'leaf-list-noun': this.nounControls,
        })
    });

    constructor(
        private rbacV100TargetRbacService: RbacV100TargetRbacService,
        private rbacApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.roleid = params.get('roleid');
            this.loadRole(this.roleid);
        });
    }

    loadRole(roleid: string): void {
        this.rbacV100TargetRbacService.getRbacRole({
            target: RBAC_TARGET, roleid,
        }).subscribe(
            (value => {
                this.roleForm.get('roleid').setValue(value.roleid);
                this.roleForm.get('description').setValue(value.description);
                this.roleForm
                    .get('RbacV100targetRbacRolePermission')
                    .get('operation')
                    .setValue(value.Permission.operation);
                this.roleForm
                    .get('RbacV100targetRbacRolePermission')
                    .get('type')
                    .setValue(value.Permission.type);
                for (const noun of value.Permission['leaf-list-noun']) {
                    this.nouns.push(noun);
                    this.nounControls.push(new FormControl(noun));
                }
                console.log('Got Role', roleid);
            }),
            error => {
                console.warn('Error getting Role ', roleid, ' for ', RBAC_TARGET, error);
            },
        );
    }

    addNoun(): void {
        this.nounControls.push(new FormControl(''));
    }

    onSubmit(): void {
        console.log('Submitted!', this.roleForm.getRawValue());
        this.rbacApiService.postRbacRole({
            roleid: this.roleid,
            target: RBAC_TARGET,
            body: this.roleForm.getRawValue()
        }).subscribe(
            value => {
                console.log('POST Response', value);
                // TODO: Add a string to the response in the OpenAPI yaml (so that this is not unknown)
                this.router.navigate(['/rbac', 'roles', value as unknown as string]);
            },
            error => console.warn('POST error', error),
            () => {
                console.log('POST finished');
            }
        );
    }
}
