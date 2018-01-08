import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitMessageComponent } from './portrait-message.component';

describe('PortraitMessageComponent', () => {
  let component: PortraitMessageComponent;
  let fixture: ComponentFixture<PortraitMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortraitMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
