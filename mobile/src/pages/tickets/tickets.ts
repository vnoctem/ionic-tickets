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
  private message: string;
  private loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ticketCtrl: TicketController, public authCtrl: AuthController, public helper: HttpHelper) {
    this.isLocal = this.authCtrl.isLocal();
    this.message = 'En cours de chargement ...';
    this.loading = true;

    ticketCtrl.getTickets(
      authCtrl.getCurrentUser() ? authCtrl.getCurrentUser().id : -1,
      authCtrl.getCurrentUser() ? authCtrl.getToken() : ''
    )
      .then(tickets => {
        this.message = '';
        this.loading = false;
        this.tickets = this.ensureListNotEmpty(tickets);
      })
      .catch(err => {
        this.message = '';
        this.loading = false;
        if (!this.isLocal) {
          return this.helper.onHttpError(err);
        }
      })
      .catch(err => {
        this.manageErrors(err);
      });
  }

  public onRefresh(refresher) {
    this.ticketCtrl.getTickets(
      this.authCtrl.getCurrentUser().id,
      this.authCtrl.getToken()
    )
      .then(tickets => {
        this.tickets = this.ensureListNotEmpty(tickets);
        refresher.complete();
      })
      .catch(err => {
        return this.helper.onHttpError(err);
        // no need to call refresher since it will be destroyed when redirecting
      })
      .catch(err => {
        if (!err.redirect) {
          refresher.cancel();
        }
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
    if (err.redirect) {
      this.navCtrl.setRoot(AuthenticationPage, {
        'error': err.message
      });
    } else if (err.message) {
      this.message = err.message;
    }
  }

  public goToQRCode(ticket) {
    this.navCtrl.push(QrCodePage, { 'ticket': ticket, 'isLocal': this.isLocal });
  }

}
