import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { LOP } from '../model/lop';

@Component({
  selector: 'app-show-lop',
  templateUrl: './show-lop.component.html',
  styleUrls: ['./show-lop.component.css']
})
export class ShowLopComponent implements OnInit {

  month: number;
  showLop = false;
  empId: number;
  lop: LOP;
  salary : any;
  constructor(private router: Router, private service: LoginServiceService, private ref: ChangeDetectorRef) {
    this.lop = new LOP();
  }

  ngOnInit() {
    this.empId = JSON.parse(localStorage.getItem("CEMPID"));
  }

  getLop() {
    this.showLop = true;
    this.service.getLop(this.empId, this.month).subscribe(res => {
      console.log("loppp " + res);
      if (res != null) {
        this.lop = res;
        this.salary = this.lop.lop;       
      }else{
        this.salary = "Not Available";
      }
    });
  }
}
