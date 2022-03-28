import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetDoctorService } from '../../services/get-doctor.service';
import { PatientService } from '../../services/patient.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signup!: FormGroup;
  doctorData!: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private doctorApi: GetDoctorService,
    private patientApi: PatientService,
    private userApi: UserService,
    private snack: MatSnackBar
  ) {}

  //generating 5 digit random id
  idGenerator() {
    var minm = 10000;
    var maxm = 99999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }

  newId: number = this.idGenerator();

  //patient data
  public patient = {
    id: this.newId,
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
  };

  //user data
  public user = {
    username: '',
    password: '',
    id: this.newId,
    role: 'patient',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.patient);
    console.log(this.user);
    this.addPatientData();
  }

  addPatientData() {
    let flag: boolean = false;

    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    this.patientApi.postPatient(this.patient).subscribe(
      (res) => {
        console.log(res);
        flag = true;
        this.snack.open('patient registered successfully !! ', '', {
          duration: 3000,
        });
        if (flag) {
          this.addUserData();
        }
      },

      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }

  addUserData() {
    this.userApi.postUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.routeData();
      },

      (err) => {
        console.log('Error !');
        console.log(err);
      }
    );
  }

  id1: any = this.patient.id;
  //age1: any = this.patient.age;
  routeData() {
    localStorage.setItem('id', this.id1);
    localStorage.setItem('name', this.patient.name);
    localStorage.setItem('age', this.patient.age);
    localStorage.setItem('gender', this.patient.gender);
    localStorage.setItem('phone', this.patient.phone);
    localStorage.setItem('email', this.patient.email);
    localStorage.setItem('userType', 'patient');
    //window.location.reload();
    this.router.navigate(['/patient']);
  }
  //sending data to a route using router when a use submit form
  // routeData() {
  //   this.router.navigate(['/patient'], {
  //     queryParams: {
  //       data: JSON.stringify(this.patient),
  //     },
  //   });
  // }
}
