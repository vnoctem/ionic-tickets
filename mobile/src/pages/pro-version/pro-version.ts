import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProVersionController } from './../../providers/pro-version-controller'
import { AuthController } from './../../providers/auth-controller';
import { TicketsPage } from './../../pages/tickets/tickets';
import { HttpHelper } from './../../providers/http-helper';

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
  private expiryMonth: string = '';
  private expiryYear: string = '';
  private cardNumber: string = '';
  private cardHolder: string = '';
  private cardCVV: string = '';
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public proCtrl: ProVersionController, public authCtrl: AuthController, public helper: HttpHelper) {
    // Populate years and months
    for (let i = 1; i <= 12; i++) {
      let month = {
        "value": i < 10 ? '0' + i.toString() : i.toString(),
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
    expiryDate = this.expiryMonth + this.expiryYear.substr(2, 2);

    let creditCard = {
      'number': this.cardNumber,
      'holder': this.cardHolder,
      'expiryDate': expiryDate,
      'cvv': this.cardCVV
    };
    this.proCtrl.postBuy(creditCard)
      .then(res => {
        this.helper.showToast('L\'achat a été effectué avec succès');
        this.proCtrl.buyProVersion();
        this.navCtrl.setRoot(TicketsPage);
      })
      .catch(err => {
        this.manageErrors(err);
      });
  }

  private manageErrors(err: any) {
    if (err.status == 0 || err.status == 503) { // API is unavailable
      this.error = 'Le serveur n\'est pas disponible.';
    } else if (err.status == 400) { // Bad request : the parameters are not valid
      this.error = 'Les informations saisies ne sont pas valides.';
    } else if (err.status == 401 || err.status == 403) { // **Should not happen** : Invalid API key (Unauthorized || Forbidden)
      this.error = 'Clé API invalide.';
    } else if (err.status == 404) { // ** Should not happen** : Transaction not found
      this.error = 'Transaction non trouvée.'
    } else if (err.status == 500) { // **Should not happen*: Internal server error
      this.error = 'Erreur interne du serveur.';
    } else { // An unknown error happened
      this.error = 'Une erreur inconnue est survenue.';
    }
  }

}
