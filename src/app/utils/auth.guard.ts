import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const routerInjection = () => inject(Router);
export const authStateObserver$ = () => inject(FirebaseAuthService).authState$;

export const authGuard: CanActivateFn = () => {
  const router = routerInjection();
  return authStateObserver$().pipe(
    map((user) => {
      if (!user) {
        router.navigateByUrl('loading-app');
        return false;
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = routerInjection();
  return authStateObserver$().pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl('/');
        return false;
      }
      return true;
    })
  );
};