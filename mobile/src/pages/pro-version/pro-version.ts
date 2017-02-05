import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ProVersion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pro-version',
  templateUrl: 'pro-version.html'
})
export class ProVersionPage {

  //private minimumExpirationDate: String;
  //private maximumExpirationDate: String;
  private months = [];
  private years = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    /*this.minimumExpirationDate = new Date().toISOString();
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 20);
    this.maximumExpirationDate = maxDate.toISOString();*/
    for (let i = 1; i <= 12; i++) {
      let month = {
        "value": i,
        "text": i < 10 ? "0" + i.toString() : i.toString()
      };
      this.months.push(month);
      //this.months[i].value = i;
      //this.months[i].text = i < 10 ? "0" + i.toString() : i.toString();
    }

    let presentYear = new Date().getFullYear();
    for (let i = presentYear; i <= presentYear + 20; i++) {
      let year = {
        "value": i,
        "text": i
      };
      this.years.push(year);
    }
  }

  // for testing
  onChange(selectedItem) {
    console.log("Selected item: " + selectedItem);
  }

  // carry out payment to buy the version without ad
  confirmPayment() {
    console.log("Confirm payment");
  }

}
