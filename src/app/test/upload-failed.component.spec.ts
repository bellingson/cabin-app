import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFailedComponent } from './upload-failed.component';

describe('UploadFailedComponent', () => {
  let component: UploadFailedComponent;
  let fixture: ComponentFixture<UploadFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
