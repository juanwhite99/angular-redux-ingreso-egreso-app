import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  get validCorreo() {
    return this.loginForm.controls.correo.valid;
  }

  get validPassword() {
    return this.loginForm.controls.password.valid;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['juan.pablo.lb99@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    const { correo, password } = this.loginForm.value;
    this.authService.login(correo, password)
      .then(credentials => {
        console.log(credentials);
        this.router.navigate(['/']);
      })
      .catch(err => console.error(err));
  }

}
