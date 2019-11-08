import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginServiceService } from "../login-service.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logincheck: Login[];
  login: Login;
  admincheck: Login;
  adminEmailId: any;
  password: any;

  constructor(private router: Router, private service: LoginServiceService) {
    this.login = new Login();
    this.adminEmailId = this.login.adminEmailId;
    this.password = this.login.password;
  }

  ngOnInit() {
  }
  getAdmin1() {

    this.service.getAdmin().subscribe(res => {

      this.logincheck = res;
      this.admincheck = this.logincheck[0]
      console.log(this.login.adminEmailId)
      console.log(this.login.password)
      console.log(this.admincheck.adminEmailId)
      console.log(this.admincheck.password)

      if (this.login.adminEmailId === this.admincheck.adminEmailId && this.login.password === this.admincheck.password) {
        console.log(this.login.adminEmailId)
        console.log(this.login.password)
        console.log(this.admincheck.adminEmailId)
        console.log(this.admincheck.password)
        this.router.navigate(['/admin']);
      }
      else {
        console.log('else loop')
        alert("Invalid details")

      }
    })



  }
  getAdmin(){
    this.service.getAdmin().subscribe(res => {
      this.logincheck = res;
      var loginSuccesful = false;
      this.logincheck.forEach(element => {
        var admin = element;
        if(admin.adminEmailId===this.login.adminEmailId && admin.password===this.login.password){
          loginSuccesful = true;
        } 
      });
      
      if(loginSuccesful){
        alert("Login successful");
        this.router.navigate(['/admin']);
      }else{
        alert("Invalid details");
      }
    })



  }
    
}
