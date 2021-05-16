import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudstoxpoComponent } from './crud-stoxpo.component';

describe('CrudstoxpoComponent', () => {
  let component: CrudstoxpoComponent;
  let fixture: ComponentFixture<CrudstoxpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudstoxpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudstoxpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
