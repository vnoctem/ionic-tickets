import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthController } from './../../providers/auth-controller';

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

  private isLocal: boolean = false;
  private ticket: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authCtrl: AuthController) {
    this.isLocal = navParams.get('isLocal');
    this.ticket = navParams.get('ticket');
  }

}
