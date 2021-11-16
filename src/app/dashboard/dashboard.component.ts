import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { filter, take, takeUntil } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ieActions from '../ingreso-egreso/ingreso-egreso.actions';

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
      user?.uid && this.getIngresosEgresosFromFirebase(user.uid);
    });
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
  }

  private getIngresosEgresosFromFirebase(uid: string) {
    this.ingresoEgreso.getIngresoEgresosListener(uid)
      .pipe(takeUntil(this.ngDestoyed$))
      .subscribe(ie => {
        console.log(ie);
        this.store.dispatch(ieActions.setItems({ items: ie }))
      });
  }

}
