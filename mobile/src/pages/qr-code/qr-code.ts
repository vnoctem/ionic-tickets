import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the QrCode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html'
})
export class QrCodePage {

  private isLocal: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isLocal = navParams.get('isLocal');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrCodePage');
  }

}
