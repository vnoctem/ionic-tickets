import { Component } from '@angular/core';
import { AuthController } from './../../providers/auth-controller';
import { AdBannerController } from './../../providers/ad-banner-controller';

/*
  Generated class for the AdBanner component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'ad-banner',
  templateUrl: 'ad-banner.html'
})
export class AdBannerComponent {

  private src: String;
  private isProVersion: boolean = false;

  constructor(public authCtrl: AuthController, public adCtrl: AdBannerController) {
    this.isProVersion = authCtrl.getCurrentUser().proVersion;

    adCtrl.getAdBanner(authCtrl.getToken())
      .then(src => {
        this.src = src;
      })
      .catch(err => {
        // Return nothing, controller of the page should handle this
      });
  }

}
