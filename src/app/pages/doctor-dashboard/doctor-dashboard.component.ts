import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentModel } from 'src/app/models/AppointmentModal';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
})
export class DoctorDashboardComponent implements OnInit {
  formValue!: FormGroup;
  appointmentData!: any;
  appointmentObj: AppointmentModel = new AppointmentModel();

  //getting doctor data using localStorage
  public doctor = {
    name: localStorage.getItem('name'),
    age: localStorage.getItem('age'),
    gender: localStorage.getItem('gender'),
    specialization: localStorage.getItem('specialization'),
  };

  constructor(
    private formbuilder: FormBuilder,
    private appointmentApi: AppointmentService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    //binding form data
    this.formValue = this.formbuilder.group({
      id: [''],
      name: [''],
      age: [''],
      gender: [''],
      specialization: [''],
      prescription: ['', Validators.required],
    });

    this.getAllAppointment();
  }

  setAppointId(item: any) {
    this.appointmentObj.id = item.id;
    this.appointmentObj.patientId = item.patientId;
    this.appointmentObj.problem = item.problem;
    this.appointmentObj.date = item.date;
    this.appointmentObj.doctorId = Number(localStorage.getItem('id'));
  }

  getAllAppointment() {
    this.appointmentApi
      .getAppointmentByDoctorId(Number(localStorage.getItem('id')))
      .subscribe((res) => {
        console.log(res);
        this.appointmentData = res;
      });
  }

  addPrescription() {
    this.appointmentObj.status = 'visited';
    this.appointmentObj.prescription = this.formValue.value.prescription;

    this.appointmentApi.updateAppointment(this.appointmentObj).subscribe(
      (res) => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.snack.open('Prescription Added successfully !! ', '', {
          duration: 3000,
        });
        this.getAllAppointment();
      },

      (err) => {
        console.log(err);
        this.snack.open('something went wrong !! ', '', {
          duration: 3000,
        });
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      }
    );
  }

  clickAddDoctor() {}

  //   this.doctorApi
  //     .updateDoctor(this.appointmentObj, this.appointmentObj.id)
  //     .subscribe((res) => {
  //       this.snack.open('prescription added successfully !!', '', {
  //         duration: 3000,
  //       });
  //     });
  // }
}
