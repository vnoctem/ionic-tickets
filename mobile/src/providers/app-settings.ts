import { Injectable } from '@angular/core';

const CONFIG = {
  socialApiUrl: 'https://morning-sea-98821.herokuapp.com/api',
  paymentApiUrl: 'https://gti525-passerelle.herokuapp.com/api',
  adApiUrl: 'https://morning-sea-98821.herokuapp.com/api'
}

/*
  Generated class for the AppSettings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSettings {

  public getSocialApiUrl() {
    return CONFIG.socialApiUrl;
  }

  public getPaymentApiUrl() {
    return CONFIG.paymentApiUrl;
  }

  public getAdApiUrl() {
    return CONFIG.adApiUrl;
  }

}
