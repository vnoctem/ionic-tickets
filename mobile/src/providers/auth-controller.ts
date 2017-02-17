import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from './app-settings';
import { SharedService } from './shared-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const KEYS = {
  user: 'billets-user'
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
  private local: boolean = false;

  constructor(public http: Http, public appSettings: AppSettings, public sharedService: SharedService) {
    // look for token and user in local storage first
    this.currentUser = JSON.parse(localStorage.getItem(KEYS.user));

    // NOTE: work only in browser, need to use (cordova plugin add cordova-plugin-network-information)
    // in real device
    this.local = !navigator.onLine;
  }

  public isLocal() {
    return this.local;
  }

  public updateProVersion() {
    this.currentUser.proVersion = true;
    // Update in local storage
    localStorage.setItem(KEYS.user, JSON.stringify(this.currentUser));
  }

  public postLogin(data: any) {
    return this.http.post(this.socialApiUrl + '/login', data)
      .map(res => res.json())
      .toPromise()
      .then(res => {
        this.currentUser = res;
        this.currentUser.proVersion = false;
        // Save token and user locally
        localStorage.setItem(KEYS.user, JSON.stringify(this.currentUser));
        // Notify all subscribers
        this.sharedService.notifyAuthSubscribers();
        return this.currentUser;
      })
      .catch(err => {
        // Only return the error so that the client can handle it
        err._body = JSON.parse(err._body);
        return Promise.reject(err);
      });
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getToken() {
    return this.currentUser.token;
  }

  public hasBeenAuthenticated() {
    return this.currentUser;
  }

}
