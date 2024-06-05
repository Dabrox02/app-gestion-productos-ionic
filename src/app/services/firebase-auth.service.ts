import { inject, Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);

  constructor() { }

  signInWithEmailAndPassword(user: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, user, password));
  }

  signInWithGoogleProvider(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout() {
    return signOut(this.auth);
  }

}
