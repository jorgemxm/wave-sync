import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubj = new BehaviorSubject<any>(null);
  user$ = this.userSubj.asObservable();

  constructor() {
    const auth = firebase.auth();
    auth.signInAnonymously().catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });

    auth.onAuthStateChanged(user => {
      this.userSubj.next(user);
    });
  }
}