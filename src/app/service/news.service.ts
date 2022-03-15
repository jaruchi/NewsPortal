import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  News,
  Source,
  SourcesResponse,
  TopHeadlinesResponse,
} from '../model/model';
import { Observable, Subject } from 'rxjs';

const APIKey: string = 'f440a86686de4385bcc6adfd9f87c466';
const HOST = `https://newsapi.org`;
const PATH = '/v2';
const API = {
  TOP_HEADLINES: '/top-headlines',
  SOURCES: '/sources',
};

const cache: { [key: string]: TopHeadlinesResponse | SourcesResponse } = {};

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  _news!: Subject<News[]>;
  _country!: string;
  _source!: string;
  _sources!: Subject<Source[]>;
  _countries!: Subject<string[]>;

  constructor(private http: HttpClient) {
    this._news = new Subject<News[]>();
    this._country = 'us';
    this._source = '';
    this._sources = new Subject<Source[]>();
    this._countries = new Subject<string[]>();
    this.setCountries();
    this.setCountry();
  }

  getNews(): Observable<News[]> {
    return this._news;
  }

  getSources(): Observable<Source[]> {
    return this._sources;
  }

  getCountries(): Observable<string[]> {
    return this._countries;
  }

  setCountry(country: string = 'us') {
    this._country = country;
    this._source = '';
    this.setNews(country);
    this.setSources(country);
  }

  setSource(source: string) {
    source = source === '_all' ? '' : source;
    this._source = source;
    this.setNews('', source);
  }

  private setNews(country: string = 'us', source: string = ''): void {
    const url = `${HOST}${PATH}${API.TOP_HEADLINES}?language=en${
      source ? '&sources=' + source : '&country=' + country
    }&apiKey=${APIKey}`;

    if (cache[url]) {
      this._news.next((cache[url] as TopHeadlinesResponse).articles);
      return;
    }
    this.http.get<TopHeadlinesResponse>(url).subscribe((news) => {
      cache[url] = news;
      this._news.next(news.articles);
    });
  }

  private setSources(country: string = 'us'): void {
    const all: Source = {
      id: '_all',
      name: 'All',
      description:
        'You will see news from all the different sources based on priorities',
      country: country,
    };
    this.http
      .get<SourcesResponse>(
        `${HOST}${PATH}${API.SOURCES}?language=en&country=${country}&apiKey=${APIKey}`
      )
      .subscribe((resp) => this._sources.next([all, ...resp.sources]));
  }

  private setCountries(): void {
    this.http
      .get<SourcesResponse>(
        `${HOST}${PATH}${API.SOURCES}?language=en&apiKey=${APIKey}`
      )
      .subscribe((resp) => {
        const countriesFromSources = (resp.sources || []).map((s) => s.country);
        const countries = new Set<string>(countriesFromSources);
        this._countries.next([...countries]);
      });
  }

  getUserSources(): Source[] {
    // if no sources configured by use return first 25
    return [];
  }
}
