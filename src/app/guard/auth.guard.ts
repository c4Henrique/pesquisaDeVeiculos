import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  
  const user = sessionStorage.getItem('user-name')
  
  if(!user) {
    router.navigate([""]);

    return false
  }
  
  return true;
};
