import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   var authenticated  =  localStorage.getItem('token')!= null;
   if(!authenticated){
      this.router.navigate(['/login']);
   }
   return authenticated;
 }
}
