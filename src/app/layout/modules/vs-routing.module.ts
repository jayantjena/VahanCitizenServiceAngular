import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VsComponent } from './vs.component'; 
import { OnlineServiceListComponent } from 'src/app/shared/menu-service-component/onlinesrvlist/online-service-list/online-service-list.component';
export const routes: Routes = [
  {
      path: '', component: VsComponent,
      children: [
        { path: 'vahan', loadChildren:()=>import('./homepage/homepage.module').then(m=>m.HomepageModule), data: { reuse: false }},
        { path: 'rcservice', loadChildren:()=>import('./rc-related-services/rc-related.module').then(m=>m.RcRelatedModule), data: { reuse: false }},
        { path: 'cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule), data: { reuse: false }},
        // { path: 'reprintrc', loadChildren:()=>import('./reprintreceipt/reprintreceipt.module').then(m=>m.ReprintreceiptModule), data: { reuse: false }, canLoad: [AuthGuard]},
        { path: '', redirectTo: '/vs', pathMatch: 'full' },
        { path: 'online-service-list', component: OnlineServiceListComponent, data: { reuse: false }},

    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VsRoutingModule { }
