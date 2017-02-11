import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the Maximizable directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[maximizable]' // Attribute selector
})
export class Maximizable {

  constructor(el: ElementRef, public alertCtrl: AlertController) {
    // bind onclick programmatically so that every tag which needs this feature
    // only has to add this attribute
    el.nativeElement.onclick = (event) => {
      event.stopPropagation();

      let alert = this.alertCtrl.create({
        subTitle: event.target.outerHTML
      });
      alert.present();
    };
  }

}
