import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { Employee } from '../model/employeeDetails';

@Component({
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrls: ['./lop.component.css']
})
export class LopComponent implements OnInit {

  employeeArr: Employee[] = [];
  
  constructor(private router: Router, private service: LoginServiceService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadEmpData();
  }

  back(){
    this.router.navigate(['/admin']);
  }

  loadEmpData(){
    this.service.getEmployee().subscribe(res => {

      this.employeeArr = res;
      JSON.stringify(this.employeeArr);

    });
  }

  calculate(id: number){
    console.log("id "+ id);
    localStorage.setItem("LOPEMPID",JSON.stringify(id));
    this.router.navigate(['/calculate-lop']);
  }
}
