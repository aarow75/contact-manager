import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {MyApp} from './app';

import 'rxjs/add/operator/toPromise';

export class ContactGroup {
  id: number;
  category_name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  url: string;
  contacts_count: number;
}

@Injectable()
export class ContactGroupService {
  private contactGroupsUrl = 'http://localhost:3000/crm/contact_categories.json';

  // constructor (private http: Http) {}
  
  constructor(private http: Http) {}

  getContactGroups(app): Promise<ContactGroup[]> {
    return this.http.get(this.contactGroupsUrl, {headers: app.headers()})
           .toPromise()
           .then(response => response.json().contact_categories as ContactGroup[])
           .catch(this.handleError);
    
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
    // return Promise.resolve(CONTACT_GROUPS);
  }
  
}

@Component({
  selector: 'ons-page[groups]',
  template: require('./groups.html'),
  providers: [ContactGroupService]
})
export class GroupsPage implements OnInit{
  groups: ContactGroup[] = [];
  
  constructor(@Inject(forwardRef(() => MyApp)) private app : MyApp, private contactGroupService: ContactGroupService) {}
  
  ngOnInit() {
    this.getContactGroups();
  }
  
  getContactGroups() {
    this.contactGroupService.getContactGroups(this.app).then(groups => this.groups = groups);
  }
}