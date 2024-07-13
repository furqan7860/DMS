import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';
import { Observable } from 'rxjs';

@Injectable()
export class PatientService {
  private baseUrl = 'http://localhost:3000';
  private patientsEndpoint = `${this.baseUrl}/patients`;

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.patientsEndpoint);
  }

  addPatient(patient:any): Observable<any> {
    return this.http.post<any>(this.patientsEndpoint, patient);
  }
}
