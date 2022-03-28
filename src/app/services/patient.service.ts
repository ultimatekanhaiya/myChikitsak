import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  public postPatient(patient: any) {
    return this.http.post('http://localhost:8899/patient/', patient);
  }
  public getPatient() {
    return this.http.get<any>('http://localhost:8899/patient/');
  }
  public getPatientById(id: number) {
    return this.http.get<any>('http://localhost:8899/patient/' + id);
  }
}
