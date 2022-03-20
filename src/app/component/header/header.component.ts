import { Component, OnInit } from '@angular/core';

import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedin: boolean = false;
  constructor(public socialAuthSvc: SocialAuthService) {}

  get authState() {
    return this.socialAuthSvc.authState;
  }

  async logOut() {
    await this.socialAuthSvc.signOut();
    this.loggedin = false;
  }

  loginWithGoogle(): void {
    this.socialAuthSvc.signIn(GoogleLoginProvider.PROVIDER_ID).then((e) => {
      this.loggedin = true;
    });
  }
  ngOnInit(): void {
    setTimeout(() => this.logOut(), 1500);
  }
}
