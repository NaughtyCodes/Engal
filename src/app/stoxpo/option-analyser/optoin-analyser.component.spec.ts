import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionAnalyserComponent } from './optoin-analyser.component';

describe('OptionAnalyserComponent', () => {
  let component: OptionAnalyserComponent;
  let fixture: ComponentFixture<OptionAnalyserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionAnalyserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
