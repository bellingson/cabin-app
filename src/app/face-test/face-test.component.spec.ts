import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceTestComponent } from './face-test.component';
import {testImports, testProviders} from "./test.helper.spec";

describe('FaceTestComponent', () => {
  let component: FaceTestComponent;
  let fixture: ComponentFixture<FaceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceTestComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
