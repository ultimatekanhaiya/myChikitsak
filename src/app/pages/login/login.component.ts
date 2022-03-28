import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PatientService } from '../../services/patient.service';
import { GetDoctorService } from '../../services/get-doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData!: any;

  loginData = {
    username: '',
    password: '',
  };
  constructor(
    private snack: MatSnackBar,
    private userApi: UserService,
    private patientApi: PatientService,
    private doctorApi: GetDoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  formSubmit() {
    console.log(this.loginData);
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }
    this.getUserdata();
  }

  getUserdata() {
    this.userApi.getUserById(this.loginData.username).subscribe(
      async (data) => {
        console.log('userData ' + data);
        if (this.loginData.password != data.password) {
          this.snack.open('Username or Password is incorrect!! Try again', '', {
            duration: 3000,
          });
          return;
        }
        this.userData = data;
        console.log(this.userData);
        console.log(this.userData.role + ' role');
        console.log(this.userData.id + ' id');
        await localStorage.setItem('id', this.userData.id);

        //calling getRoleData to navigate to needed component
        await this.getRoleData(this.userData.role);
      },
      (err) => {
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }

  getRoleData(role: string) {
    if (role == 'patient') {
      this.patientApi.getPatientById(this.userData.id).subscribe(
        (res) => {
          console.log(res.id + ' resId');
          localStorage.setItem('name', res.name);
          localStorage.setItem('age', res.age);
          localStorage.setItem('gender', res.gender);
          localStorage.setItem('email', res.email);
          localStorage.setItem('phone', res.phone);
          localStorage.setItem('userType', 'patient');
        },
        (err) => {
          console.log(err);
          this.snack.open('Something went wrong !! Try again', '', {
            duration: 3000,
          });
        }
      );
      this.router.navigate(['/patient']);
    } else if (role == 'doctor') {
      this.doctorApi.getDoctorById(this.userData.id).subscribe(
        (res) => {
          console.log(res.id + ' resId');
          localStorage.setItem('name', res.name);
          localStorage.setItem('age', res.age);
          localStorage.setItem('gender', res.gender);
          localStorage.setItem('specialization', res.specialization);
          localStorage.setItem('userType', 'doctor');
        },

        (err) => {
          console.log(err);
          this.snack.open('Something went wrong !! Try again', '', {
            duration: 3000,
          });
        }
      );
      this.router.navigate(['/doctor']);
    } else if (this.userData.role == 'admin') {
      localStorage.setItem('userType', 'admin');
      this.router.navigate(['/admin']);
    } else {
      this.snack.open('Something went wrong !! Try again', '', {
        duration: 3000,
      });
    }
  }
}
