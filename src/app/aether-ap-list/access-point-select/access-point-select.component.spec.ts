import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPointSelectComponent } from './access-point-select.component';

describe('AccessPointSelectComponent', () => {
  let component: AccessPointSelectComponent;
  let fixture: ComponentFixture<AccessPointSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPointSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPointSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
