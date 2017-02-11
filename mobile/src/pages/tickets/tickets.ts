import { QrCodePage } from './../qr-code/qr-code';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TicketController } from './../../providers/ticket-controller'
import { AuthController } from './../../providers/auth-controller'

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

  private isLocal: boolean = false;
  private tickets: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ticketCtrl: TicketController, public authCtrl: AuthController) {
    ticketCtrl.getTickets(
      authCtrl.getCurrentUser().id,
      authCtrl.getToken()
    ).then((res) => {
      this.tickets = res;
    });
  }

  goToQRCode(ticket) {
    this.navCtrl.push(QrCodePage, { 'ticket': ticket });
  }

}
