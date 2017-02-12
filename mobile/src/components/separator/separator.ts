import { Directive, Input } from '@angular/core';

/*
  Generated class for the Separator directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[separator]' // Attribute selector
})
export class Separator {
  @Input('separator') separator: boolean;

  constructor() {
    // only used to apply a CSS class
  }

}
