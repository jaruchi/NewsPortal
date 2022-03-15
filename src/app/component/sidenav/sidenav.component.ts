import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { Observable, Subject } from 'rxjs';
import { Source } from 'src/app/model/model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  sources$!: Observable<Source[]>;
  countries$!: Observable<string[]>;
  curSource: string = '';
  curCountry: string = 'us';
  constructor(private newsSvc: NewsService) {}

  ngOnInit(): void {
    this.sources$ = this.newsSvc.getSources();
    this.countries$ = this.newsSvc.getCountries();
  }
  setCountry(event: any) {
    this.curSource = '_all';
    this.curCountry = event.value;
    this.newsSvc.setCountry(event.value);
  }
  setSource(event: any): void {
    this.curSource = event.option.value;
    this.newsSvc.setSource(event.option.value);
  }
}
