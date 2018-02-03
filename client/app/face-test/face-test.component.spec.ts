import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceTestComponent } from './face-test.component';
import {testImports, testProviders} from "./test.helper.spec";
import {FaceComponent} from "./face.component";
import {PortraitMessageComponent} from "./portrait-message.component";
import {testUser} from "../user/user.service.mock";

fdescribe('FaceTestComponent', () => {
  let component: FaceTestComponent;
  let fixture: ComponentFixture<FaceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceTestComponent, FaceComponent, PortraitMessageComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceTestComponent);
    component = fixture.componentInstance;

    component.user = testUser;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
