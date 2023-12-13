import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  name = "";
  date = "";
  email = "";
  password = "";
  confirm_password = "";

  constructor(public AuthService: AuthService) {};

  ngOnInit(): void {  }

  create_account() {
    if(this.name && this.date && this.email && this.password && this.confirm_password &&
      this.password === this.confirm_password)
      {
        let account_info = {
          "name": this.name,
          "date": this.date,
          "email": this.email,
          "password": this.password
        }

        this.AuthService.create_account(account_info);
      }
    else {
      //console.log("Все поля должны быть заполнены!");
      alert('Все поля должны быть заполнены');
    }
  }
}
