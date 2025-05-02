import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Help2Component } from './help2.component';

describe('Help2Component', () => {
  let component: Help2Component;
  let fixture: ComponentFixture<Help2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Help2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Help2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
