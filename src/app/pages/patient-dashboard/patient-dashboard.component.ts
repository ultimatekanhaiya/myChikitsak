import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'src/app/services/appointment.service';
import { GetDoctorService } from 'src/app/services/get-doctor.service';
import { AppointmentModel } from 'src/app/models/AppointmentModal';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AppointmentElement {
  id: number;
  date: string;
  problem: string;
  patientId: number;
  doctorId: number;
  status: string;
  prescription: string;
}

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
})
export class PatientDashboardComponent implements OnInit {
  appointmentModelObj: AppointmentModel = new AppointmentModel();
  formValue!: FormGroup;
  doctorData!: any;
  doctorId: any;
  doctorName: any;
  appointmentData: any = [];

  public patient = {
    name: localStorage.getItem('name'),
    age: localStorage.getItem('age'),
    gender: localStorage.getItem('gender'),
    phone: localStorage.getItem('phone'),
    email: localStorage.getItem('email'),
  };
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentApi: AppointmentService,
    private doctorApi: GetDoctorService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.doctorApi.getDoctor().subscribe((data) => {
      this.doctorData = data;
    });

    this.formValue = this.formbuilder.group({
      date: [''],
      problem: [''],
      doctorNameId: [''],
    });
    this.getAllAppointment();
  }

  getAllAppointment() {
    this.appointmentApi
      .getAppointmentByPatientId(Number(localStorage.getItem('id')))
      .subscribe((res) => {
        console.log(res);
        this.appointmentData = res;

        this.getDoctorName(this.doctorId);

        //this.doctorId = res[0].doctorId;
        this.prepareData();
        //this.getDoctorName(this.doctorId);
      });
  }

  getDoctorName(id: number) {
    this.doctorApi.getDoctorById(id).subscribe((res) => {
      console.log(res);
      this.doctorName = res.name;
    });
  }

  displayedColumns: string[] = [
    'id',
    'dateOfVisit',
    'problem',
    'doctor',
    'status',
    'prescription',
  ];
  dataSource = new MatTableDataSource<AppointmentElement>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  prepareData() {
    this.dataSource = new MatTableDataSource<AppointmentElement>(
      this.appointmentData
    );
  }

  postAppointmentDetails() {
    this.appointmentModelObj.date = this.formValue.value.date;
    this.appointmentModelObj.problem = this.formValue.value.problem;
    this.appointmentModelObj.patientId = Number(localStorage.getItem('id'));
    this.appointmentModelObj.doctorId = this.formValue.value.doctorNameId;
    this.appointmentModelObj.status = 'notVisited';

    this.appointmentApi.postAppointment(this.appointmentModelObj).subscribe(
      (res) => {
        console.log(res);
        this.snack.open('Appointment Booked successfully !! ', '', {
          duration: 3000,
        });
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.prepareData();
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

  //accessing data sended using router parameters
  // getRoutedData() {
  //   this.route.queryParams.subscribe((params) => {
  //     console.log(params);
  //     this.patient = JSON.parse(params['data']);
  //   });
  // }
}
