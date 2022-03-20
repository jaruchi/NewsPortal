import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Observable, Subject } from 'rxjs';

const HOST = 'http://localhost:8080';
const PATH = '/api/fav';

@Injectable({
  providedIn: 'root',
})
export class UserPreferenceService {
  _favs!: Subject<any[]>;

  constructor(
    private http: HttpClient,
    private socialAuthSvc: SocialAuthService
  ) {}

  getFavs(): Observable<any> {
    return this._favs;
  }

  public setUserFavs(): void {
    const url = `${HOST}${PATH}`;

    this.socialAuthSvc.authState.subscribe((user) => {
      user.email;
      this.http
        .get<any>(url + `/${user.email}-${user.provider}`)
        .subscribe((favs) => this._favs.next(favs));
    });
  }

  public likeArt(title: string): void {
    const url = `${HOST}${PATH}/like/${title}`;

    this.socialAuthSvc.authState.subscribe((user) => {
      user.email;
      this.http
        .get<any>(url + `?email=${user.email}-${user.provider}`)
        .subscribe();
    });
  }
}
