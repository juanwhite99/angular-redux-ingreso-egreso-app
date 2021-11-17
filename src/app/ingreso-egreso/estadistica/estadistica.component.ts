import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../../app.reducer';
import { takeUntil } from 'rxjs/operators';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  ngDestoyed$ = new Subject();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').pipe(takeUntil(this.ngDestoyed$))
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
  }

  generarEstadistica(items: Array<IngresoEgreso>) {
    if (!items.length) { return; }
    items.forEach(item => {
      if (item.ingresoEgresoType === 'ingreso') {
        this.totalIngresos += item.amount ?? 0;
        this.ingresos++;
      }
      else {
        this.totalEgresos += item.amount ?? 0;
        this.egresos++;
      }
    });
  }
}
