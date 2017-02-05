import { QrCodePage } from './../qr-code/qr-code';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the Tickets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html'
})
export class TicketsPage {

  private isLocal: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.isLocal = navParams.get('isLocal');
  }

  // navigation for prototype (go to QrCodePage of "Borgeous" show)
  goToQRCode() {
    this.navCtrl.push(QrCodePage, { 'isLocal': this.isLocal });
  }

  showPhotoOriginalSize(event) {
    event.stopPropagation();

    let alert = this.alertCtrl.create({
      subTitle: event.target.outerHTML
    });
    alert.present();
  }

}
