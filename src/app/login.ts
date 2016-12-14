import {Component, Inject, Injectable, forwardRef, OnInit} from '@angular/core';
import {OnsSplitterContent} from 'angular2-onsenui';
import { Http, Headers } from '@angular/http';
import {MyApp} from './app';

import 'rxjs/add/operator/toPromise';

export class User {
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:3000/api/v1/tokens.json';

  constructor (private http: Http) {}
  

  login(user, app): Promise<User> {

    let headers = new Headers();
    headers.append("USER-NAME", user.username);
    headers.append("DEVICE-ID", "api-console-aaron.swensen");
    headers.append("Content-Type", "application/json");

    return this.http.post(this.userUrl, {username: user.username, password: user.password}, {headers: headers})
           .toPromise()
           .then(function(response) {
           		localStorage.setItem("user", JSON.stringify(response.json().user as User));
           		console.log(app.nav.element.popPage())
           		// app.load(app.nav.element.topPage)
           	}.bind(this))
           .catch(this.handleError);
    
  }

  logout() {
  	localStorage.removeItem("user");
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}

@Component({
  selector: 'ons-page[login]',
  template: require('./login.html'),
  providers: [UserService],
})
export class LoginPage implements OnInit{
  user: User;
  
  constructor(@Inject(forwardRef(() => MyApp)) private app : MyApp, private userService: UserService) {}

  ngOnInit() {}


  login(user) {
    this.userService.login(user, this.app).then(user => this.user = user);
    // setTimeout(function() {location.reload()}, 50);
  }
}