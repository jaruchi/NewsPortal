import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/model/model';
import { NewsService } from 'src/app/service/news.service';
import * as moment from 'moment';
import { UserPreferenceService } from 'src/app/service/user-preference.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  news$!: Observable<News[]>;
  constructor(
    private newsSvc: NewsService,
    private prefSvc: UserPreferenceService
  ) {}

  ngOnInit(): void {
    this.news$ = this.newsSvc.getNews();
  }

  get favs(): Observable<any[]> {
    return this.prefSvc.getFavs();
  }
  //2022-03-19T20:41:21Z
  format(day?: any): string {
    return moment(day).format('MMM-DD-YYYY');
  }

  isUsersFav(favs: any[], title: string): boolean {
    return favs.find((f) => f.likedart === title);
  }

  likeArt(t: string): void {
    this.prefSvc.likeArt(t);
  }
}
