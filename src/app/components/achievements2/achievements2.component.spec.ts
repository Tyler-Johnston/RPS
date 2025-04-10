import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Achievements2Component } from './achievements2.component';

describe('Achievements2Component', () => {
  let component: Achievements2Component;
  let fixture: ComponentFixture<Achievements2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Achievements2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Achievements2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
