import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from './app-settings';
import { AuthController } from './auth-controller';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const KEYS = {
  tickets: 'billets-tickets',
}

/*
  Generated class for the TicketController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TicketController {

  private socialApiUrl: string = this.appSettings.getSocialApiUrl();

  constructor(public http: Http, public appSettings: AppSettings, public authCtrl: AuthController) {
  }

  public getTickets(userId: number, token: string) {
    // If no internet connection, retrieve data from local storage
    if (this.authCtrl.isLocal()) {
      return Promise.resolve(JSON.parse(localStorage.getItem(KEYS.tickets)));
    }

    let headers = new Headers();
    headers.append('Authorization', token);
    return this.http.get(
        `${this.socialApiUrl}/tickets/${userId}`,
        new RequestOptions({ 'headers': headers })
      )
      .map(res => res.json())
      .toPromise()
      .then((res: any) => {
        let cloned = JSON.parse(JSON.stringify(res.tickets));
        // remove photo url in local storage
        for (let i = 0; i < cloned.length; i++) {
          cloned[i].poster = '';
        }
        localStorage.setItem(KEYS.tickets, JSON.stringify(cloned));
        return res.tickets;
      });
  }

}
