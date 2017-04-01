import { TicketsPage } from './../tickets/tickets';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthController } from './../../providers/auth-controller';
import { HttpHelper } from './../../providers/http-helper';

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

  private username: string = '';
  private password: string = '';
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authCtrl: AuthController, public helper: HttpHelper) {
    this.error = navParams.get('error');
  }

  login() {
    this.authCtrl.postLogin({
      'username': this.username,
      'password': this.password
    })
      .then(user => {
        this.navCtrl.setRoot(TicketsPage);
      })
      .catch(err => {
        if (err.status == 0) { // API unavailable
          this.error = 'Le serveur n\'est pas disponible.';
        } else if (err.status == 400) { // Bad request : the parameters are invalid
          this.error = 'Veuillez saisir votre nom d\'utilisateur et votre mot de passe.';
        } else if (err.status == 401) { // Unauthorized
          this.error = 'Le nom d\'utilisateur ou le mot de passe est invalide.';
        } else {
          this.error = 'Une erreur inconnue est survenue.';
        }
      });
  }

}
