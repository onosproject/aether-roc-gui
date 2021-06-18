import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupEditComponent } from './device-group-edit.component';

describe('DeviceGroupEditComponent', () => {
  let component: DeviceGroupEditComponent;
  let fixture: ComponentFixture<DeviceGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceGroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
