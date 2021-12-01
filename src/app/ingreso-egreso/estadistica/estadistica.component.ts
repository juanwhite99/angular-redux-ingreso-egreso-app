import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../../app.reducer';
import { takeUntil } from 'rxjs/operators';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { ChartDataset } from 'chart.js';


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

  // Doughnut
  doughnutChartLabels = ['Ingreso', 'Egreso'];
  doughnutChartData?: ChartDataset[] = [];

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
    this.resetValues();
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

    this.doughnutChartData = [
      { data: [this.totalIngresos, this.totalEgresos] },
    ]
  }

  resetValues() {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
