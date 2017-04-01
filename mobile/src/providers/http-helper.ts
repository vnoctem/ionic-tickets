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

  // Manage commun errors
  public onHttpError(err: any) {
    let message = '';
    if (err.status == 0) { // api unavailable
      message = 'Le serveur n\'est pas disponible';
    }
    return Promise.reject({
      'message': message,
      'source': err
    });
  }

  // Return the good URL path for the image
  public displayImage(image: string) {
    let regexURL = new RegExp('^https?:?(\/\/)?.+$');
    // Check if image is an URL
    if (regexURL.test(image)) { // Image is an URL, return as it is
      return image;
    } else { // Image is not an URL, return path to image
      return `https://gti525-social-network.herokuapp.com/${image}`
    }
  }

  // Return date (handle undefined date)
  public getTime(date: Date) {
    return date != null ? date.getTime() : 0;
  }

}
