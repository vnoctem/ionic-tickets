import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from './app-settings';
import { SharedService } from './shared-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const KEYS = {
  user: 'billets-user',
  token: 'billets-token'
}

/*
  Generated class for the AuthController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthController {

  private socialApiUrl: string = this.appSettings.getSocialApiUrl();
  private currentUser: any;
  private token: string;

  constructor(public http: Http, public appSettings: AppSettings, public sharedService: SharedService) {
    // look for token and user in local storage first
    this.currentUser = JSON.parse(localStorage.getItem(KEYS.user));
    this.token = localStorage.getItem(KEYS.token);
  }

  public postLogin(data: any) {
    return this.http.post(this.socialApiUrl + '/login', data)
      .map(res => res.json())
      .toPromise()
      .then((res: any) => {
        this.currentUser = res.user;
        this.currentUser.proVersion = false;
        this.token = res.token;
        // Save token and user locally
        localStorage.setItem(KEYS.token, this.token);
        localStorage.setItem(KEYS.user, JSON.stringify(this.currentUser));
        // notify all subscribers
        this.sharedService.notifyAuthSubscribers();
        return this.currentUser;
      });
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getToken() {
    return this.token;
  }

  public hasBeenAuthenticated() {
    return this.currentUser && this.token;
  }

}
