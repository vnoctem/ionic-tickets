import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProVersionController } from './../../providers/pro-version-controller'
import { AuthController } from './../../providers/auth-controller';
import { TicketsPage } from './../../pages/tickets/tickets';
import { HttpHelper } from './../../providers/http-helper';
import { AuthenticationPage } from './../authentication/authentication';

/*
  Generated class for the ProVersion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pro-version',
  templateUrl: 'pro-version.html'
})
export class ProVersionPage {

  private months = [];
  private years = [];
  private expirationMonth: number;
  private expirationYear: number;
  private cardNumber: number;
  private cardName: string;
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public proCtrl: ProVersionController, public authCtrl: AuthController, public helper: HttpHelper) {
    // Populate years and months
    for (let i = 1; i <= 12; i++) {
      let month = {
        "value": i,
        "text": i < 10 ? '0' + i.toString() : i.toString()
      };
      this.months.push(month);
    }
    let presentYear = new Date().getFullYear();
    for (let i = presentYear; i <= presentYear + 20; i++) {
      let year = {
        "value": i,
        "text": i
      };
      this.years.push(year);
    }
  }

  // carry out payment to buy the version without ad
  public confirmPayment() {
    let cardInfo = {
      'cardName': this.cardName,
      'cardNumber': this.cardNumber,
      'expirationYear': this.expirationYear,
      'expirationMonth': this.expirationMonth
    };
    this.proCtrl.postBuy(cardInfo, this.authCtrl.getToken())
      .then(res => {
        this.helper.showToast('L\'achat a été effectué avec succès');
        this.proCtrl.buyProVersion();
        this.navCtrl.setRoot(TicketsPage);
      })
      .catch(err => {
        return this.helper.onHttpError(err);
      })
      .catch(err => {
        this.manageErrors(err);
      });
  }

  private manageErrors(err: any) {
    if (err.redirect) {
      this.navCtrl.setRoot(AuthenticationPage, {
        'error': err.message
      });
    } else if (err.message) {
      this.error = err.message;
    } else if (err.source._body.message) {
      this.error = err.source._body.message;
    }
  }

}
