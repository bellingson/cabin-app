import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLinksComponent } from './admin-links.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('AdminLinksComponent', () => {
  let component: AdminLinksComponent;
  let fixture: ComponentFixture<AdminLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLinksComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
