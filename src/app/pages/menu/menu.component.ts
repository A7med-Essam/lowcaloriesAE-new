import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { IMenu, IMenuResponse } from 'src/app/interfaces/menu.interface';
import { SharedService } from 'src/app/services/shared.service';
import { FETCH_MENU_START } from 'src/app/store/menuStore/menu.action';
import {
  menuLoadingSelector,
  menuSelector,
} from 'src/app/store/menuStore/menu.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  skeletonMode$: Observable<boolean | null>;
  menu$: Observable<IMenuResponse[] | null>;
  private destroyed$: Subject<void> = new Subject();
  category_index: number = 0;
  carouselVisible:boolean = true;

  constructor(private _Store: Store, private _SharedService:SharedService, public translate:TranslateService) {
    this.menu$ = this._Store.select(menuSelector);
    this.skeletonMode$ = this._Store.select(menuLoadingSelector);
    this.menu$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      res || this._Store.dispatch(FETCH_MENU_START())
    });
    if (this.translate.currentLang == 'ar') {
      this.categoryOptions.rtl = true;
    }

    this.translate.onLangChange.subscribe(res=>{
      if (res.lang == 'ar') {
        this.categoryOptions.rtl = true;
      }else{
        this.categoryOptions.rtl = false;
      }
      this.carouselVisible = false;

      setTimeout(() => {
        this.carouselVisible = true;
      });
  
    })
  }


  ngOnInit(): void {}

  toggleCategories(e: Event, index: number) {
    this.category_index = index;
    this._SharedService.toggleCategories(e);
  }

  categoryOptions: OwlOptions = {
    nav: false,
    margin: 20,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
