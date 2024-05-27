import { inject, Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);
  private router$ = inject(Router);

  constructor() { }

  signInWithEmailAndPassword(user: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, user, password));
  }

  logout() {
    return this.auth.signOut();
  }

}
