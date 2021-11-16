import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  ngDestoyed$ = new Subject();
  ingresosEgresos: Array<IngresoEgreso> = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .pipe(takeUntil(this.ngDestoyed$))
      .subscribe(({ items }) => this.ingresosEgresos = items)
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
  }

  deleteItem(uid: string | null | undefined) {
    console.log(uid);
  }

}
