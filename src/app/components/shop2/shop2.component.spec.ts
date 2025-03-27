import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shop2Component } from './shop2.component';

describe('Shop2Component', () => {
  let component: Shop2Component;
  let fixture: ComponentFixture<Shop2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
