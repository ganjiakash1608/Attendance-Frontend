import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginServiceService } from "../login-service.service";
import { Employee } from '../model/employeeDetails';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  logincheck: Employee[];
  login: Employee;
  employeecheck: Employee;
  employeeEmailId: any;
  employeePassword: any;
  employee: Employee;

  constructor(private router: Router, private service: LoginServiceService) {
    this.login = new Employee();
    this.employeeEmailId = this.login.employeeEmailId;
    this.employeePassword = this.login.employeePassword;
  }

  ngOnInit() {
  }
  getEmployee() {

    this.service.getEmployee().subscribe(res => {
      this.logincheck = res;
      var loginSuccesful = false;
      this.logincheck.forEach(element => {
        if (element.employeeEmailId === this.login.employeeEmailId && element.employeePassword === this.login.employeePassword) {
          loginSuccesful = true;
          this.employee = element;
        }
      });

      if (loginSuccesful) {
        alert("Login successful");
        console.log("Current User :" + this.employee);
        localStorage.setItem("CEMPID", JSON.stringify(this.employee.id));
        this.router.navigate(['/employee']);
      } else {
        alert("Invalid details");
      }
    })



  }
}
