/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    AbstractControl,
    FormArray,
    FormGroup,
    ValidatorFn,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService, REQDATTRIBS } from './basket.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
    GenericRocDataSource,
    RocGenericContainerType,
    RocGenericModelType,
} from './roc-data-source';
import { TargetName } from '../openapi3/top/level/models';
import { EnterpriseService } from './enterprise.service';
import { SiteService } from '../openapi3/aether/2.1.0/services';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
import { SiteList } from '../openapi3/aether/2.1.0/models';

export interface SiteID {
    siteID: string;
    displayName: string;
}

export abstract class RocEditBase<
    T extends GenericRocDataSource<RocGenericModelType, RocGenericContainerType>
> {
    protected form: FormGroup;
    public isNewInstance: boolean; // For tests
    protected loadFunc: (id: string) => void;
    protected initFunc: () => string;
    public showParentDisplay = false;
    protected fullPath: string;
    public targetId: TargetName = { name: undefined };
    public sites: SiteID[] = [];
    public siteId: string;
    public unknownSite = 'unknownsite';
    public datasource: T;

    /**
     * @param snackBar The MatSnackBar service
     * @param bs The BasketService
     * @param enterpriseService EnterpriseService
     * @param siteService SiteService
     * @param route The current route
     * @param ds A class that extends RocDataSource
     * @param modelPath The path for this model in the Yang tree
     * @param targetAttribute the target attribute for this model e.g. enterprise-id
     */
    protected constructor(
        protected snackBar: MatSnackBar,
        protected bs: BasketService,
        protected enterpriseService: EnterpriseService,
        protected siteService: SiteService,
        protected route: ActivatedRoute,
        public ds: T,
        public modelPath: string[],
        protected targetAttribute = 'enterprise-id',
        public unknownTarget = 'unknownent'
    ) {
        this.datasource = ds;
    }

    init(): void {
        this.route.paramMap.subscribe((value) => {
            this.loadIds(value);
            if (value.get('id') === 'newinstance') {
                this.isNewInstance = true;
            } else {
                this.loadFunc(value.get('id'));
            }
            this.fullPath = this.calcFullPath(value);
            console.log('Full path', this.fullPath);
        });
    }

    loadIds(params: ParamMap): void {
        this.siteId = params.get('site-id');
        this.targetId = {
            name: params.get(this.targetAttribute),
        } as TargetName;
        console.log(
            `Populated component with {${this.targetAttribute}: ${this.targetId.name}, siteId: ${this.siteId}}`
        );
    }

    onSubmit(): void {
        console.log('Submitted!', this.form.getRawValue());
        const idAttr = this.modelPath[this.modelPath.length - 1];
        const submitId = this.form.get(idAttr).value as unknown as string;
        console.log(this.fullPath, this.targetId, this.siteId);
        if (this.fullPath.includes(this.unknownTarget)) {
            this.fullPath = this.fullPath.replace(
                this.unknownTarget,
                this.targetId.name
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
        let fullPath = `${this.targetAttribute}/${paramMap.get(
            this.targetAttribute
        )}`;

        if (paramMap.has('site-id')) {
            fullPath += `/${this.modelPath[0]}[site-id=${paramMap.get(
                'site-id'
            )}]`;
        } else if (paramMap.has('application-id')) {
            fullPath += `/${this.modelPath[0]}[application-id=${paramMap.get(
                'application-id'
            )}]`;
        } else if (paramMap.has('template-id')) {
            fullPath += `/${this.modelPath[0]}[template-id=${paramMap.get(
                'template-id'
            )}]`;
        } else if (paramMap.has('traffic-class-id')) {
            fullPath += `/${this.modelPath[0]}[traffic-class-id=${paramMap.get(
                'traffic-class-id'
            )}]`;
        } else if (paramMap.has('switch-model-id')) {
            fullPath += `/${this.modelPath[0]}[switch-model-id=${paramMap.get(
                'switch-model-id'
            )}]`;
        } else if (paramMap.has('switch-id')) {
            fullPath += `/${this.modelPath[0]}[switch-id=${paramMap.get(
                'switch-id'
            )}]`;
        } else if (paramMap.has('route-id')) {
            fullPath += `/${this.modelPath[0]}[route-id=${paramMap.get(
                'route-id'
            )}]`;
        } else if (paramMap.has('dhcp-server-id')) {
            fullPath += `/${this.modelPath[0]}[dhcp-server-id=${paramMap.get(
                'dhcp-server-id'
            )}]`;
        }

        const idAttr = this.modelPath[this.modelPath.length - 1];
        const modelName = this.modelPath[this.modelPath.length - 2];

        fullPath += `/${modelName}[${idAttr}=${paramMap.get('id')}]`;
        return fullPath;
    }

    public sitesOfEnterprise(optChange: MatOptionSelectionChange): void {
        if (!optChange.isUserInput) {
            return;
        }
        this.sites = [];
        this.siteService
            .getSiteList({
                'enterprise-id': optChange.source.value['name'],
            })
            .pipe(mergeMap((siteList: SiteList) => from(siteList)))
            .subscribe((site) => {
                this.sites.push({
                    siteID: site['site-id'],
                    displayName: site['display-name'],
                } as SiteID);
            });
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

    public urlValidator: ValidatorFn = (control: AbstractControl) => {
        let validUrl = true;
        if (control.value == null) {
            return null;
        }

        try {
            new URL(control.value);
        } catch {
            validUrl = false;
        }

        return validUrl ? null : { invalidUrl: true };
    };

    deleteAttrFromSelect(attr: string): void {
        this.bs.deleteIndexedEntry(
            `/${this.fullPath}/attribute[attribute-key=${attr}]`,
            'attribute-key',
            attr,
            this.ucmap()
        );
        const index = (
            this.form.get('attribute') as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === attr);
        (this.form.get('attribute') as FormArray).removeAt(index);
        this.snackBar.open(
            `Deletion of Attribute: ${attr} added to basket`,
            undefined,
            {
                duration: 2000,
            }
        );
    }
}
