import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Achievements3Component } from './achievements3.component';

describe('Achievements3Component', () => {
  let component: Achievements3Component;
  let fixture: ComponentFixture<Achievements3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Achievements3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Achievements3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
