import { Component, OnInit, NgZone } from '@angular/core';
import { Employee } from '../model/employeeDetails';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  employeeArr: Employee[] = [];
  employee: Employee;
  constructor(private router: Router, private service: LoginServiceService, private ref: ChangeDetectorRef, private zone: NgZone) {
    this.getEmployee();

  }

  ngOnInit() {
    window.location.hash = "no-back-buton";
    window.location.hash = "Again-No-back-buton";
    window.onhashchange = function () {
      window.location.hash = "no-back-buton";
    }

  }
  getEmployee() {

    this.service.getEmployee().subscribe(res => {

      this.employeeArr = res;
      JSON.stringify(this.employeeArr);

    });
  }

  deleteEmployee(id: number): void {
    this.service.deleteEmployee(id)
      .subscribe(data => {
        console.log(data);
        JSON.stringify(data);
        alert('Employee details deleted successfully.')
      },
        error => {
          console.log(error);
        },
        () => {
          console.log('get employee');
          this.getEmployee();
        });
  }

}
