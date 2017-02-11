import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from './app-settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the TicketController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TicketController {

  private socialApiUrl: string = this.appSettings.getSocialApiUrl();

  constructor(public http: Http, public appSettings: AppSettings) {
  }

  public getTickets(userId: number, token: string) {
    let headers = new Headers();
    headers.append('Authorization', token);
    return this.http.get(
        `${this.socialApiUrl}/tickets/${userId}`,
        new RequestOptions({ 'headers': headers })
      )
      .map(res => res.json())
      .toPromise()
      .then((res: any) => {
        return res.tickets;
      });
  }

}
