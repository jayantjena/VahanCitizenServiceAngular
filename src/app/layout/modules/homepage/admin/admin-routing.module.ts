import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './login/auth/auth.guard';
import { UserInfoComponent } from './user-info/user-info.component';
 
const routes: Routes = [
  { path: '', component: AdminComponent,
  children: [
   
   
    { path:'user-info', component:UserInfoComponent,pathMatch:'full',canActivate:[AuthGuard]},
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
