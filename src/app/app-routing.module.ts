import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'main',
  //   component: MainComponent,
  //   canActivate: [AuthGuardService],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
