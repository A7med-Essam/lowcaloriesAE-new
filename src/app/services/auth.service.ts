import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalService } from './local.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ILoginResponse, IRegisterResponse, ISignInData, ISignUpData } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _Router: Router,
    private _LocalService: LocalService,
    private _ApiService: ApiService
  ) {
    if (this._LocalService.getJsonValue('lowcaloriesAE_new') != null) {
      this.currentUser.next(
        this._LocalService.getJsonValue('lowcaloriesAE_new')
      );
    }
  }



  logOut2() {
    // this._Router.navigate(['/login']);
    // this.currentUser.next(null);
    this._LocalService.removeItem('lowcaloriesAE_new');
    // const currentLang = this._LocalService.getJsonValue('currentLang');
    this._LocalService.clearToken();
    // this._LocalService.setJsonValue('currentLang', currentLang);
  }

  resetPassword_profile(password: any): Observable<any> {
    return this._ApiService.postReq('resetPassword', password);
  }

  sendResetMail(email: string): Observable<any> {
    return this._ApiService.postReq('sendResetMail', { email: email });
  }

  resetPassword(newPassword: any): Observable<any> {
    return this._ApiService.postReq('getResetMail', newPassword);
  }

  // ===========================================================================

  signIn(
    signInData: ISignInData
  ): Observable<{ status: number; data: ILoginResponse; message: string }> {
    return this._ApiService.postReq('login', signInData);
  }

  signUp(signUpData: ISignUpData): Observable<{ status: number; data: IRegisterResponse; message: string }> {
    return this._ApiService.postReq('register', signUpData);
  }

  logOut(): Observable<{ status: number; data: null; message: string }> {
    return this._ApiService.postReq('logout', '');
  }

}
