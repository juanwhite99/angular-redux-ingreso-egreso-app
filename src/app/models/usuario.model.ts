export class Usuario {
  uid!: string | undefined | null;
  nombre!: string | undefined | null;
  email!: string | undefined | null;

  constructor(args?: Usuario) {
    Object.assign(this, args);
  }

}
