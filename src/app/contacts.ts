import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {MyApp} from './app';

import 'rxjs/add/operator/toPromise';


export class Contact {
  
}

@Injectable()
export class ContactsService {
  private contactsUrl = 'http://localhost:3000/crm/contacts.json?per=100';

  constructor (private http: Http) {}
  

  getContacts(id, app): Promise<Contact[]> { 
    return this.http.get((this.contactsUrl + '&cat_id=' + id), {headers: app.headers()})
           .toPromise()
           .then(response => response.json().contacts as Contact[])
           .catch(this.handleError);
    
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
    // return Promise.resolve(CONTACT_GROUPS);
  }
  
}

@Component({
  selector: 'ons-page[contacts]',
  template: require('./contacts.html'),
  providers: [ContactsService],
})
export class ContactsPage implements OnInit{
  contacts: Contact[] = [];

  constructor(@Inject(forwardRef(() => MyApp)) private app : MyApp, private contactsService: ContactsService) {}

  ngOnInit() {
    var qs = location.search.match(/group_id/);
    console.log(qs)
    if(qs) {
      var id = (qs["input"].split("="))[1];
      this.getContacts(id);
    } else {
      this.getContacts(this.app.nav.element.topPage.pushedOptions.group_id);
    }
  }

  getContacts(id) {
    this.contactsService.getContacts(id, this.app).then(contacts => this.contacts = contacts);
  }
}