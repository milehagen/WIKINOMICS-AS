import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './signUp/signup.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }