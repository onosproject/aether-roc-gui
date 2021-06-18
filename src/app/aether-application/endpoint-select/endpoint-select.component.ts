import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {RocSelectBase} from "../../roc-select-base";
import {ApList} from "../../../openapi3/aether/3.0.0/models";
import {Service} from "../../../openapi3/aether/3.0.0/services/service";
import {FormBuilder} from "@angular/forms";
import {ApListApListService} from "../../../openapi3/aether/3.0.0/services/ap-list-ap-list.service";
import {AETHER_TARGETS} from "../../../environments/environment";
import {from} from "rxjs";


@Component({
    selector: 'aether-endpoint-select',
    templateUrl: './endpoint-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class EndpointSelectComponent implements OnInit {

    // @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<boolean>();

    @Output() name: string;
    @Output() address: string;
    @Output() 'port-start': string;
    @Output() 'port-end': string;
    @Output() protocol: string;

    endPointForm = this.fb.group({
        name: [''],
        address: [''],
        'port-start': [''],
        'port-end': [''],
        protocol: ['']
    });

    constructor(
        protected fb: FormBuilder,
    ) {
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }

    emitInformation(addressInput: string, tacInput: number, enabledInput: boolean){

    }

    ngOnInit(): void {
    }
}
