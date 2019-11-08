import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { AdminStaffComponent } from './admin-staff/admin-staff.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LopComponent } from './lop/lop.component';
import { CalculateLopComponent } from './calculate-lop/calculate-lop.component';
import { ShowLopComponent } from './show-lop/show-lop.component';
const routes: Routes = [
    { path:'', redirectTo: '/home', pathMatch: 'full' },
    { path: "home", component: HomeComponent, pathMatch:'full' },
    { path: "login", component: LoginComponent, pathMatch:'full' },
    {path: "admin", component: AdminComponent, pathMatch: 'full'},
    {path: "employeedetails", component: EmployeedetailsComponent, pathMatch: 'full'},
    {path: "employee", component: EmployeeComponent, pathMatch: 'full'},
    {path: "employee-login", component: EmployeeLoginComponent, pathMatch: 'full'},
    {path: "attendance", component: AttendanceComponent, pathMatch: 'full'},
    {path: "view-attendance", component: ViewAttendanceComponent, pathMatch: 'full'},
    {path: "applyLeave", component: ApplyLeaveComponent, pathMatch: 'full'},
    {path: "lop", component: LopComponent, pathMatch: 'full'},
    {path: "calculate-lop", component: CalculateLopComponent, pathMatch: 'full'},
    {path: "show-lop", component: ShowLopComponent, pathMatch: 'full'}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }