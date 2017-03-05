import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the HttpHelper provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpHelper {

  constructor(public toast: ToastController) {

  }

  public convertToJSON(err: any) {
    // convert to json only when it's a string
    // otherwise it would crash
    if (typeof err._body === 'string') {
      err._body = JSON.parse(err._body);
    }
    return Promise.reject(err);
  }

  public showToast(message: string) {
    this.toast.create({
      'message': message,
      'duration': 3000,
      'position': 'bottom'
    })
      .present();
  }

}
