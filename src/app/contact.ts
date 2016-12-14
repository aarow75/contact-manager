import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {MyApp} from './app';

import 'rxjs/add/operator/toPromise';


export class Contact {
  
}

@Injectable()
export class ContactService {

  constructor (private http: Http) {}

  getContact(id, app): Promise<Contact> {
    return this.http.get('http://localhost:3000/crm/contacts/' + id + '.json', {headers: app.headers()})
           .toPromise()
           .then(response => response.json().contact as Contact)
           .catch(this.handleError);
    
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
    // return Promise.resolve(CONTACT_GROUPS);
  }
  
}

@Component({
  selector: 'ons-page[contact]',
  template: require('./contact.html'),
  providers: [ContactService],
})
export class ContactPage implements OnInit{
  contact: Contact = {};
  
  constructor(@Inject(forwardRef(() => MyApp)) private app : MyApp, private contactService: ContactService) {}

  ngOnInit() {
    var qs = location.search.match(/contact_id/);
    console.log(qs)
    if(qs) {
      var id = (qs["input"].split("="))[1];
      this.getContact(id);
    } else {
      this.getContact(this.app.nav.element.topPage.pushedOptions.contact_id);
    }
    
  }

  getContact(id) {
    this.contactService.getContact(id, this.app).then(contact => this.contact = contact);
  }
}