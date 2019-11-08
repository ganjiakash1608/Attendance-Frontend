import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLopComponent } from './show-lop.component';

describe('ShowLopComponent', () => {
  let component: ShowLopComponent;
  let fixture: ComponentFixture<ShowLopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
