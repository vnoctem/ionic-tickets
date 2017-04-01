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
    headers.append('Authorization', `Bearer ${token}`); // Add token in header
    headers.append('Accept', 'application/json'); // Response must be JSON, if not 401 is returned

    // Get shows of a specific friend
    return this.http.get(
      `${this.socialApiUrl}/user/${friendId}/tickets`,
      new RequestOptions({ 'headers': headers })
    )
      .map(res => res.json())
      .toPromise()
      .then(res => {
        // Filter to get only upcoming tickets and sort by date
        return res
          .filter(ticket => new Date(ticket.date_event) >= new Date())
          .sort((ticketA: any, ticketB: any) => {
            return this.helper.getTime(new Date(ticketA.date_event)) - this.helper.getTime(new Date(ticketB.date_event));
          });
      })
      .catch(err => this.helper.convertToJSON(err));
  }

}
