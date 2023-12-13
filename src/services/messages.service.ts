import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { IDialog, IMessage } from '../interfaces/message';

let socket: Socket;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private friend_id: number;
  public backend = 'https://localhost:3000';

  constructor(private http: HttpClient) {
    socket = io(this.backend);
  }

  messages_listener(handler: () => void)
  {
    socket.on("add_message_server", () => {
      handler();
    });
  }

  add_message(user_id: number, message: string) {
    socket.emit("add_message_client", {
      user_id: user_id,
      friend_id: this.friend_id,
      new_message: message
    })
  }

  set_friend_id(friend_id: number){
    this.friend_id = friend_id;
  }

  get_friend_id(){
    return this.friend_id;
  }

  get_user_messages(user_id: number): Observable<IDialog> {
    return this.http.get<IMessage>(this.backend + `/get_user_messages/${user_id}/${this.friend_id}`).pipe(
      map(
        (res: any) => {
          return res.messages;
        }
      )
    )
  }
}
