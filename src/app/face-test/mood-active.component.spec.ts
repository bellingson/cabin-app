import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodActiveComponent } from './mood-active.component';
import {MoodButtonsComponent} from "./mood-buttons.component";
import {testImports, testProviders} from "./test.helper.spec";


describe('MoodActiveComponent', () => {
  let component: MoodActiveComponent;
  let fixture: ComponentFixture<MoodActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodActiveComponent, MoodButtonsComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
