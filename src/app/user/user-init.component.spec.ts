import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInitComponent } from './user-init.component';
import {testImports, testProviders} from "../face-test/test.helper.spec";

describe('UserInitComponent', () => {
  let component: UserInitComponent;
  let fixture: ComponentFixture<UserInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInitComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
