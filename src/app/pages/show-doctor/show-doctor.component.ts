import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetDoctorService } from '../../services/get-doctor.service';

export interface PeriodicElement {
  id: number;
  name: string;
  age: number;
  gender: string;
  specialization: string;
}

@Component({
  selector: 'app-show-doctor',
  templateUrl: './show-doctor.component.html',
  styleUrls: ['./show-doctor.component.css'],
})
export class ShowDoctorComponent implements OnInit {
  doctorData: any = [];

  constructor(private doctorApi: GetDoctorService) {}

  ngOnInit(): void {
    this.getAllDoctor();
    console.log(this.doctorData);
  }

  getAllDoctor() {
    this.doctorApi.getDoctor().subscribe((res) => {
      this.doctorData = res;
      this.prepareData();
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'gender',
    'specialization',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  prepareData() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.doctorData);
  }
}
