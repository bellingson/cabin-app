import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsModule } from 'ng2-charts';

import { ChartComponent } from './chart.component';
import {testImports, testProviders} from "../face-test/test.helper.spec";

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [testImports, ChartsModule],
      providers: testProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
