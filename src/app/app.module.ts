import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminStaffComponent } from './admin-staff/admin-staff.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LopComponent } from './lop/lop.component';
import { CalculateLopComponent } from './calculate-lop/calculate-lop.component';
import { ShowLopComponent } from './show-lop/show-lop.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AdminStaffComponent,
    EmployeeComponent,
    LoginComponent,
    EmployeedetailsComponent,
    EmployeeLoginComponent,
    AttendanceComponent,
    ViewAttendanceComponent,
    ApplyLeaveComponent,
    LopComponent,
    CalculateLopComponent,
    ShowLopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
