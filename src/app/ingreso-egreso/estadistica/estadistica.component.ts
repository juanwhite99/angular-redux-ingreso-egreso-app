import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../../app.reducer';
import { takeUntil } from 'rxjs/operators';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { ChartData, ChartDataset, ChartType } from 'chart.js';
// import { NgChartsConfiguration } from 'ng2-charts';

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
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData?: ChartDataset[] = [
    { data: [350, 450, 100] },
    { data: [50, 150, 120] },
    { data: [250, 130, 70] }
  ];

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

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
