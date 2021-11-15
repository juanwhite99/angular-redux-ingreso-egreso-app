export class Usuario {
  uid!: string | undefined | null;
  nombre!: string;
  email!: string;

  constructor(args: Usuario) {
    Object.assign(this, args);
  }
}
