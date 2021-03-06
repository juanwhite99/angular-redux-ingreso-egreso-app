import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading: boolean = false;
  ngDestoyed$ = new Subject();

  get validCorreo() {
    return this.loginForm.controls.correo.valid;
  }

  get validPassword() {
    return this.loginForm.controls.password.valid;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['juan.pablo.lb99@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });

    this.store.select('ui')
      .pipe(takeUntil(this.ngDestoyed$))
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
    this.store.dispatch(ui.stopLoading());
  }

  login() {
    if (this.loginForm.invalid) return;
    this.store.dispatch(ui.isLoading());
    const { correo, password } = this.loginForm.value;
    this.authService.login(correo, password)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
