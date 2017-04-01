import { QrCodePage } from './../qr-code/qr-code';
import { AuthenticationPage } from './../authentication/authentication';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TicketController } from './../../providers/ticket-controller';
import { AuthController } from './../../providers/auth-controller';
import { HttpHelper } from './../../providers/http-helper';

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
      // Apply filter on local tickets to remove tickets in the past
      return tickets.filter(ticket => new Date(ticket.date_event) >= new Date());
    } else {
      // Ticket provider should return upcoming tickets only
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
  private message: string;
  private loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ticketCtrl: TicketController, public authCtrl: AuthController, public helper: HttpHelper) {
    this.isLocal = this.authCtrl.isLocal();
    this.message = 'En cours de chargement ...';
    this.loading = true;

    ticketCtrl.getTickets(authCtrl.getCurrentUser() ? authCtrl.getToken() : '')
      .then(tickets => {
        this.message = '';
        this.loading = false;
        this.tickets = this.ensureListNotEmpty(tickets);
      })
      .catch(err => {
        this.message = '';
        this.loading = false;
        if (!this.isLocal) {
          this.manageErrors(err);
        }
      });
  }

  public onRefresh(refresher: any) {
    this.ticketCtrl.getTickets(this.authCtrl.getToken())
      .then(tickets => {
        this.message = '';
        this.tickets = this.ensureListNotEmpty(tickets);
        refresher.complete();
      })
      .catch(err => {
        refresher.cancel();
        this.manageErrors(err);
      });
  }

  private ensureListNotEmpty(list: any) {
    if (list.length == 0) {
      this.message = 'Aucun billet à afficher';
      return [];
    }
    return list;
  }

  private manageErrors(err: any) {
    if (err.status == 0) { // API is unavailable
      this.message = 'Le serveur n\'est pas disponible.'
    } else if (err.status == 401) { // Unauthorized : Probably because the token has expired or is invalid
      this.navCtrl.setRoot(AuthenticationPage,
        {
          'error': 'Votre session a expiré.'
        }
      );
    } else {
      this.message = 'Une erreur inconnue est survenue.';
    }
  }

  public goToQRCode(ticket: any) {
    this.navCtrl.push(QrCodePage, { 'ticket': ticket, 'isLocal': this.isLocal });
  }

}
