export class IngresoEgreso {
  description!: string | undefined | null;
  amount!: string | undefined | null;
  ingresoEgresoType!: string | undefined | null;
  uid?: string;

  constructor(args?: IngresoEgreso) {
    Object.assign(this, args);
  }
}
