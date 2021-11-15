import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  ngDestoyed$ = new Subject();
  loading: boolean = false;

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
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.store.select('ui')
      .pipe(takeUntil(this.ngDestoyed$))
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
  }

  register() {
    if (this.formRegister.invalid) return;

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Loading...',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { nombre, correo, password } = this.formRegister.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(() => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: err.message
        // })
      })
      ;
  }
}
