import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {ValidateService} from '../../services/validate.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() isOnSubmit :  EventEmitter<any> = new EventEmitter();
  
  name : string = ""; 
  email : string = ""; 
  username : string = ""; 
  password : string = ""; 

  message : string = "";

  constructor(
    private validateService: ValidateService,
    private authService: AuthService, 
    private router: Router) { 
  }
  
  ngOnInit(): void {
    if(this.authService.checkLoggedIn()){
      this.router.navigateByUrl('/dashboard')
    }
  }
  
    


  onSubmit() {
      const newUser = {
        name:this.name,
        username:this.username,
        email:this.email,
        password:this.password
      }

      // check all the fields
      if(this.name == "" || this.email == "" || this.password == "" || this.username == "") {
        return this.message = "Check all the fields."
        
      }

      // check email if valid.
      if(!this.validateService.validateEmail(this.email)) {
        return this.message = "Please enter a valid email address"
      }
  

      // final step
      this.authService.createNewUser(newUser).subscribe(
          res => {
            if(res.success) {
              this.message = "";
              this.router.navigateByUrl('login');
            }
          },
          err => {
            this.message = err.error.username;
            console.log(this.message);
          },
          () => console.log('success')
        )
      }

}
