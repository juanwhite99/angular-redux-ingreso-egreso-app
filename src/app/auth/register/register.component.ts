import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  get validName() {
    return this.formRegister.controls.nombre.valid;
  }

  get validEmail() {
    return this.formRegister.controls.correo.valid;
  }

  get validPassword() {
    return this.formRegister.controls.password.valid;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    console.log(this.formRegister);
    console.log(this.formRegister.valid);
    console.log(this.formRegister.value);
  }

}
