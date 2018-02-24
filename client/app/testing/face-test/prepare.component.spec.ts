import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PrepareComponent } from './prepare.component';
import {testImports, testProviders} from "./test.helper.spec";
import {Router} from "@angular/router";
import {RouterMock} from "./router.mock";

describe('PrepareComponent', () => {
  let component: PrepareComponent;
  let fixture: ComponentFixture<PrepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareComponent ],
      imports: testImports,
      providers: testProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareComponent);
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

  it('start', inject([Router],(router: RouterMock) => {

    component.ngOnInit();
    component.start();

    expect(router.called).toBe(true);

  }));



});
