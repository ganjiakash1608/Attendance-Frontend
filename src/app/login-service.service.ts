import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './model/login';
import { Employee } from './model/employeeDetails';
import { Attendance } from './model/attendance';
import { LOP } from './model/lop';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  baseUrl = "http://localhost:8888";
  constructor(private http: HttpClient) { }

  getAdmin(): Observable<Login[]> {

    return this.http.get<Login[]>(this.baseUrl + '/getAdmin');
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + '/getEmployee');
  }
  addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.baseUrl + '/addEmployee', employee);
  }
  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateEmployee/${id}`, employee);
  }

  getEmployeeById(paramIndex: number) {
    return this.http.get(`${this.baseUrl}/getEmployeeById/${paramIndex}`);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/deleteEmployee/${id}`, { responseType: 'text' });
  }

  doAttendance(attendance: Attendance) {
    return this.http.post(this.baseUrl + '/doAttendance', attendance);
  }

  getAttendance(date: String): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/getAttendance/${date}`);
  }

  getEmpByAtd(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/getEmpByAtd/${id}`);
  }

  getAtdForEmp(date: String, id: number): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.baseUrl}/getMappingForEmp/${id}/${date}`);
  }

  applyLeave(fromDate: String, toDate: String, id: number) {
    return this.http.get(`${this.baseUrl}/applyLeave/${id}/${fromDate}/${toDate}`);
  }

  checkLeave(fromDate: String, toDate: String, id: number) {
    return this.http.get<Boolean>(`${this.baseUrl}/checkLeave/${id}/${fromDate}/${toDate}`);
  }

  loadleaveCount(id: number, year: number) {
    return this.http.get<number>(`${this.baseUrl}/checkLeaveOfYear/${id}/${year}`);
  }

  submitLop(lop: LOP) {
    return this.http.post(this.baseUrl + '/submitLop', lop);
  }

  getLop(id: number,month:number) :Observable<LOP>{
    return this.http.get<LOP>(`${this.baseUrl}/getLop/${id}/${month}`);
  }

  leaveCount(leaveCount: number){
    return this.http.get(`${this.baseUrl}/getLop/${leaveCount}`);
  }
    
}
