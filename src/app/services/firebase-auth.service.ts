import { inject, Injectable, SimpleChanges } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);

  constructor() {
    GoogleAuth.initialize();
  }

  signInWithEmailAndPassword(user: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, user, password));
  }

  signInWithGoogleProvider(): Observable<any> {
    return new Observable<any>((observer) => {
      GoogleAuth.signIn().then(async (usr) => {
        console.log(usr);
        const idToken = usr.authentication.idToken;
        try {
          const credential = GoogleAuthProvider.credential(idToken);
          const userCredential = await signInWithCredential(this.auth, credential);
          observer.next(userCredential);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  getCurrentUserUid(): Promise<string | null> {
    return this.getCurrentUserUid();
  }

  logout() {
    return signOut(this.auth);
  }

}
