import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  public postAppointment(user: any) {
    return this.http.post('http://localhost:8899/appointTest/', user);
  }

  public getAppointmentByPatientId(id: number) {
    return this.http.get<any>(
      'http://localhost:8899/appointTest/patient/' + id
    );
  }

  public getAppointmentByDoctorId(id: number) {
    return this.http.get<any>('http://localhost:8899/appointTest/doctor/' + id);
  }

  updateAppointment(data: any) {
    return this.http.put<any>('http://localhost:8899/appointTest/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteAppointment(id: number) {
    return this.http.delete<any>('http://localhost:8899/appointTest/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
