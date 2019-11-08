import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { Attendance } from '../model/attendance';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  date: any;
  empId: number;
  attendance: Attendance;
  showAtd = false;
  constructor(private router: Router, private service: LoginServiceService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.empId = JSON.parse(localStorage.getItem("CEMPID"));
    this.attendance = new Attendance;
  }

  getAttendance() {
    console.log("empID :" + this.empId);
    this.service.getAtdForEmp(this.date, this.empId).subscribe(res => {
      if (res == null) {
        res = new Attendance;
        res.present = "Not Available";
      }
      this.setAttendance(res);
      console.log(res);
    }
    );
    this.showAtd = true;
  }

  setAttendance(atd: Attendance) {
    console.log(atd);
    this.attendance = atd;
    if (this.attendance.present.match("YES")) {
      this.attendance.present = "PRESENT";
    } else if (this.attendance.present.match("NO")) {
      this.attendance.present = "ABSENT";
    }
  }

  back(){
    this.router.navigate(['/employee']);
  }
}
