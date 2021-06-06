import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee = {} as Employee;
  employees: Employee[];
  readonly baseURL = 'http://localhost:3000/employees';


  constructor(private http: HttpClient) { }

  postEmployee(form: Employee) {
    console.log(form);
    return this.http.post(this.baseURL,form);
  }

  getEmployee(){
    return this.http.get(this.baseURL)
  }

  putEmployee(emp : Employee){
    console.log(emp);
    return this.http.put(this.baseURL + `/${emp._id}` , emp);
  }

  deleteEmployee(_id : String){
    return this.http.delete(this.baseURL + `/${_id}`)
  }

}
 