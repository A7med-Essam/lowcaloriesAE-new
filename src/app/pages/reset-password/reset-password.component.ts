import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  btnStatus: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  resetPassword(password: HTMLInputElement, confirmation: HTMLInputElement) {
    if (password.value != '' && confirmation.value != '') {
      if (password.value !== confirmation.value) {
        this.fireSwal('Password does not match!', false);
      } else {
        this.btnStatus = true;
        const allParams:any = this._ActivatedRoute.snapshot.queryParams;
        this._AuthService
          .resetPassword({
            password: password.value,
            password_confirmation: confirmation.value,
            token: allParams.token,
            email: allParams.email
          })
          .subscribe((res) => {
            this.btnStatus = false;
            this.fireSwal(res.message, res.status == 1 ? true : false);
            password.value = '';
            confirmation.value = '';
            setTimeout(() => {
              if (res.status == 1) {
                this._Router.navigate(['/login']);
              }
            }, 3000);
          });
      }
    }
  }

  fireSwal(message: string, status: boolean) {
    Swal.fire({
      icon: status ? 'success' : 'error',
      title: 'Reset Password Service',
      text: message,
    });
  }
}