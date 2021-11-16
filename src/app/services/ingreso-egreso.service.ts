import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore: AngularFirestore,
    private authService: AuthService
  ) { }

  createIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const { uid } = this.authService.user || {};
    return this.fireStore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  getIngresoEgresosListener(uid: string): Observable<Array<IngresoEgreso>> {
    return this.fireStore.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
      .pipe(
        map(snapShot => snapShot.map(doc => ({
          uid: doc.payload.doc.id, ...doc.payload.doc.data() as IngresoEgreso
        })))
      );
  }
}
