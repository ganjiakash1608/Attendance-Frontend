export class Employee {
  filter(arg0: (e: any) => boolean): Employee {
    throw new Error("Method not implemented.");
  }
    id: number;
    firstName: string;
    lastName: string;
    employeeEmailId: string;
    employeeContact: string;
    employeeDesignation: string;
    employeeDOB:string;
    employeeGender: string;
    employeePassword: string;
    salary : number;
}