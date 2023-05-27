import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject, OnInit } from '@angular/core'
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'nam',
    'hoang',
    'thai',
    'ngan'
  ]

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeesService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      gender: "",
      education: "",
      company: "",
      experience: "",
      package: "",
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._employeeService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Updata employee is success', 'done')
            this._dialogRef.close(true)
            this._employeeService.getEmployee()
          },
          error: (err) => {
            console.error(err)
          }
        })
      } else {

        this._employeeService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('add employee success', 'done')
            this._dialogRef.close(true)
            this._employeeService.getEmployee()
          },
          error: (err) => {
            console.error(err)
          }
        })
      }

    }
  }
}
