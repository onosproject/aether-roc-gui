/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {RbacV100TargetRbacService} from '../../../openapi3/rbac/1.0.0/services/rbac-v-100-target-rbac.service';
import {ApiService} from '../../../openapi3/rbac/1.0.0/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {RBAC_TARGET} from '../../../environments/environment';
import {RbacV100TargetService} from '../../../openapi3/rbac/1.0.0/services';

@Component({
    selector: 'aether-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {
    groupid: string = 'new';
    roleRefIds: Array<string> = [];
    roleRefControls = new FormArray([
        this.fb.group({
            roleid: [''],
            description: ['']
        })
    ]);
    roleIds: Array<string> = [];
    groupForm = this.fb.group({
        groupid: [''],
        description: [''],
        ListRbacV100targetRbacGroupRole: this.roleRefControls
    });

    constructor(
        private rbacV100TargetRbacService: RbacV100TargetRbacService,
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

    loadGroup(groupid: string): void {
        this.rbacV100TargetRbacService.getRbacV100TargetRbacGroup({
            target: RBAC_TARGET, groupid
        }).subscribe(
            (value => {
                this.groupForm.get('groupid').setValue(value.groupid);
                this.groupForm.get('description').setValue(value.description);
                this.roleRefControls.removeAt(0);
                for (const roleref of value.ListRbacV100targetRbacGroupRole) {
                    this.roleRefIds.push(roleref.roleid);
                    this.roleRefControls.push(new FormControl(roleref));
                }
                console.log('Got Group', groupid);
            }),
            error => {
                console.warn('Error getting Group ', groupid, ' for ', RBAC_TARGET, error);
            },
        );
    }

    loadRoleIds(): void {
        this.rbacV100TargetService.getRbacV100TargetRbac({
            target: RBAC_TARGET
        }).subscribe(
            (value => {
                this.roleIds = value.ListRbacV100targetRbacRole.map(r => r.roleid);
            }),
            error => {
                console.warn('Error getting RBAC info for ', RBAC_TARGET, error);
            },
        );
    }

    addRoleRef(): void {
        this.roleRefControls.push(new FormControl(''));
    }

    onSubmit(): void {
        console.log('Submitted!', this.groupForm.getRawValue());
        this.rbacApiService.postRbacV100TargetRbacGroup({
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
