import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from './app-settings';
import { HttpHelper } from './http-helper';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the TicketController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class FriendController {

  private socialApiUrl: string = this.appSettings.getSocialApiUrl();

  constructor(public http: Http, public appSettings: AppSettings, public helper: HttpHelper) {
  }

  public getFriends(token: string) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`); // Add token in header
    headers.append('Accept', 'application/json'); // Response must be JSON, if not 401 is returned

    // Get friends
    return this.http.get(
      `${this.socialApiUrl}/user/friends`,
      new RequestOptions({ 'headers': headers })
    )
      .map(res => res.json())
      .toPromise()
      .then(res => {
        if (res == null) {
          return [];
        } else {
          return res;
        }
      })
      .catch(err => this.helper.convertToJSON(err));
  }

}
