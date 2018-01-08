import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreTestComponent } from './pre-test.component';
import {testImports, testProviders} from "../face-test/test.helper.spec";

describe('PreTestComponent', () => {
  let component: PreTestComponent;
  let fixture: ComponentFixture<PreTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreTestComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
