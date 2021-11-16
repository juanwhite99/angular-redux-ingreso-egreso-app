import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { of, PartialObserver, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { unSetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ngDestoyed$ = new Subject();

  private _user!: Usuario | undefined;

  get user() {
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.firestore.doc<Usuario>(`${user.uid}/usuario`).valueChanges()
          .pipe(takeUntil(this.ngDestoyed$))
          .subscribe(fuser => {
            // const { uid, nombre, email } = fuser || {};
            this._user = fuser;
            this._user && this.store.dispatch(authActions.setUser({ user: this._user }))
          });
      }
      else {
        this._user = undefined;
        this.ngDestoyed$.next();
        this.store.dispatch(unSetUser());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario({ uid: user?.uid, nombre, email });

        if (user) {
          return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
        }
        return;
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbuser => fbuser !== null)
    );
  }
}
