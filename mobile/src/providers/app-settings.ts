import { Injectable } from '@angular/core';

const CONFIG = {
  socialBaseUrl: 'https://gti525-social-network.herokuapp.com',
  socialApiUrl: 'https://gti525-social-network.herokuapp.com/api/v1',
  socialApiTokenUrl: 'https://gti525-social-network.herokuapp.com/oauth/token',
  socialApiClientId: '32',
  socialApiClientSecret: '07Lj9JLSa9DiQKpOzY0fUY52uJOHFExrITGiKkJj',
  paymentApiUrl: 'https://gti525-passerelle.herokuapp.com/api',
  paymentApiKey: '58d691fb95d6df00112624c4' // API key from https://gti525-passerelle.herokuapp.com
}

/*
  Generated class for the AppSettings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSettings {

  public getSocialBaseUrl() {
    return CONFIG.socialBaseUrl;
  }

  public getSocialApiUrl() {
    return CONFIG.socialApiUrl;
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

  public getPaymentApiUrl() {
    return CONFIG.paymentApiUrl;
  }

  public getPaymentApiKey() {
    return CONFIG.paymentApiKey;
  }

}
