import { ComponentFixture, TestBed } from '@angular/core/testing';

import { stoxpoHomeComponent } from './stoxpo-home.component';

describe('stoxpoHomeComponent', () => {
  let component: stoxpoHomeComponent;
  let fixture: ComponentFixture<stoxpoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ stoxpoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(stoxpoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
