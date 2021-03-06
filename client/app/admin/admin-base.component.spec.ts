import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBaseComponent } from './admin-base.component';
import {testImports, testProviders} from "./test-admin.helper.spec";


describe('AdminBaseComponent', () => {
  let component: AdminBaseComponent;
  let fixture: ComponentFixture<AdminBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBaseComponent ],
      imports: testImports,
      providers: testProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
