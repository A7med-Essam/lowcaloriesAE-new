import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalService } from './local.service';
import { ApiService } from 'src/app/core/services/api.service';
import {
  ILoginResponse,
  IRegisterResponse,
  ISignInData,
  ISignUpData,
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _ApiService: ApiService) {}

  // resetPassword_profile(password: any): Observable<any> {
  //   return this._ApiService.postReq('resetPassword', password);
  // }

  // sendResetMail(email: string): Observable<any> {
  //   return this._ApiService.postReq('sendResetMail', { email: email });
  // }

  // resetPassword(newPassword: any): Observable<any> {
  //   return this._ApiService.postReq('getResetMail', newPassword);
  // }

  // ===========================================================================

  signIn(
    signInData: ISignInData
  ): Observable<{ status: number; data: ILoginResponse; message: string }> {
    return this._ApiService.postReq('login', signInData);
  }

  signUp(
    signUpData: ISignUpData
  ): Observable<{ status: number; data: IRegisterResponse; message: string }> {
    return this._ApiService.postReq('register', signUpData);
  }

  logOut(): Observable<{ status: number; data: null; message: string }> {
    return this._ApiService.postReq('logout', '');
  }

  refreshToken(): Observable<{ status: number; data: string; message: string }>{
    return this._ApiService.postReq('checkToken', '');
  }
}
