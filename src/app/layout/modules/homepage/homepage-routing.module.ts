import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
 
import { HomepageComponent } from './homepage.component';
import { SessionExpireComponent } from 'src/app/shared/message.config/session-expire/session-expire.component';
 
 

const routes: Routes = [
  
  { path : '', component : HomepageComponent,
  children: [
    // { path : '', component : VsHomeComponent, data: { reuse: false }},
  { path: 'admin', loadChildren: ()=> import('./admin/admin.module').then(m=>m.AdminModule), data: { reuse: false }}, 
   ]},
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
