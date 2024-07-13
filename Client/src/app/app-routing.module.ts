import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/home/home.component';
import { LoginComponent } from 'src/user/login/login.component';
import { RegisterComponent } from 'src/user/register/register.component';
import { UserComponent } from 'src/user/user.component';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path:'home', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
