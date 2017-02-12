import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProVersionController } from './../../providers/pro-version-controller'
import { AuthController } from './../../providers/auth-controller'
import { TicketsPage } from './../../pages/tickets/tickets';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public proCtrl: ProVersionController, public authCtrl: AuthController, public toastCtrl: ToastController) {
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

  public showToast(message: string) {
    this.toastCtrl.create({
      'message': message,
      'duration': 3000,
      'position': 'bottom'
    })
    .present();
  }

  // carry out payment to buy the version without ad
  public confirmPayment() {
    let cardInfo = {
      'cardName' : this.cardName,
      'cardNumber' : this.cardNumber,
      'expirationYear': this.expirationYear,
      'expirationMonth': this.expirationMonth
    };
    this.proCtrl.postBuy(cardInfo, this.authCtrl.getToken())
    .then((res: any) => {
      this.showToast('L\'achat a été effectué avec succès');
      this.proCtrl.buyProVersion();
      this.navCtrl.setRoot(TicketsPage);
    }).catch((err: any) => {
      this.showToast('L\'achat a échoué');
    });
  }

}
