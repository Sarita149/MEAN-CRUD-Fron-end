import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[
    EmployeeService
  ]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  // selectedEmployee: Employee = {} as Employee;
  
  resetForm(employeeForm : NgForm){
    employeeForm.reset();
    this.employeeService.selectedEmployee = {
      _id:"",
      name:"",
      position:"",
      office:"",
      salary:null
    }
  }
  ngOnInit(): void {
    // this.resetForm();
    this.refreshEmployeeList();
  }
  onSubmit(employeeForm : NgForm){
    // console.log(employeeForm.value);
    if(employeeForm.value._id !== ""){
    this.employeeService.postEmployee(employeeForm.value).subscribe((res)=>{
      this.resetForm(employeeForm);
      this.refreshEmployeeList();
      console.log(res);
    });
    }else{ 
      this.employeeService.putEmployee(employeeForm.value).subscribe((res)=>{
        this.resetForm(employeeForm);
      this.refreshEmployeeList();

      });

    }
  };

  refreshEmployeeList(){
    this.employeeService.getEmployee().subscribe((res)=>{
      this.employeeService.employees = res as Employee[];
    })
  }

  onEdit(emp : Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id :string,employeeForm : NgForm){
    if(confirm('Are you sure you delete this record ? ')== true){
      this.employeeService.deleteEmployee(_id).subscribe((res)=>{
        this.refreshEmployeeList();
        this.resetForm(employeeForm)
      })
    }
  }
}
