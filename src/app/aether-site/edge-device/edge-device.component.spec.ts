/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD:src/app/aether-site/edge-device/edge-device.component.spec.ts
import { EdgeDeviceComponent } from './edge-device.component';
=======

import { SmallCellSelectComponent } from './small-cell-select.component';
>>>>>>> b029efa51c62d82a3be74f82fd63f211ebeb3737:src/app/aether-site/small-cell-select/small-cell-select.component.spec.ts
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {ShowParentModulesComponent} from "../show-parent-modules/show-parent-modules.component";

<<<<<<< HEAD:src/app/aether-site/edge-device/edge-device.component.spec.ts
describe('EdgeDeviceComponent', () => {
  let component: EdgeDeviceComponent;
  let fixture: ComponentFixture<EdgeDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeDeviceComponent ],
=======
describe('SmallCellSelectComponent', () => {
  let component: SmallCellSelectComponent;
  let fixture: ComponentFixture<SmallCellSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallCellSelectComponent ],
>>>>>>> b029efa51c62d82a3be74f82fd63f211ebeb3737:src/app/aether-site/small-cell-select/small-cell-select.component.spec.ts
        providers: [
            {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'standard'}}
        ],
        imports: [
            HttpClientTestingModule,
            RouterTestingModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            MatInputModule,
            MatFormFieldModule,
            MatIconModule,
            MatToolbarModule,
            MatCardModule,
            MatButtonModule,
            MatDividerModule,
            MatSnackBarModule,
            MatSelectModule
        ]
    })
    .compileComponents();
  });

<<<<<<< HEAD:src/app/aether-site/edge-device/edge-device.component.spec.ts
  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
=======
    beforeEach(() => {
        fixture = TestBed.createComponent(SmallCellSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
>>>>>>> b029efa51c62d82a3be74f82fd63f211ebeb3737:src/app/aether-site/small-cell-select/small-cell-select.component.spec.ts

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
