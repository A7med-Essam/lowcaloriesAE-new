import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnimationOptions } from 'ngx-lottie';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  responsiveOptions: any[] ;
  slider:string[]=['slider-1','slider-3','slider-4','slider-5','slider-6','slider-7','slider-8'];
  constructor() {
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      let lazyImages = document.querySelectorAll("img[loading='lazy']");


      let lazyImageObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyImage: any = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('loading');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    });
  }

  options: AnimationOptions = {
    path: '../../../assets/lottie/app_store.json',
  };

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    lazyLoad: true,
    items: 1,
    dots: false,
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  imgFlag: boolean = true;
  handleShowEvent(event: Image, newSrc: string) {
    this.imgFlag = false;
    event.src = newSrc;
    this.imgFlag = true;
  }
}
