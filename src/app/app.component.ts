import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationOptions } from 'ngx-lottie';
import { ProgramService } from './services/program.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _ProgramService: ProgramService, public translate:TranslateService) {}
  offers: {
    offer_name: string;
    plan: string;
    price: number;
    remaining_days: number;
    link: string;
  }[] = [];

  ngOnInit(): void {
    this._ProgramService.getOffers().subscribe((res) => {
      if (res.status == 1) {
        this.offers = res.data;
        this.welcomeModal = true;
      }
    });
  }
  title = 'Low-Calories';
  welcomeModal: boolean = false;
  options: AnimationOptions = {
    path: '../../../assets/lottie/gift.json',
  };
}
