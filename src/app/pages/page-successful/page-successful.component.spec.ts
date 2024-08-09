import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSuccessfulComponent } from './page-successful.component';

describe('PageSuccessfulComponent', () => {
  let component: PageSuccessfulComponent;
  let fixture: ComponentFixture<PageSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
