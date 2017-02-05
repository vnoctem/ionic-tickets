import { QrCodePage } from './../qr-code/qr-code';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPage');
  }

  // navigation for prototype (go to QrCodePage of "Borgeous" show)
  goToQRCode() {
    this.navCtrl.push(QrCodePage);
  }

}
