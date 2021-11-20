import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { MainViewComponent } from './main-view/main-view.component';
import { DisplayDataComponent } from './main-view/pages/display-data/display-data.component';
import { FormComponent } from './main-view/pages/form/form.component';
import { HomeComponent } from './main-view/pages/home/home.component';
import { SearchDataComponent } from './main-view/pages/search-data/search-data.component';
import { SigninComponent } from './security/pages/signin/signin.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/main-view/home', pathMatch: 'full' },
  { path: 'main-view', redirectTo: '/main-view/home', pathMatch: 'full' },

  {
    path: 'main-view',
    component: MainViewComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate:[AuthGuard]}

    ]
  },
  {
    path: 'security',
    component: SecurityComponent,
    children: [
      { path: 'signin', component: SigninComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
