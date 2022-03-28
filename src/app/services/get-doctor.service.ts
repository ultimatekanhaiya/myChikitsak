import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetDoctorService {
  constructor(private http: HttpClient) {}

  postDoctor(data: any) {
    return this.http.post<any>('http://localhost:8899/doctor/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getDoctor() {
    return this.http.get<any>('http://localhost:8899/doctor/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getDoctorById(id: number) {
    return this.http.get<any>('http://localhost:8899/doctor/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateDoctor(data: any) {
    return this.http.put<any>('http://localhost:8899/doctor/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteDoctor(id: number) {
    return this.http.delete<any>('http://localhost:8899/doctor/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
