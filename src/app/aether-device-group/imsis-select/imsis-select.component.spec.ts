import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsisSelectComponent } from './imsis-select.component';

describe('ImsisSelectComponent', () => {
  let component: ImsisSelectComponent;
  let fixture: ComponentFixture<ImsisSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImsisSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsisSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
