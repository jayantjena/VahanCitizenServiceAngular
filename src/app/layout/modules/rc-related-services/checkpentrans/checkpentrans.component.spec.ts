import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpentransComponent } from './checkpentrans.component';

describe('CheckpentransComponent', () => {
  let component: CheckpentransComponent;
  let fixture: ComponentFixture<CheckpentransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckpentransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpentransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
