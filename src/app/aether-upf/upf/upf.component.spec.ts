/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {ApiModule} from '../../../openapi3/aether/3.0.0/api.module';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import { UpfComponent } from './upf.component';
import {MatFormFieldModule} from '@angular/material/form-field';

describe('UpfComponent', () => {
  let component: UpfComponent;
  let fixture: ComponentFixture<UpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpfComponent ],
      imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MatPaginatorModule,
          MatFormFieldModule,
          MatSortModule,
          MatTableModule,
          MatSnackBarModule,
          MatToolbarModule,
          MatIconModule,
          ApiModule
      ],
      providers: [
          {provide: ActivatedRoute, useValue: {paramMap: of({ get: (key) => 'value' })}},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
