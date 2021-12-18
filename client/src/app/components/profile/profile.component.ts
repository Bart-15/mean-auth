import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user:any;

  ngOnInit(): void {
    this.fetchProfile()
  }

  fetchProfile() {
    this.authService.getProfile().subscribe(res => {
      this.user = res;
    })
  }
}
