import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryYourBestComponent } from './try-your-best.component';

describe('TryYourBestComponent', () => {
  let component: TryYourBestComponent;
  let fixture: ComponentFixture<TryYourBestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryYourBestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryYourBestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
