import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointSelectComponent } from './endpoint-select.component';

describe('EndpointSelectComponent', () => {
  let component: EndpointSelectComponent;
  let fixture: ComponentFixture<EndpointSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
