import { Component } from '@angular/core';
import { AuthObserver } from './../../providers/auth-controller'

/*
  Generated class for the Profile component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent implements AuthObserver {
  private fullname: string;
  private photo: string;

  constructor() {
  }

  public notify(currentUser) {
    this.fullname = currentUser.fullname;
    this.photo = currentUser.photo;
  }

}
