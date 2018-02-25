import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import {testImports, testProviders} from "./testing/face-test/test.helper.spec";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: testImports,
      providers: testProviders
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
