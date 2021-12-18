import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import "bootstrap"
import "@popperjs/core"
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {HttpconfigInterceptor} from './inteceptor/httpconfig.interceptor'

import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';


const routes : Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path: "login",
    component:LoginComponent
  }, 
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]

  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpconfigInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
