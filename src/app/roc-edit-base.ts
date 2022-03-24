/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService, REQDATTRIBS } from './basket.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AETHER_TARGET } from '../environments/environment';
import { Service as AetherService } from '../openapi3/aether/2.0.0/services';
import {
    GenericRocDataSource,
    RocGenericContainerType,
    RocGenericModelType,
} from './roc-data-source';

export interface EnterpriseID {
    enterpriseId: string;
    displayName: string;
    sites: SiteID[];
}

export interface SiteID {
    siteID: string;
    displayName: string;
}

export abstract class RocEditBase<
    T extends GenericRocDataSource<RocGenericModelType, RocGenericContainerType>
> {
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
    public datasource: T;

    /**
     * @param snackBar The MatSnackBar service
     * @param bs The BasketService
     * @param route The current route
     * @param ds A class that extends RocDataSource
     * @param modelPath The path for this model in the Yang tree
     * @param aetherService The aetherService, used to load enterprises
     */
    protected constructor(
        protected snackBar: MatSnackBar,
        protected bs: BasketService,
        protected route: ActivatedRoute,
        public ds: T,
        public modelPath: string[],
        protected aetherService?: AetherService
    ) {
        this.datasource = ds;
    }

    init(): void {
        this.route.paramMap.subscribe((value) => {
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
            console.log('Full path', this.fullPath);
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
        console.log('Submitted!', this.form.getRawValue());
        const idAttr = this.modelPath[this.modelPath.length - 1];
        const submitId = this.form.get(idAttr).value as unknown as string;
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
                this.form.get(idAttr).value
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

    // TODO this needs to be built out of modelPath, don't base it on the URL params,
    // just read them
    public calcFullPath(paramMap: ParamMap): string {
        // set the base for the full path
        let fullPath = this.modelPath[0];

        if (paramMap.has('enterprise-id')) {
            fullPath += `/enterprise[enterprise-id=${paramMap.get(
                'enterprise-id'
            )}]`;
        }
        if (paramMap.has('site-id')) {
            fullPath += `/site[site-id=${paramMap.get('site-id')}]`;
        }

        const idAttr = this.modelPath[this.modelPath.length - 1];
        const modelName = this.modelPath[this.modelPath.length - 2];

        fullPath += `/${modelName}[${idAttr}=${paramMap.get('id')}]`;
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
