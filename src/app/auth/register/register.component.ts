import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombre: ['Juan', Validators.required],
      correo: ['juan.pablo.lb99@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', Validators.required],
    });
  }

  register() {
    if (this.formRegister.invalid) return;
    const { nombre, correo, password } = this.formRegister.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(credentials => {
        console.log(credentials);
        this.router.navigate(['/']);
      })
      .catch(err => console.error(err))
      ;
  }

}
