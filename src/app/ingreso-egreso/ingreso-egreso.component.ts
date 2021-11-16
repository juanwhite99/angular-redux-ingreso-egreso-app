import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  loading: boolean = false;
  ngDestoyed$ = new Subject();

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      ingresoEgresoType: ['', [Validators.required]]
    });

    this.store.select('ui')
      .pipe(takeUntil(this.ngDestoyed$))
      .subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.ngDestoyed$.next();
  }

  saveIngresoForm() {
    if (this.ingresoForm.invalid) { return; }

    this.store.dispatch(ui.isLoading());
    const { description, amount, ingresoEgresoType } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso({ description, amount, ingresoEgresoType });
    try {
      this.ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
        .then(
          () => {
            this.ingresoForm.reset();
            this.store.dispatch(ui.stopLoading());
            Swal.fire('Register Saved Successfully', description, 'success');
          }
        );
    } catch (err: any) {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Something went wrong', err.message, 'error');
    }
  }

}
