import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";


@Component({
    selector: 'aether-imsis-select',
    templateUrl: './imsis-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class ImsisSelectComponent implements OnInit {

    @Output() closeEvent = new EventEmitter<boolean>();

    @Output() name: string;
    @Output() 'imsi-range-from': number;
    @Output() 'imsi-range-to': number;

    imsiForm = this.fb.group({
        name: [''],
        'imsi-range-from': [''],
        'imsi-range-to': ['']
    });

    constructor(
        protected fb: FormBuilder,
    ) {
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }

    ngOnInit(): void {
    }

}
