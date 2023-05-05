import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { SocialMediaService } from 'src/app/services/socialMedia/social-media.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  EmailForm: FormGroup = new FormGroup({});
  EmailMessageModal: boolean = false;
  emailMessage: string = '';
  constructor(
    // private _SocialMediaService: SocialMediaService,
    private _FormBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.setEmailForm();
  }

  setEmailForm() {
    this.EmailForm = this._FormBuilder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(data: FormGroup) {
    if (data.valid) {
      // this._SocialMediaService.sendEmail(data.value).subscribe((res) => {
      //   this.EmailMessageModal = true;
      //   this.emailMessage = res.message;
      //   this.EmailForm.reset();
      // });
    }
  }
}
