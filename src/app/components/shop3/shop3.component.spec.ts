import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop3Component } from './shop3.component';

describe('Shop3Component', () => {
  let component: Shop3Component;
  let fixture: ComponentFixture<Shop3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shop3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
