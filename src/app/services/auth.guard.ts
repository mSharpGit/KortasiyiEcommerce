import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/adminPortal']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }
  
  canActivateChild(): Promise<boolean> {
   return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        return resolve(true);
      }, err => {
        this.router.navigate(['/login']);
        return resolve(false);
      })
    })
  }
}