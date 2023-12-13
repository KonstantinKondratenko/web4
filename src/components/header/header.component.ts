import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin_panel_link = "https://localhost:3000/admin_panel";
  isAuth: boolean;
  isAdmin: boolean;

  constructor(public AuthService: AuthService){

  };

  check_admin(){
    let user = JSON.parse(sessionStorage.getItem('user')!);
    return (user && user.role == 'Администратор')
  }

  go_to_admin_panel(){
    location.href = this.admin_panel_link;
  }

  ngOnInit(){
    this.isAuth = JSON.parse(sessionStorage.getItem('user')!) ? true : false;
    this.isAdmin = this.isAuth && this.check_admin();
  }

  
}
