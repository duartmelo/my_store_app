import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactUsComponent } from './modal-contact-us.component';

describe('ModalContactUsComponent', () => {
  let component: ModalContactUsComponent;
  let fixture: ComponentFixture<ModalContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContactUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
