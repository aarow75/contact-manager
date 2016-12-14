import {Component, ViewChild, OnInit} from '@angular/core';
import { Headers } from '@angular/http';
import {OnsSplitterContent, OnsSplitterSide, OnsNavigator} from 'angular2-onsenui';
import {HomePage} from './home';
import {MenuPage} from './menu';
import {GroupsPage} from './groups';
import {ContactsPage} from './contacts';
import {ContactPage} from './contact';
import {LoginPage} from './login';
import {NotificationsPage} from './notifications';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [require('./app.css')]
})
export class MyApp extends OnInit {
  @ViewChild(OnsSplitterContent) content: OnsSplitterContent;
  @ViewChild(OnsSplitterSide) side: OnsSplitterSide;
  @ViewChild(OnsNavigator) nav: OnsNavigator;

  pages = {
    home: HomePage,
    menu: MenuPage,
    groups: GroupsPage,
    contacts: ContactsPage,
    contact: ContactPage,
    login: LoginPage,
    notifications: NotificationsPage
  };

  headers() {
    let headers = new Headers();
    headers.append("AUTH-TOKEN", JSON.parse(localStorage.getItem("user")).authentication_token);
    headers.append("USER-NAME", JSON.parse(localStorage.getItem("user")).username);
    headers.append("DEVICE-ID", "api-console-aaron.swensen");
    headers.append("Content-Type", "application/json");
    return headers;
  }

  ngOnInit() {
    if (location.hash !== "") {
      this.load(location.hash.substr(1));
    }
    
    this.nav.element.addEventListener('postpop', function(e) {
      console.log((e.enterPage.attributes.item(1)))
      //location.hash = e.enterPage.name
    });
  }

  open() {
    this.side.element.open();
  }

  load(name, opts) {
    if (this.pages.hasOwnProperty(name)) {
      console.log("OnsNavigator pages in the stack",this.nav.element.pages)
      // console.log("options",this.nav.element.topPage.pushedOptions)
      this.nav.element.pushPage(this.pages[name], opts)
      location.hash = name;

      // this.content.element.load(this.pages[name]);
      this.side.element.close();
    } else {
      console.error(`page ${name} not found`);
    }
  }
}
