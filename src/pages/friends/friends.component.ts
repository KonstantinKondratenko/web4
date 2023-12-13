import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { MessagesService } from '../../services/messages.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{
  selected_friend_id: number;
  user: IUser;
  friends: IUser[];

  constructor(
    public UserService: UserService,
    public MessageService: MessagesService
  ) {};

  ngOnInit(): void {
      this.user = this.UserService.get_current_user();
      this.display_component();
  }

  display_component() {
    this.UserService.get_user_friends(this.user.id).subscribe((friends: IUser[]) => {
      if(friends)
      {
        this.friends = friends;
      }
    })
  }

  add_friend(){
    this.UserService.add_friend(this.user.id, this.selected_friend_id, () => {
      this.user = this.UserService.get_current_user();
      this.display_component();
    });
  }

  delete_friend(){
    this.UserService.delete_friend(this.user.id, this.selected_friend_id, () => {
      this.user = this.UserService.get_current_user();
      this.display_component();
    });
  }

  go_to_friend_chat(friend_id: number){
    this.MessageService.set_friend_id(friend_id);
    this.UserService.go_to_page('messages');
  }
}
