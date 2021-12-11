import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScanQrCodeComponent } from './scan-qrcode.component';

describe('ScanComponent', () => {
  let component: ScanQrCodeComponent;
  let fixture: ComponentFixture<ScanQrCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScanQrCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
