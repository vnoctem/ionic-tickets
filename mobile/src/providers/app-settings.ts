import { Injectable } from '@angular/core';

const CONFIG = {
  socialApiUrl: 'http://127.0.0.1:3000/api',
  socialStaticUrl: 'http://127.0.0.1:3000'
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

  public getSocialStaticUrl() {
    return CONFIG.socialStaticUrl;
  }

}
