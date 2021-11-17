import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: Array<IngresoEgreso>): Array<IngresoEgreso> {
    if (items) {

      /**
       * We need to create this copy of the original items array in order to avoid the following error:
       * TypeError: Cannot assign to read only property '0' of object '[object Array]' in typescript
       * https://stackoverflow.com/questions/64957735/typeerror-cannot-assign-to-read-only-property-0-of-object-object-array-in
       */
      let sortedItems = [...items];
      return sortedItems.sort((a, b) => {
        if (a.ingresoEgresoType === 'ingreso') { return -1; }
        else { return 1; }
      });
    }
    else {
      return [];
    }
  }
}
