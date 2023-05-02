import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRegisterState } from 'src/app/store/authStore/auth.reducer';
import { registerSelector } from 'src/app/store/authStore/auth.selector';
import { REGISTER_START } from '../../store/authStore/auth.action';
import { ConfirmedValidator } from './ConfirmedValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  gender: string[] = ['male', 'female'];
  registerForm: FormGroup = new FormGroup({});
  register$!: Observable<IRegisterState>;

  constructor(private _FormBuilder: FormBuilder, private _Store: Store) {
    this.register$ = _Store.select(registerSelector);
  }

  ngOnInit(): void {
    this.setRegisterForm();
  }

  setRegisterForm() {
    this.registerForm = this._FormBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      first_name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(1)]),
      last_name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(1)]),
      phone_number: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      gender: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required, Validators.maxLength(3), Validators.minLength(1)]),
      Weight: new FormControl(null, [Validators.required, Validators.maxLength(3), Validators.minLength(1)]),
      confirm_password: new FormControl(null),
    },{ 
      validator: ConfirmedValidator('password', 'confirm_password')
    } as AbstractControlOptions);
  }

  onSubmit(data: FormGroup) {
    if (data.valid) {
      this._Store.dispatch(REGISTER_START({ data: data.value }));
    }
  }
}
