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
  private expiryMonth: number;
  private expiryYear: number;
  private cardNumber: number;
  private cardHolder: string;
  private cardCVV: number;
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

  // Carry out payment to buy the version without ad
  public confirmPayment() {
    let expiryDate: string = '';
    if (this.expiryYear != null) {
      expiryDate = this.expiryMonth + this.expiryYear.toString().substr(2, 4);
    }

    let creditCard = {
      'holder': this.cardHolder,
      'number': this.cardNumber,
      'expiryDate': expiryDate,
      'cvv': this.cardCVV
    };
    this.proCtrl.postBuy(creditCard)
      .then(res => {
        alert('Res : ' + res);
        this.helper.showToast('L\'achat a été effectué avec succès!');
        this.proCtrl.buyProVersion();
        this.navCtrl.setRoot(TicketsPage);
      })
      .catch(err => {
        this.manageErrors(err);
      });
  }

  private manageErrors(err: any) {
    alert(JSON.stringify(err));
    if (err.status == 0) { // API is unavailable
      this.error = 'Le serveur n\'est pas disponible.';
    } else if (err.status == 401) { // **Should not happen** : Invalid API key
      this.error = 'Clé API invalide.';
    } else if (err.status == 500) { // **Should not happen*: Internal server error
      this.error = 'Erreur interne du serveur.';
    } else { // An unknown error happened
      this.error = 'Une erreur inconnue est survenue. ' + JSON.stringify(err);
    }

    /*if (err.message) {
      this.error = err.message;
    } else if (err.source._body.message) {
      this.error = err.source._body.message;
    }*/
  }

}
