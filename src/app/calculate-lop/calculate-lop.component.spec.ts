import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateLopComponent } from './calculate-lop.component';

describe('CalculateLopComponent', () => {
  let component: CalculateLopComponent;
  let fixture: ComponentFixture<CalculateLopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateLopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
