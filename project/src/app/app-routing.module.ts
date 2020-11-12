import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { InfoComponent } from './info/info.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BarChartComponent } from './grafics/bar-chart/bar-chart.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'mainpage', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ViewProfileComponent, canActivate: [AuthGuard] },
  { path: 'info/:id', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: AdminDashboardComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'card', component: CardComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: "**",redirectTo:"/main"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
