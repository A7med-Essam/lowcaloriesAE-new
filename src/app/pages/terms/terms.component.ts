import { Component, OnInit } from '@angular/core';
// import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  skeletonMode: boolean = false;
  // constructor(private _TermsService: TermsService) {}

  ngOnInit(): void {
    // this.getTerms();
  }

  terms: any[] = [];
  getTerms() {
    this.skeletonMode = true;
    // this._TermsService.getTerms().subscribe((res) => {
    //   this.skeletonMode = false;
    //   this.terms = res.data;
    // });
  }
}
