import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from './app-settings';
import { SharedService } from './shared-service';
import { StorageService } from './storage-service';
import { InternetService } from './internet-service';
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

  constructor(public http: Http, public appSettings: AppSettings, public sharedService: SharedService, public storService: StorageService, public interService: InternetService) {
    // look for token and user in local storage first
    this.currentUser = storService.loadObject(KEYS.user);

    this.local = !interService.hasInternetAccess();
  }

  public isLocal() {
    return this.local;
  }

  public updateProVersion() {
    this.currentUser.proVersion = true;
    // Update in local storage
    this.storService.saveObject(KEYS.user, this.currentUser);
  }

  public postLogin(data: any) {
    return this.http.post(this.socialApiUrl + '/login', data)
      .map(res => res.json())
      .toPromise()
      .then(res => {
        this.currentUser = res.user;
        this.currentUser.proVersion = false;
        // Save token and user locally
        this.storService.saveObject(KEYS.user, this.currentUser);
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
