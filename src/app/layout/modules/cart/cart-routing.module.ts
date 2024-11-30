import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component'; 
import { CartLoginComponent } from './cart-login/cart-login.component';
import { CartRegistrationComponent } from './cart-registration/cart-registration.component';
 
 
const routes: Routes = [
  { path: '', component: CartComponent,
    children: [
        
      { path:'cart-login', component:CartLoginComponent, data: { reuse: false }},
      { path:'cart-registration', component: CartRegistrationComponent, data: { reuse: false }},
        // { path:'', component:TransferOfOwnershipDetailComponent},
        // { path:'', component:DuplicateRcComponent},
        // { path:'', component:ChangeAddressComponent},
        // { path:'', component:HypothecationTerminationComponent},
        // { path:'', component:HypothecationAdditionComponent},
        // { path:'', component:InsuranceDetailsComponent},
        // {path:'', component:FeePanelComponent}
        // { path: '', redirectTo: '/rcrs', pathMatch: 'full' },
        
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
