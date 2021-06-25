import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupSelectComponent } from './device-group-select.component';

describe('DeviceGroupSelectComponent', () => {
  let component: DeviceGroupSelectComponent;
  let fixture: ComponentFixture<DeviceGroupSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceGroupSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
