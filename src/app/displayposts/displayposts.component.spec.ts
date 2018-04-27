import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaypostsComponent } from './displayposts.component';

describe('DisplaypostsComponent', () => {
  let component: DisplaypostsComponent;
  let fixture: ComponentFixture<DisplaypostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaypostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaypostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
