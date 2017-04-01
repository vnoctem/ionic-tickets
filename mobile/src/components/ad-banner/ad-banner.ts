import { Component } from '@angular/core';
import { AuthController } from './../../providers/auth-controller';

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

  private isProVersion: boolean = false;

  constructor(public authCtrl: AuthController) {
    this.isProVersion = authCtrl.getCurrentUser().proVersion;
  }

}
