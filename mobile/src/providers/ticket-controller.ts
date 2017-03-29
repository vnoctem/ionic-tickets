import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from './app-settings';
import { AuthController } from './auth-controller';
import { StorageService } from './storage-service';
import { HttpHelper } from './http-helper';
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

  constructor(public http: Http, public appSettings: AppSettings, public authCtrl: AuthController, public storService: StorageService, public helper: HttpHelper) {
  }

  public getTickets(token: string) {
    // If no internet connection, retrieve data from local storage
    if (this.authCtrl.isLocal()) {
      let localTickets = localStorage.getItem(KEYS.tickets);
      if (localTickets) {
        return Promise.resolve(JSON.parse(localTickets));
      } else {
        return Promise.resolve([]);
      }
    }

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`); // Add token in header
    headers.append('Accept', 'application/json'); // Response must be JSON, if not 401 is returned

    // Get tickets
    return this.http.get(
      `${this.socialApiUrl}/user/tickets`,
      new RequestOptions({ 'headers': headers })
    )
      .map(res => res.json())
      .toPromise()
      .then(res => {
        let cloned = JSON.parse(JSON.stringify(res));
        // remove photo url in local storage
        for (let i = 0; i < cloned.length; i++) {
          cloned[i].image = '';
        }
        this.storService.saveObject(KEYS.tickets, cloned);
        return res;
      })
      .catch(err => this.helper.convertToJSON(err));
  }

}
