import { QrCodePage } from './../qr-code/qr-code';
import { AuthenticationPage } from './../authentication/authentication';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TicketController } from './../../providers/ticket-controller'
import { AuthController } from './../../providers/auth-controller'
import { HttpHelper } from './../../providers/http-helper'

@Pipe({
  name: 'upcomingTickets',
  pure: true // by setting this flag to false, it might affect performance
})
export class UpcomingTicketsPipe implements PipeTransform {
  transform(tickets: any[], isLocal: boolean) {
    // since the process of getting tickets is async, the list might be empty
    if (!tickets)
      return null;

    if (isLocal) {
      // apply filter only on local tickets
      // filter items array, items which match and return true will be kept, false will be filtered out
      return tickets.filter(ticket => new Date(ticket.datetime) >= new Date());
    } else {
      // api should return futur tickets
      return tickets;
    }
  }
}

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public ticketCtrl: TicketController, public authCtrl: AuthController, public helper: HttpHelper) {
    this.isLocal = this.authCtrl.isLocal();

    ticketCtrl.getTickets(
      authCtrl.getCurrentUser().id,
      authCtrl.getToken()
    )
      .then(tickets => {
        this.tickets = tickets;
      })
      .catch(err => {
        this.onError(err);
      });
  }

  public onError(err: any) {
    if (err.status == 0) { // api unavailable
      this.helper.showToast('Api indisponible');
    } else if (err._body.redirect) { // invalid token
      this.navCtrl.setRoot(AuthenticationPage, { 'message': err._body.message });
    } else {
      this.navCtrl.setRoot(AuthenticationPage, { 'message': 'Une erreur inconnue s\'est produite' });
    }
  }

  public onRefresh(refresher) {
    this.ticketCtrl.getTickets(
      this.authCtrl.getCurrentUser().id,
      this.authCtrl.getToken()
    )
      .then(tickets => {
        this.tickets = tickets;
        refresher.complete();
      })
      .catch(err => {
        this.onError(err);
        // no need to call refresher since it has been destroyed 
      });
  }

  public goToQRCode(ticket) {
    this.navCtrl.push(QrCodePage, { 'ticket': ticket });
  }

}
