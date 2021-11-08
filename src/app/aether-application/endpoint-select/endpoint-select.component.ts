/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '../../../openapi3/aether/4.0.0/services';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AETHER_TARGETS} from '../../../environments/environment';
import {RocSelectBase} from '../../roc-select-base';
import {TrafficClassTrafficClass} from "../../../openapi3/aether/4.0.0/models/traffic-class-traffic-class";
import {Observable} from "rxjs";
import {Bandwidths} from "../../aether-template/template-edit/template-edit.component";
import {map, startWith} from "rxjs/operators";

export interface EndPointParam {
    'endpoint-id': string;
    'display-name': string;
    protocol: string;
    portStart: number;
    portEnd: number;
    trafficClass: string;
    mbrUplink:number;
    mbrDownlink:number;
}

const ValidatePortRange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const portStart = control.get(['port-start']).value;
    const portEnd = control.get(['port-end']).value;
    return portStart <= portEnd ? null : {isEndpointNotValid: true};
};

@Component({
    selector: 'aether-endpoint-select',
    templateUrl: './endpoint-select.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class EndpointSelectComponent {

    protocolOptions = [
        {name: 'UDP'},
        {name: 'TCP'},
    ];

    options: Bandwidths[] = [
        {megabyte: {numerical: 1000000, inMb: '1Mbps'}},
        {megabyte: {numerical: 2000000, inMb: '2Mbps'}},
        {megabyte: {numerical: 5000000, inMb: '5Mbps'}},
        {megabyte: {numerical: 10000000, inMb: '10Mbps'}},
        {megabyte: {numerical: 25000000, inMb: '25Mbps'}},
        {megabyte: {numerical: 50000000, inMb: '50Mbps'}},
        {megabyte: {numerical: 100000000, inMb: '100Mbps'}},
        {megabyte: {numerical: 500000000, inMb: '500Mbps'}}
    ];
    bandwidthOptions: Observable<Bandwidths[]>;

    @Input() alreadySelected: string[] = [];
    @Input() trafficClassOptions: Array<TrafficClassTrafficClass>
    @Output() closeEvent = new EventEmitter<EndPointParam>();

    endpointForm = this.fb.group({
        ['endpoint-id']: [undefined, Validators.compose([
            Validators.required
        ])],
        ['display-name']: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'port-start': [undefined,
            Validators.compose([
                Validators.min(1),
                Validators.max(65535)
            ])
        ],
        'port-end': [undefined,
            Validators.compose([
                Validators.min(1),
                Validators.max(65535)
            ])],
        protocol: [undefined],
        'traffic-class':[undefined],
        mbr: this.fb.group({
            uplink: [undefined, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)
            ])],
            downlink: [undefined, Validators.compose([
                Validators.min(0),
                Validators.max(4294967295)
            ])]
        }),
    }, {validators: ValidatePortRange});

    constructor(
        protected service: Service,
        protected fb: FormBuilder
    ) {
        this.bandwidthOptions = this.endpointForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
    }

    get mbrControls(): FormGroup {
        return this.endpointForm.get(['mbr']) as FormGroup;
    }

    private _filter(bandwidthIndex: number): Bandwidths[] {
        const filterValue = bandwidthIndex;
        return this.options.filter(option => option.megabyte.numerical);
    }

    closeCard(cancelled: boolean): void {
        if (cancelled) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit({
                'endpoint-id': this.endpointForm.get('endpoint-id').value,
                'display-name': this.endpointForm.get('display-name').value,
                portStart: this.endpointForm.get('port-start').value,
                portEnd: this.endpointForm.get('port-end').value,
                protocol: this.endpointForm.get('protocol').value,
                trafficClass: this.endpointForm.get('traffic-class').value,
                mbrUplink: this.endpointForm.get(['mbr','uplink']).value,
                mbrDownlink: this.endpointForm.get(['mbr','downlink']).value
            } as EndPointParam);
        }
    }

}
