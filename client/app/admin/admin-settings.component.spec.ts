import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingsComponent } from './admin-settings.component';
import {testImports, testProviders} from "./test-admin.helper.spec";
import {AdminLinksComponent} from "./admin-links.component";

describe('AdminSettingsComponent', () => {

  let component: AdminSettingsComponent;
  let fixture: ComponentFixture<AdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSettingsComponent, AdminLinksComponent ],
      imports: testImports,
      providers: testProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {

      fixture = TestBed.createComponent(AdminSettingsComponent);
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


});
