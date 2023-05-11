import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable ,Subject,takeUntil} from 'rxjs';
import { ITermsResponse } from 'src/app/interfaces/terms.interface';
import * as fromTermsSelector from '../../store/termsStore/terms.selector';
import * as fromTermsActions from '../../store/termsStore/terms.action';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  skeletonMode$: Observable<boolean | null>;
  terms$: Observable<ITermsResponse[] | null>;
  private destroyed$: Subject<void> = new Subject();


    constructor(private _Store: Store) {
    this.terms$ = this._Store.select(fromTermsSelector.termsSelector);
    this.skeletonMode$ = this._Store.select(
      fromTermsSelector.termsLoadingSelector
    );
    this.terms$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      res || this._Store.dispatch(fromTermsActions.FETCH_TERMS_START());
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {}
}
