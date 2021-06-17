import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {RocSelectBase} from "../../roc-select-base";
import {ApList} from "../../../openapi3/aether/3.0.0/models";
import {Service} from "../../../openapi3/aether/3.0.0/services/service";
import {FormBuilder} from "@angular/forms";
import {ApListApListService} from "../../../openapi3/aether/3.0.0/services/ap-list-ap-list.service";
import {AETHER_TARGETS} from "../../../environments/environment";


@Component({
    selector: 'aether-access-point-select',
    templateUrl: './access-point-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class AccessPointSelectComponent implements OnInit {

    // @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<boolean>();

    @Output() address: string;
    @Output() tac: number;
    @Output() enable: boolean;

    accessForm = this.fb.group({
        address: [''],
        tac: [''],
        enable: ['']
    });

    constructor(
        protected fb: FormBuilder,
    ) {
    }

    addToAccessForm(addressInput: string, tacInput: number, enableInput: boolean): void {
        console.log(addressInput, tacInput, enableInput);
        if (enableInput === undefined) {
            enableInput === false;
        }
        this.accessForm.get('enable').setValue(enableInput);
        this.accessForm.get('address').setValue(addressInput);
        this.accessForm.get('tac').setValue(tacInput);
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }

    ngOnInit(): void {
    }
}



