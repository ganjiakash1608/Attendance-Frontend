import { LoginServiceService } from '../login-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../model/employeeDetails';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  @Input('contact') contactval;
  employeeDetailsArr: Employee[] = [];
  employeeArr: Employee[] = [];
  allEmailId: [];
  trial: any;
  emailCheck: boolean = false;
  employee: any;
  paramIndex: any;
  constructor(private service: LoginServiceService, private router: Router, private route: ActivatedRoute) 
  { 
     this.employee = new Employee();
     this.prefill();
  }

  ngOnInit() {
  }
  addEmployee() {
    this.service.addEmployee(this.employee).subscribe(
      data => {
        console.log(data);
        alert('Employee added successfully.')

      },
      error => {
          console.log(error);
      },
      () => { // when complete
        this.router.navigate(['/admin']);
      });
  }

  updateEmployee() {
    this.service.updateEmployee(this.employee.id,this.employee).subscribe(
      data => {
        console.log(data);
        alert('Employee details saved successfully.')
      },
      error => {
          console.log(error);
      },
      () => { // when complete
        this.router.navigate(['/admin']);
      });
      
  }

  

  getEmployee() {
    this.service.getEmployee().subscribe(res=>{
      this.employeeArr=res;
      if(this.employeeArr.length===0) {
        this.addEmployee();
      }
    for (const u of this.employeeArr) {
    
      if (this.employee.employeeEmailId === u.employeeEmailId ) {
        this.emailCheck = false;
       alert('employee already exists');
       break;
      }
      else {
        this.emailCheck = true;
        console.log('employee new');
      }
    }

    if (this.emailCheck) {
      console.log('status' + this.emailCheck);
      this.addEmployee();
    }
  
  });
}
  

 
prefill() {
  if (window.location.search !== '') {
    this.route.queryParams.pipe(
    filter(params => params.id))
    .subscribe(params => {
    console.log(params.id);
    this.paramIndex = params.id;
    this.service.getEmployeeById(this.paramIndex).subscribe(res=>{
      this.employee=res;
     
  });
  });
 

}
}

  validateAction() {
    if (window.location.search !== '') {
      this.route.queryParams.pipe()
        .subscribe(params => {
          console.log('update');
          this.updateEmployee();
      });
    } else {
      console.log('add');
        this.getEmployee();
    }
  }
}
