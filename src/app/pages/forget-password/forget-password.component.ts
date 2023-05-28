import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}
  btnStatus:boolean = false
  ngOnInit(): void {}

  forgetPassword(email: HTMLInputElement) {
    if (email.value != '') {
      this.btnStatus = true;
      this._AuthService.forgetPassword(email.value).subscribe((res) => {
        this.btnStatus = false;
        this.fireSwal(res.message, res.status == 1 ? true : false);
        email.value = ""
      });
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
