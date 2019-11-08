import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employeeDetails';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Attendance } from '../model/attendance';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  date;
  employeeArr: Employee[] = [];
  employee: Employee;
  showEmps: boolean;
  attendance = new Map<number, boolean>();
  leave = new Map<number, boolean>();
  doAttendance: Attendance[] = [];

  submitFlag = true;
  constructor(private router: Router, private service: LoginServiceService, private ref: ChangeDetectorRef) {
    this.getEmployee();
    this.setAttendanceFlag();
  }
  ngOnInit() {
    this.showEmps = false;
  }
  getEmployee() {

    this.service.getEmployee().subscribe(res => {

      this.employeeArr = res;
      JSON.stringify(this.employeeArr);

    });
  }

  loadEmps() {
    console.log(this.date);
    this.setAttendanceFlag();
    this.loadAttendance(this.date);
  }

  back(){
    this.router.navigate(['/admin']);
  }

  loadAttendance(date: String) {
    this.service.getAttendance(date).subscribe(res => {
      this.setDoAttendance(res);
      console.log(res);
    });
  }

  setDoAttendance(atds: Attendance[]) {
    this.doAttendance = atds;
    this.loadEmpForAtd(this.doAttendance);
  }

  loadEmpForAtd(atds: Attendance[]) {
    for (let atd of atds) {
      this.service.getEmpByAtd(atd.id).subscribe(res => {
        this.setEmptoAttendance(atd, res);
        console.log(res);
      });
    }
  }

  setEmptoAttendance(atd: Attendance, emp: Employee) {
    console.log("Attendance: " + atd);
    let attendance = this.doAttendance.find((item) => item.id == atd.id);
    const index = this.doAttendance.findIndex((item) => item.id == atd.id);
    this.doAttendance.splice(index, 1);
    attendance.emp = emp;
    this.doAttendance.push(attendance);
    this.attendance.set(emp.id, atd.present.match("YES") ? true : false);
    if (atd.present.match("YES")) {
      this.attendance.set(emp.id, true);
    } else if (atd.present.match("NO")) {
      this.attendance.set(emp.id, false);
    } else {
      this.attendance.set(emp.id, false);
      this.leave.set(emp.id, true);
    }
    this.submitFlag = false;
  }
  setAttendanceFlag() {
    for (let e of this.employeeArr) {
      this.attendance.set(e.id, false);
      this.leave.set(e.id, false);
    }
    this.showEmps = true;
    this.submitFlag = true;
  }
  submit() {
    console.log(this.attendance);
    for (let e of this.employeeArr) {
      let attendance = new Attendance;
      attendance.date = this.date;
      attendance.present = this.attendance.get(e.id) ? "YES" : "NO";
      attendance.emp = e;
      this.service.doAttendance(attendance).subscribe(res => {
        let temp = res as Attendance;
        temp.emp = e;
        this.pushToAttenance(temp);
        console.log(res);
      });
    }
    console.log(this.doAttendance);
    this.submitFlag = false;
  }

  pushToAttenance(atd: Attendance) {
    this.doAttendance.push(atd);
  }
  toggleFlag(id: number) {
    let flag = this.attendance.get(id);
    this.attendance.set(id, !flag);
  }
  update() {
    console.log("update");
    for (let atd of this.doAttendance) {
      if (!this.leave.get(atd.emp.id)) {
        atd.date = this.date;
        atd.present = this.attendance.get(atd.emp.id) ? "YES" : "NO";
        this.service.doAttendance(atd).subscribe(res => {
          console.log(res);
        });
      }
    }
  }

  reload() {
    window.location.reload();
  }
}
