import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';

/*
  Generated class for the InternetService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InternetService {

  public hasInternetAccess() {
    // NOTE: work only in browser, need to use (cordova plugin add cordova-plugin-network-information)
    // in real device
    // return navigator.onLine;

    // Check internet connection in real device
    return Network.type !== 'none' && Network.type !== 'unknown';
  }

  public GetOnDisconnect() {
    return Network.onDisconnect();
  }

  public GetOnConnect() {
    return Network.onConnect();
  }

}
