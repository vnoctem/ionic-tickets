import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from './app-settings';
import { SharedService } from './shared-service';
import { StorageService } from './storage-service';
import { InternetService } from './internet-service';
import { HttpHelper } from './http-helper';
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
  private socialApiTokenUrl: string = this.appSettings.getSocialApiTokenUrl();
  private socialApiClientId: string = this.appSettings.getSocialApiClientId();
  private socialApiClientSecret: string = this.appSettings.getSocialApiClientSecret();
  private currentUser: any;

  constructor(public http: Http, public appSettings: AppSettings, public sharedService: SharedService, public storService: StorageService, public interService: InternetService, public helper: HttpHelper) {
    // look for token and user in local storage first
    this.refreshUser();
  }

  public refreshUser() {
    this.currentUser = this.storService.loadObject(KEYS.user);
  }

  public isLocal() {
    return !this.interService.hasInternetAccess();
  }

  public updateProVersion() {
    this.currentUser.proVersion = true;
    // Update in local storage
    this.storService.saveObject(KEYS.user, this.currentUser);
  }

  public postLogin(loginInfo: any) {
    return this.http.post( // Authentification
      this.socialApiTokenUrl,
      {
        "grant_type": "password",
        "client_id": this.socialApiClientId,
        "client_secret": this.socialApiClientSecret,
        "username": loginInfo.username,
        "password": loginInfo.password,
        "scope": ""
      })
      .map(res => res.json())
      .toPromise()
      .then(res => {
        this.currentUser = {};
        this.currentUser.token = res.access_token;

        let headers = new Headers();
        headers.append('Authorization', `Bearer ${this.currentUser.token}`); // Add token to header

        // Get current user
        return this.http.get(
          `${this.socialApiUrl}/user`,
          new RequestOptions({ 'headers': headers })
        )
          .map(res => res.json())
          .toPromise()
          .then(res => {
            this.currentUser.id = res.id;
            this.currentUser.photo = res.avatar;
            this.currentUser.fullname = res.first_name + ' ' + res.last_name;
            this.currentUser.proVersion = false;

            let preUser = localStorage.getItem(KEYS.user);
            if (preUser) {
              let preUserObj = JSON.parse(preUser);
              // compare if both are the same user
              if (preUserObj.id == this.currentUser.id) {
                // keep the value from the previous one
                this.currentUser.proVersion = preUserObj.proVersion;
              }
            }
            // Save token and user locally
            this.storService.saveObject(KEYS.user, this.currentUser);
            // Notify all subscribers
            this.sharedService.notifyAuthSubscribers();
            return this.currentUser;
          });
      })
      // Only return the error so that the client can handle it
      .catch(err => this.helper.convertToJSON(err));
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getToken() {
    return this.currentUser.token;
  }

  // return an object, but should be used as a boolean
  public hasBeenAuthenticated() {
    return this.storService.loadObject(KEYS.user);
  }

}
