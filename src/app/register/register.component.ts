import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submit = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: MustMatch('password', 'confirmPassword')
  })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submit = true;

    
    if (this.registerForm.invalid) {
        return;
    }
  }
}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {

      return;
    }


    if (control.value !== matchingControl.value) {

      matchingControl.setErrors({ mustMatch: true });

    } else {

      matchingControl.setErrors(null);

    }
  }
}

