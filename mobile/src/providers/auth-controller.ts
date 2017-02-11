import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from './app-settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// classes wanted to be called after login
export interface AuthObserver {
  notify(currentUser: any);
}

/*
  Generated class for the AuthController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthController {

  private observers: Array<AuthObserver> = [];
  private socialApiUrl: string = this.appSettings.getSocialApiUrl();
  private socialStaticUrl: string = this.appSettings.getSocialStaticUrl();
  private currentUser: any;

  constructor(public http: Http, public appSettings: AppSettings) {
  }

  public postLogin(data: any) {
    return this.http.post(this.socialApiUrl + '/login', data)
      .map(res => res.json())
      .toPromise()
      .then((res: any) => {
        this.currentUser = res;
        //add the domain for photo
        this.currentUser.user.photo = this.socialStaticUrl + this.currentUser.user.photo;
        this.notifyObservers();
        return this.currentUser;
      });
  }

  private notifyObservers() {
    for (let obs of this.observers) {
      obs.notify(this.currentUser);
    }
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public addObserver(observer: AuthObserver) {
    this.observers.push(observer);
  }

}
