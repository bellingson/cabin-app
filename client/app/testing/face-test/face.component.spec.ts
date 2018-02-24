import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceComponent } from './face.component';

describe('FaceComponent', () => {
  let component: FaceComponent;
  let fixture: ComponentFixture<FaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('click', () => {

    component.ngOnInit();

    let clicked = false;

    component.clicked.subscribe(() => {
       clicked = true;
    });

    component.click();

    expect(clicked).toBe(true);
  });






});
