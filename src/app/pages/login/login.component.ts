import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILoginState } from 'src/app/store/authStore/auth.reducer';
import { loginSelector } from 'src/app/store/authStore/auth.selector';
import { LOGIN_START } from '../../store/authStore/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  login$!: Observable<ILoginState>;
  subscribe$!: Subscription;

  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _Store: Store
  ) {
    this.login$ = _Store.select(loginSelector);
    this.subscribe$ = this.login$.subscribe((res) => {
      res.data && this._Router.navigate(['/home']);
    });
  }

  ngOnDestroy(): void {
    this.subscribe$.unsubscribe();
  }

  ngOnInit(): void {
    this.setLoginForm();
  }

  setLoginForm() {
    this.loginForm = this._FormBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(data: FormGroup) {
    if (data.valid) {
      this._Store.dispatch(LOGIN_START({ data: data.value }));
    }
  }
}