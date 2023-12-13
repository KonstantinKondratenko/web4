import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: IUser;
  public isAuth = false;
  public backend = 'https://localhost:3000';
  public users: IUser[];

  constructor(
		private http: HttpClient,
		private router: Router
	) {};

  login(email: string, password: string){
    this.http.get(this.backend + '/get_users').subscribe((data: any) => {
      this.users = data.users_table;
      this.http.post(this.backend + '/auth', {email: email, password: password}).subscribe(
        (res: any) => {
          if(res.accepted)
          {
            this.isAuth = true;
            sessionStorage.setItem('user', JSON.stringify(res.user));
            this.user = res.user;
            this.router.navigate(['profile']);
          }
          else
          {
            alert(res.reason);
          }
        }
      )
    })
  }
  
  go_to_registration(){
    this.router.navigate(["registration"]);
  }

  go_to_login(){
    this.router.navigate([""]);
  }

  create_account(account_info: any){
    this.http.post(this.backend + '/create_account', {account_info: account_info}).subscribe((res: any) => {
      this.isAuth = true;
      sessionStorage.setItem('user', JSON.stringify(res.user));
      this.user = res.user;
      this.router.navigate(['profile']);
    })
  }

  logout(){
    this.isAuth = false;
    sessionStorage.removeItem('user');
    this.router.navigate([""]);
  }

}
