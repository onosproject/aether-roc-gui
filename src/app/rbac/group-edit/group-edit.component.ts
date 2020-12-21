/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../openapi3/rbac/1.0.0/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RBAC_TARGET} from '../../../environments/environment';
import {Service as RbacV100TargetService, RbacGroupService} from '../../../openapi3/rbac/1.0.0/services';

@Component({
    selector: 'aether-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: ['../common.component.scss']
})
export class GroupEditComponent implements OnInit {
    groupid: string = 'new';
    roleIds: Array<string> = [];
    groupForm = this.fb.group({
        groupid: [''],
        description: [''],
        ListRbacV100targetRbacGroupRole: this.fb.array([])
    });

    constructor(
        private rbacV100TargetRbacService: RbacGroupService,
        private rbacV100TargetService: RbacV100TargetService,
        private rbacApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.groupid = params.get('groupid');
            this.loadGroup(this.groupid);
        });
        this.loadRoleIds();
    }

    get roleRefControls(): FormArray {
        return this.groupForm.get('ListRbacV100targetRbacGroupRole') as FormArray;
    }

    loadGroup(groupid: string): void {
        this.rbacV100TargetRbacService.getRbacGroup({
            target: RBAC_TARGET, groupid
        }).subscribe(
            (value => {
                this.groupForm.get('groupid').setValue(value.groupid);
                this.groupForm.get('description').setValue(value.description);
                for (const roleref of value.Role) {
                    this.roleRefControls.push(this.fb.group({
                        roleid: roleref.roleid,
                        description: roleref.description,
                    }));
                }
                console.log('Got Group', groupid);
            }),
            error => {
                console.warn('Error getting Group ', groupid, ' for ', RBAC_TARGET, error);
            },
        );
    }

    loadRoleIds(): void {
        this.rbacV100TargetService.getRbac({
            target: RBAC_TARGET
        }).subscribe(
            (value => {
                this.roleIds = value.Role.map(r => r.roleid);
            }),
            error => {
                console.warn('Error getting RBAC info for ', RBAC_TARGET, error);
            },
        );
    }

    addRoleRef(): void {
        this.roleRefControls.push(this.fb.group({
            roleid: 'new',
            description: 'new role reference'
        }));
    }

    onSubmit(): void {
        console.log('Submitted!', this.groupForm.getRawValue());
        this.rbacApiService.postRbacGroup({
            groupid: this.groupid,
            target: RBAC_TARGET,
            body: this.groupForm.getRawValue()
        }).subscribe(
            value => {
                console.log('POST Response', value);
                // TODO: Add a string to the response in the OpenAPI yaml (so that this is not unknown)
                this.router.navigate(['/rbac', 'groups', value as unknown as string]);
            },
            error => console.warn('POST error', error),
            () => {
                console.log('POST finished');
            }
        );
    }
}
