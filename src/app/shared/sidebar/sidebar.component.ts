import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  ngDestoyed$ = new Subject();
  usuario$!: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.usuario$ = this.store.select('user');
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
  }

  logout() {
    this.authService.logout().then(
      () => {
        this.router.navigate(['/login']);
      }
    );
  }
}
