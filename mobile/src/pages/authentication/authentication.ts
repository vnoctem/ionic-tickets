import { TicketsPage } from './../tickets/tickets';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Authentication page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

  // navigation for prototype (go to TicketsPage)
  goToTickets() {
    this.navCtrl.setRoot(TicketsPage);
  }

}
