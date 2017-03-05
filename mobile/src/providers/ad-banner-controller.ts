import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AppSettings } from './app-settings';

/*
  Generated class for the AdBannerController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdBannerController {

  private adApiUrl: string = this.appSettings.getAdApiUrl();

  constructor(public http: Http, public appSettings: AppSettings) {
  }

  public getAdBanner(token: string) {
    let headers = new Headers();
    headers.append('Authorization', token);
    return this.http.get(
      `${this.adApiUrl}/ad_banner`,
      new RequestOptions({ 'headers': headers })
    )
      .map(res => res.json())
      .toPromise()
      .then(res => res.adBanner.src);
  }

}
