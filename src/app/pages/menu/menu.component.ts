import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IMenuResponse } from 'src/app/interfaces/menu.interface';
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

  constructor(private _Store: Store) {
    this.menu$ = this._Store.select(menuSelector);
    this.skeletonMode$ = this._Store.select(menuLoadingSelector);
    this.menu$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      res || this._Store.dispatch(FETCH_MENU_START());
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit(): void {}
}
