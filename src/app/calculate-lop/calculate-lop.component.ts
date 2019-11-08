import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { Employee } from '../model/employeeDetails';
import { LOP } from '../model/lop';
import { getLocalePluralCase } from '@angular/common';
import { MonthModel, MY_MONTHS } from '../model/month';
//[disabled]="!month.isActive"
@Component({
  selector: 'app-calculate-lop',
  templateUrl: './calculate-lop.component.html',
  styleUrls: ['./calculate-lop.component.css']
})
export class CalculateLopComponent implements OnInit {

  empid: number;
  showEmp = false;
  pl: number;
  leave: number;
  showLop = false;
  lop: LOP;
  year: number;
  leavesToCal: number;
  submitFlag = true;

  monthArr: MonthModel[] = MY_MONTHS;

  constructor(private router: Router, private service: LoginServiceService, private ref: ChangeDetectorRef) {
    this.lop = new LOP();
    this.lop.empFromLop = new Employee()
    this.lop.month = 0
    this.empid = JSON.parse(localStorage.getItem("LOPEMPID"));
    this.pl = 22;
    console.log(this.monthArr)
  }

  ngOnInit() {
    let no = new Date().getMonth();
    this.monthArr.forEach(element => {
      if (element.monthNumber >= no) {
        element.isActive = true
      }
    });
  }

  loadLop() {
    this.service.getLop(this.empid, this.lop.month).subscribe(res => {
      console.log("lop111 " + res);
      if (res != null) {
        this.lop = res;
        this.showLop = true;
        this.submitFlag = false;
      } else {
        this.lop.totalDays = 0;
        this.showLop = false;
        this.submitFlag = true;
      }
      console.log(this.lop);

    }, err => {
      console.log(err)
    }, () => {
      this.loadEmp();
    });
  }

  back() {
    this.router.navigate(['/lop']);
  }

  loadEmp() {
    this.showEmp = true;
    this.service.getEmployeeById(this.empid).subscribe(res => {
      this.lop.empFromLop = res as Employee;
    }, err => {
      console.log(err)
    }, () => {
      this.loadLeaveCount();
    });

  }

  loadLeaveCount() {
    this.service.loadleaveCount(this.empid, new Date().getFullYear()).subscribe(res => {
      console.log("lc " + res);
      this.leave = res as number;
    }, err => { console.log(err) 
    }, () => {
      this.calculate();
    });
  }

  calculate() {

    console.log("calculation start");
    if (this.leave > this.pl) {
      this.leavesToCal = this.leave - this.pl
      this.lop.totalDays = 22;
      this.lop.lop = Number((this.lop.empFromLop.salary - ((this.lop.empFromLop.salary / this.lop.totalDays)) * this.leavesToCal).toFixed());
      this.showLop = true;
    }
    // this.leave = this.leave - this.leavesToCal;
    // this.leavesToCal=0;
    // console.log("ltc " + leavesToCal);
    // if (this.leavesToCal > 0) {
    //   this.lop.lop = Number((this.lop.empFromLop.salary - ((this.lop.empFromLop.salary / this.lop.totalDays))*this.leavesToCal).toFixed());

    // } else {
    //   this.lop.lop = this.lop.empFromLop.salary;
    // }
    // this.showLop = true;
    // console.log(this.lop);
  }

  submit() {
    this.lop.year = (new Date()).getFullYear();
    this.service.submitLop(this.lop).subscribe(res => {
      console.log(res);
      this.router.navigate(['/lop']);
    });
  }

  update() {
    this.service.submitLop(this.lop).subscribe(res => {
      console.log(res);
      this.router.navigate(['/lop']);
    });
  }

  leaveCount(){
    this.service.leaveCount(this.leavesToCal).subscribe(res =>{
    });
  }
}
