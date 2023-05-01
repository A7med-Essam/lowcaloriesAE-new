import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LOGOUT } from 'src/app/store/authStore/auth.action';
import { ILoginState } from 'src/app/store/authStore/auth.reducer';
import { loginSelector } from 'src/app/store/authStore/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  login$!: Observable<ILoginState>;

  constructor(private _Store: Store) {
    this.login$ = _Store.select(loginSelector);
  }

  logOut() {
    this._Store.dispatch(LOGOUT());
  }
}
