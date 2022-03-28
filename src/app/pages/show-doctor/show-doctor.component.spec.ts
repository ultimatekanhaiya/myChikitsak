import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDoctorComponent } from './show-doctor.component';

describe('ShowDoctorComponent', () => {
  let component: ShowDoctorComponent;
  let fixture: ComponentFixture<ShowDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
