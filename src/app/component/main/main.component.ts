import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/model/model';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  news$!: Observable<News[]>;
  constructor(private newsSvc: NewsService) {}

  ngOnInit(): void {
    this.news$ = this.newsSvc.getNews();
  }
}
