import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AppSettings } from './app-settings';
import { SharedService } from './shared-service';
import { AuthController } from './auth-controller';
import { HttpHelper } from './http-helper';

/*
  Generated class for the ProVersionController provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProVersionController {

  private paymentApiUrl: string = this.appSettings.getPaymentApiUrl();

  constructor(public http: Http, public appSettings: AppSettings, public authCtrl: AuthController, public sharedService: SharedService, public helper: HttpHelper) {
  }

  public buyProVersion() {
    this.authCtrl.updateProVersion();
  }

  public postBuy(creditCard: any) {
    return this.http.post(
      'https://gti525-passerelle.herokuapp.com/api/transaction/pre-auth/', // Preauthorization of the transaction
      {
        "api_key": "58d691fb95d6df00112624c4", // API key from https://gti525-passerelle.herokuapp.com
        "creditcard":
        {
          "cardnumber": creditCard.number,
          "cardholder": creditCard.holder,
          "expiry_date": creditCard.expiryDate,
          "cvv": creditCard.cvv
        },
        "montant": "2.00",
        "description": "Achat de la version Pro sur application mobile de billets."
      }
    )
      .map(res => res.json())
      .toPromise()
      .then(res => {
        // Notify all subscribers
        //this.sharedService.notifyProSubscribers();
        return Promise.resolve();
      })
      .catch(err => this.helper.convertToJSON(err));
  }

}
