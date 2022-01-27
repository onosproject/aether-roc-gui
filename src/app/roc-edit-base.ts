/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService } from './basket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AETHER_TARGETS } from '../environments/environment';
import { RocElement } from '../openapi3/top/level/models/elements';

export abstract class RocEditBase {
    protected form: FormGroup;
    public isNewInstance: boolean;
    protected loadFunc: (target: string, id: string) => void;
    protected initFunc: () => string;
    public showParentDisplay: boolean = false;

    protected constructor(
        protected snackBar: MatSnackBar,
        protected bs: BasketService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected pathRoot: RocElement,
        protected pathListAttr: string,
        protected idAttr: string = 'id'
    ) {}

    init(): void {
        this.route.paramMap.subscribe((value) => {
            if (
                value.get('id') === 'newinstance' &&
                value.get('ent-id') === 'newentinstance' &&
                value.get('SITE-id') === 'newentSITEinstance'
            ) {
                this.isNewInstance = true;
                if (this.initFunc) {
                    this.form.get('id').setValue(this.initFunc());
                }
                console.log('New control', this.pathRoot);
            } else {
                this.form.get('id').setValue(value.get('id'));
                this.loadFunc(this.target, value.get('id'));
            }
        });
    }

    onSubmit(): void {
        console.log('Submitted!', this.form.getRawValue());
        let submitId = this.id;
        if (this.id === undefined) {
            submitId = this.form.get(this.idAttr).value as unknown as string;
        }
        if (submitId !== '' && submitId !== undefined) {
            this.bs.logKeyValuePairs(
                this.form,
                this.pathRoot +
                    '/' +
                    this.pathListAttr +
                    '[' +
                    this.idAttr +
                    '=' +
                    submitId +
                    ']'
            );
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
        return this.form.get('id').value;
    }

    get target(): string {
        return AETHER_TARGETS[0];
    }

    public get isNew(): boolean {
        return this.isNewInstance;
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }
}
