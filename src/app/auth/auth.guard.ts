import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.hasToken()) {
    router.navigate(['/login']);
    return false;
  }

  const roleAllowed: string = route.data['role'];
  const loggedUser = authService.getLoggedUser();
  
  if (roleAllowed && loggedUser && roleAllowed != loggedUser.role) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
