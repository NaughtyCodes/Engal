import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndetailsComponent } from './indetails.component';

describe('IndetailsComponent', () => {
  let component: IndetailsComponent;
  let fixture: ComponentFixture<IndetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
