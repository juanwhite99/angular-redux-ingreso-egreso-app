import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { takeUntil } from 'rxjs/operators';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  ngDestoyed$ = new Subject();
  ingresosEgresos: Array<IngresoEgreso> = [];

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
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
    if (uid) {
      this.ingresoEgresoService.deleteIngresoEgresoItem(uid)
        .then(() => {
          Swal.fire('Deleted Successfully', 'Item deleted', 'success')
        });
    }
    else {
      Swal.fire(
        'Something went wrong',
        'Something went wrong, please refresh the page and try again',
        'error'
      );
    }

  }

}
