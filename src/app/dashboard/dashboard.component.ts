import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  ngDestoyed$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private ingresoEgreso: IngresoEgresoService,
    private fireStore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.store.select('user').pipe(
      takeUntil(this.ngDestoyed$),
      filter(u => Boolean(u.user))
    ).subscribe(({ user }) => {
      console.log(user);
      user?.uid && this.ingresoEgreso.getIngresoEgresosListener(user.uid);
    });
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
  }

}
