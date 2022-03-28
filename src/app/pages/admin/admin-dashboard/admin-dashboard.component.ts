import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor';
import { GetDoctorService } from 'src/app/services/get-doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  //adding reactive form and class
  formValue!: FormGroup;
  doctorObj: Doctor = new Doctor();
  doctorData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private doctorApi: GetDoctorService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [''],
      name: [''],
      age: [''],
      gender: [''],
      specialization: [''],
    });
    this.getAllDoctor();
  }

  clickAddDoctor() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  //add doctor
  postDoctorDetails() {
    this.doctorObj.id = this.formValue.value.id;
    this.doctorObj.name = this.formValue.value.name;
    this.doctorObj.age = this.formValue.value.age;
    this.doctorObj.gender = this.formValue.value.gender;
    this.doctorObj.specialization = this.formValue.value.specialization;

    this.doctorApi.postDoctor(this.doctorObj).subscribe(
      (res) => {
        console.log(res);
        this.snack.open('data added successfully !! ', '', {
          duration: 3000,
        });
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllDoctor();
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

  // show all doctors
  getAllDoctor() {
    this.doctorApi.getDoctor().subscribe((res) => {
      this.doctorData = res;
    });
  }

  //delete doctor
  deleteDoctor(item: any) {
    this.doctorApi.deleteDoctor(item.id).subscribe((res) => {
      this.snack.open('doctor data delete !!', '', {
        duration: 3000,
      });
      this.getAllDoctor();
    });
  }

  //edit doctor doctor
  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.doctorObj.id = item.id;
    this.formValue.controls['id'].setValue(item.id);
    this.formValue.controls['name'].setValue(item.name);
    this.formValue.controls['age'].setValue(item.age);
    this.formValue.controls['gender'].setValue(item.gender);
    this.formValue.controls['specialization'].setValue(item.specialization);
  }

  updateDoctorDetails() {
    this.doctorObj.id = this.formValue.value.id;
    this.doctorObj.name = this.formValue.value.name;
    this.doctorObj.age = this.formValue.value.age;
    this.doctorObj.gender = this.formValue.value.gender;
    this.doctorObj.specialization = this.formValue.value.specialization;

    this.doctorApi.updateDoctor(this.doctorObj).subscribe((res) => {
      this.snack.open('doctor data updated !!', '', {
        duration: 3000,
      });
      this.getAllDoctor();
    });
  }
}
