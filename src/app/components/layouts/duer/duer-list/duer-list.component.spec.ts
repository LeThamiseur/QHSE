import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuerListComponent } from './duer-list.component';

describe('DuerListComponent', () => {
  let component: DuerListComponent;
  let fixture: ComponentFixture<DuerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuerListComponent]
    });
    fixture = TestBed.createComponent(DuerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
