import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Achievements4Component } from './achievements4.component';

describe('Achievements4Component', () => {
  let component: Achievements4Component;
  let fixture: ComponentFixture<Achievements4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Achievements4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Achievements4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
