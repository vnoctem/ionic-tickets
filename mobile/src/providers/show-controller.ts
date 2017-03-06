import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AppSettings } from './app-settings';
import { HttpHelper } from './http-helper';

/*
  Generated class for the ShowController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShowController {

  private socialApiUrl: string = this.appSettings.getSocialApiUrl();

  constructor(public http: Http, public appSettings: AppSettings, public helper: HttpHelper) {
  }

  public getShows(friendId: number, token: string) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    return this.http.get(
      `${this.socialApiUrl}/friends/${friendId}/shows`,
      new RequestOptions({ 'headers': headers })
    )
      .map(res => res.json())
      .toPromise()
      .then(res => res.shows)
      .catch(err => this.helper.convertToJSON(err));
  }

}
