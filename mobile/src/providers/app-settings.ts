import { Injectable } from '@angular/core';

const CONFIG = {
  socialApiUrl: 'https://gti525-social-network.herokuapp.com/api/v1',
  socialApiTokenUrl: 'https://gti525-social-network.herokuapp.com/oauth/token',
  socialApiClientId: '32',
  socialApiClientSecret: '07Lj9JLSa9DiQKpOzY0fUY52uJOHFExrITGiKkJj',
  paymentApiUrl: 'https://morning-sea-98821.herokuapp.com/api',
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

  public getSocialApiTokenUrl() {
    return CONFIG.socialApiTokenUrl;
  }

  public getSocialApiClientId() {
    return CONFIG.socialApiClientId;
  }

  public getSocialApiClientSecret() {
    return CONFIG.socialApiClientSecret;
  }

}
