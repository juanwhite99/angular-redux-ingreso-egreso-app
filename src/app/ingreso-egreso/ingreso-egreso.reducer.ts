import { Action, createReducer, on } from '@ngrx/store';
import * as ie from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
  items: Array<IngresoEgreso>;
}

export const initialState: State = {
  items: []
}

const _ingresoEgresoReducer = createReducer(initialState,

  on(ie.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(ie.unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state: State | undefined, action: Action) {
  return _ingresoEgresoReducer(state, action);
}
