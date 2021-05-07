import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TengalHomeComponent } from './tengal-home.component';

describe('TengalHomeComponent', () => {
  let component: TengalHomeComponent;
  let fixture: ComponentFixture<TengalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TengalHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TengalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
