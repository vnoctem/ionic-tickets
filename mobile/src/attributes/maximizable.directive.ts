import { Directive, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';

/* 
  Show the image with its original size 
*/
@Directive({
  selector: '[maximizable]'
})
export class MaximizableDirective {

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