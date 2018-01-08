import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInitComponent } from './app-init.component';
import {testImports, testProviders} from "../face-test/test.helper.spec";

describe('AppInitComponent', () => {
  let component: AppInitComponent;
  let fixture: ComponentFixture<AppInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInitComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
