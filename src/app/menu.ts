import {Component, Inject, forwardRef} from '@angular/core';
import {OnsSplitterContent} from 'angular2-onsenui';
import {MyApp} from './app';

@Component({
  selector: 'ons-page[menu]',
  template: require('./menu.html'),
  styles: [require('./menu.css')]
})
export class MenuPage {

  constructor(@Inject(forwardRef(() => MyApp)) private app : MyApp) {
  }

}


