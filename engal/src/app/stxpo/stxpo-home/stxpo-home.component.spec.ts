import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxpoHomeComponent } from './stxpo-home.component';

describe('StxpoHomeComponent', () => {
  let component: StxpoHomeComponent;
  let fixture: ComponentFixture<StxpoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StxpoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StxpoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
