import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { ProgramService } from 'src/app/services/program.service';
import { LOGOUT_START} from 'src/app/store/authStore/auth.action';
import { ILoginState } from 'src/app/store/authStore/auth.reducer';
import { loginSelector } from 'src/app/store/authStore/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  login$!: Observable<ILoginState>;

  constructor(private _Store: Store,
    private _I18nService:I18nService,
    public translate: TranslateService,
    private _ProgramService: ProgramService,
    ) {
    this.login$ = _Store.select(loginSelector);
  }

  logOut() {
    this._Store.dispatch(LOGOUT_START());
  }

  changeLang(){
    const LANG = this.translate.currentLang || this.translate.defaultLang
    this._I18nService.changeCurrentLang(this.translate, LANG == 'en' ? 'ar':'en');
  }

  // =================================================================
  welcomeModal: boolean = false;
  offers: any;
  hasOffers: boolean = false;
  currentCompany:string = 'LC'
  private interval: any;

  ngOnInit(): void {
    this._ProgramService.getOffers().subscribe((res) => {
      if (res.status == 1) {
        this.offers = res.data;
        this.welcomeModal = true;
        this.hasOffers = true;
        this.interval = setInterval(() => {
          this.updateCountdown();
        }, 1000);
      }
      else{
        this.hasOffers = false;
      }
    });
  }

  toggleCategories(type: string): void {
    type == 'LC' ? this.currentCompany = 'LC' : this.currentCompany = 'CH';
  }

  private updateCountdown(): void {
    // this.offers?.CH?.forEach((item:any) => {
    //   let durationInSeconds = item.remaining_days * 24 * 60 * 60
    //   durationInSeconds --;
    //   item.remaining_days = durationInSeconds;
    //   if (item.remaining_days < 0) {
    //     item.remaining_days = 0;
    //   }
    // });

    // this.offers?.LC?.forEach((item:any) => {
    //   let durationInSeconds = item.remaining_days * 24 * 60 * 60
    //   durationInSeconds --;
    //   item.remaining_days = durationInSeconds;
    //   if (item.remaining_days < 0) {
    //     item.remaining_days = 0;
    //   }
    // });
  }
}
