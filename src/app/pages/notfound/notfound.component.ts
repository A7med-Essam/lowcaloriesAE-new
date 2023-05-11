import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
  options: AnimationOptions = {
    path: 'https://assets8.lottiefiles.com/packages/lf20_nvapBV.json',
  };
  constructor() { }

  ngOnInit(): void {
  }

}
