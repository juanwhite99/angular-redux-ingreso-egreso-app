import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      ingresoEgresoType: ['', [Validators.required]]
    });
  }

  saveIngresoForm() {
    if (this.ingresoForm.invalid) { return; }
    const { description, amount, ingresoEgresoType } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso({ description, amount, ingresoEgresoType });
    this.ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        Swal.fire('Register Saved Successfully', description, 'success');
      },
        err => {
          Swal.fire('Something went wrong', err.message, 'error');
        });
  }

}
