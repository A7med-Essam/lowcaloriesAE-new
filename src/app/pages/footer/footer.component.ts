import { Component, OnInit } from '@angular/core';
import { SocialMediaService } from 'src/app/services/socialMedia/social-media.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private _SocialMediaService: SocialMediaService,
  ) { }

  ngOnInit(): void {
    // this.getFooterInfo()
  }
  info: any;
  getFooterInfo() {
    this._SocialMediaService.footerInfo().subscribe((res:any) => {
      this.info = res.data;
    });
  }
}
