/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService, REQDATTRIBS } from './basket.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AETHER_TARGET } from '../environments/environment';
import { RocElement } from '../openapi3/top/level/models/elements';
import { Service as AetherService } from '../openapi3/aether/2.0.0/services';
import * as _ from 'lodash';

export interface EnterpriseID {
    enterpriseId: string;
    displayName: string;
    sites: SiteID[];
}

export interface SiteID {
    siteID: string;
    displayName: string;
}

export abstract class RocEditBase {
    protected form: FormGroup;
    public isNewInstance: boolean; // For tests
    protected loadFunc: (target: string, id: string) => void;
    protected initFunc: () => string;
    public showParentDisplay = false;
    protected fullPath: string;
    public enterprises = new Array<EnterpriseID>();
    public enterpriseId: string;
    public siteId: string;
    public unknownEnterprise = 'unknownent';
    public unknownSite = 'unknownsite';

    protected constructor(
        protected snackBar: MatSnackBar,
        protected bs: BasketService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected pathRoot: RocElement,
        protected pathListAttr: string,
        protected idAttr: string = 'id',
        protected aetherService?: AetherService
    ) {}

    init(): void {
        this.route.paramMap.subscribe((value) => {
            console.log('Full path', this.fullPath);
            this.loadIds(value);
            if (value.get('id') === 'newinstance') {
                this.isNewInstance = true;
                if (value.keys.length > 1) {
                    this.loadEnterprises();
                }
            } else {
                this.loadFunc(this.target, value.get('id'));
            }
            this.fullPath = this.calcFullPath(value);
        });
    }

    loadIds(params: ParamMap): void {
        this.siteId = params.get('site-id');
        this.enterpriseId = params.get('enterprise-id');
        console.log(
            `Populated component with {enterpriseId: ${this.enterpriseId}, siteId: ${this.siteId}}`
        );
    }

    onSubmit(): void {
        if (
            this.enterpriseId == this.unknownEnterprise ||
            _.isNil(this.enterpriseId)
        ) {
            this.snackBar.open('Enterprise must be set', undefined, {
                duration: 5000,
                politeness: 'assertive',
            });
            return;
        }
        if (this.siteId == this.unknownSite || _.isNil(this.siteId)) {
            this.snackBar.open('Site must be set', undefined, {
                duration: 5000,
                politeness: 'assertive',
            });
            return;
        }
        console.log('Submitted!', this.form.getRawValue());
        const submitId = this.form.get(this.idAttr).value as unknown as string;
        console.log(this.fullPath, this.enterpriseId, this.siteId);
        if (this.fullPath.includes(this.unknownEnterprise)) {
            this.fullPath = this.fullPath.replace(
                this.unknownEnterprise,
                this.enterpriseId
            );
        }
        if (this.fullPath.includes(this.unknownSite)) {
            this.fullPath = this.fullPath.replace(
                this.unknownSite,
                this.siteId
            );
        }
        if (this.fullPath.includes('newinstance')) {
            this.fullPath = this.fullPath.replace(
                'newinstance',
                this.form.get(this.idAttr).value
            );
        }
        console.log('Updated', this.fullPath);
        if (submitId !== '' && submitId !== undefined) {
            this.bs.logKeyValuePairs(this.form, this.fullPath);
            this.snackBar.open('Added to basket', undefined, {
                duration: 2000,
                politeness: 'polite',
            });
        } else {
            this.snackBar.open('ID must be set', undefined, {
                duration: 5000,
                politeness: 'assertive',
            });
        }
    }

    get id(): string {
        return '??????????????????????????????/';
    }

    get target(): string {
        return AETHER_TARGET;
    }

    public get isNew(): boolean {
        return this.isNewInstance;
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }

    private calcFullPath(paramMap: ParamMap): string {
        let fullPath = this.pathRoot;
        if (paramMap.has('enterprise-id')) {
            fullPath +=
                '/enterprise[enterprise-id=' +
                paramMap.get('enterprise-id') +
                ']';
        }
        if (paramMap.has('site-id')) {
            fullPath += '/site[site-id=' + paramMap.get('site-id') + ']';
        }
        fullPath +=
            '/' +
            this.pathListAttr +
            '[' +
            this.idAttr +
            '=' +
            paramMap.get('id') +
            ']';
        return fullPath;
    }

    loadEnterprises(): void {
        this.aetherService
            .getEnterprises({ target: AETHER_TARGET })
            .subscribe((es) => {
                es.enterprise.forEach((e) => {
                    const entID = {
                        enterpriseId: e['enterprise-id'],
                        displayName: e['display-name'],
                        sites: new Array<SiteID>(),
                    } as EnterpriseID;
                    e.site.forEach((s) =>
                        entID.sites.push({
                            siteID: s['site-id'],
                            displayName: s['display-name'],
                        })
                    );

                    this.enterprises.push(entID);
                });
            });
    }

    public sitesOfEnterprise(entID: string): SiteID[] {
        if (entID == this.unknownEnterprise) {
            return [];
        }
        if (this.enterprises.length && entID !== this.unknownEnterprise) {
            return this.enterprises.find((e) => e.enterpriseId === entID).sites;
        }
    }

    protected ucmap(): Map<string, string> {
        const ucMap = new Map<string, string>();
        const sliceId = '/' + this.fullPath;
        let parentUc = localStorage.getItem(sliceId);
        if (parentUc === null) {
            parentUc = this.form[REQDATTRIBS];
        }
        ucMap.set(sliceId, parentUc);
        return ucMap;
    }
}
