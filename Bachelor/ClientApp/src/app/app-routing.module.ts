import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './signUp/signup.component';
import { HomeComponent } from './home/home.component';
import { CommunitiesComponent } from './Communities/communities.component';
import { LogInComponent } from './logIn/logIn.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signUp',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'community',
    component: CommunitiesComponent
  },
  {
    path: 'logIn',
    component: LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
