import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { Attendance } from '../model/attendance';
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  fromDate;
  toDate;
  empId: number;
  empId1: number;
  success = false;
  invalid = false;
  constructor(private router: Router, private service: LoginServiceService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.empId = JSON.parse(localStorage.getItem("CEMPID"));
  }

  apply() {
    console.log(this.fromDate + " " + this.toDate);
    this.service.checkLeave(this.fromDate, this.toDate, this.empId).subscribe(res => {
      console.log(res);
      if (!res as Boolean) {
        this.setSuccess();
        this.service.applyLeave(this.fromDate, this.toDate, this.empId).subscribe(result => {
          console.log(result.toString);
          console.log(this.empId1.toString);
        });
      } else {
        this.setInvalid();
      }
    });
  }
  setSuccess() {
    this.success = true;
    this.invalid = false;
    console.log(this.success);
  }

  setInvalid() {
    this.invalid = true;
    this.success = false;
  }

  back() {
    this.router.navigate(['/employee']);
  }
}
