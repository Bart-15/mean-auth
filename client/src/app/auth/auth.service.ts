import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs'
import { CookieService } from 'ngx-cookie-service';


const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
    ) { }

    private baseUrl =  "http://localhost:8080"


  // Set the http headers if there's token in cookie
  public isAuthenticated():boolean {
    const token = this.cookieService.get('token'); 
    return !this.jwtHelper.isTokenExpired(token);
  }


  //  Check the if already authenticated
   checkLoggedIn() : boolean {
    if(this.isAuthenticated()){
      return true;
    } else {
      return false;
    }
  }
  

  // Create new user
  createNewUser(data:Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data, httpOptions)
  }
  

  // Login logic
  login(data:Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, httpOptions)
  }
  

  // Set token and other stuff
  setUserData(token:string, user:any){
    const {_id, username, name, email} = user;
    this.cookieService.set('token', token);
    this.cookieService.set('_id', _id)
    this.cookieService.set('name', name)
    this.cookieService.set('user', username)
    this.cookieService.set('email', email)
    console.log(user)
  }


  // User logout
  logout() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('')
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`)
  }
}
