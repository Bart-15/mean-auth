import { Component, OnInit } from '@angular/core';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService  } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  username: string = "";
  password: string = "";
  showPassword: boolean = false;

  // Icons
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  // message
  message:string = " ";

  ngOnInit(): void {
    if(this.authService.checkLoggedIn()){
       this.router.navigateByUrl('/dashboard')
    }
  }


  // toggleShowpass
  onShowPass() {
    this.showPassword = !this.showPassword
  }

  onSubmit() {
    const data = {
      username: this.username,
      password: this.password
    }



    // validate all fields
    if(this.username == "" || this.password == ""){
      return this.message = "Check all fields."
    }

    this.authService.login(data).subscribe(
      res => {
        if(res.success) {
          this.authService.setUserData(res.token, res.user)
          this.router.navigateByUrl('dashboard');
        }
      },
      err => this.message = err.error.message
    )
    
  }
}
