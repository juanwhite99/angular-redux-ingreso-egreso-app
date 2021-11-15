import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
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
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.formRegister.invalid) return;

    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { nombre, correo, password } = this.formRegister.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(() => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
      ;
  }
}
