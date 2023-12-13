import { Component, OnInit } from '@angular/core';
import { INews } from '../../interfaces/news';
import { IUser } from '../../interfaces/user';
import { NewsService } from '../../services/news.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  new_post: string;
  user: IUser;
  friend_news: INews[];
  user_news: INews[];

  constructor(
    public UserService: UserService,
    public NewsService: NewsService
  ) {};

  ngOnInit(): void {
    this.user = this.UserService.get_current_user();
    this.NewsService.news_listener(() => this.display_component());
    this.display_component();
  }

  display_component() {
    this.NewsService.get_user_news(this.user.id).subscribe((news: INews[]) => {
      if(news)
      {
        this.user_news = news;
      }
    })

    this.NewsService.get_friends_news(this.user.id).subscribe((news: INews[]) => {
      if(news)
      {
        this.friend_news = news;
      }
    })
  }

  add_news() {
    if(this.new_post){
    this.NewsService.add_news(this.user.id, this.new_post);
    }
    else {
      alert('Новость не может быть пустой');
    }
  }
}
