import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { FocusComponent } from './focus.component';
import {testImports, testProviders} from "./test.helper.spec";

import {Router} from "@angular/router";
import {RouterMock} from "./router.mock";

describe('FocusComponent', () => {

  let component: FocusComponent;
  let fixture: ComponentFixture<FocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusComponent);
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

  it('next', inject([Router],(router: RouterMock) => {

    component.next();

    expect(router.called).toBe(true);

  }));


});
