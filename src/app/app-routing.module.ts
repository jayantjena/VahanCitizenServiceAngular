import { VsModule } from './layout/modules/vs.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  { path: 'layout', loadChildren: ()=> import('./layout/layout.module').then(m=>m.LayoutModule)},
  { path: '', loadChildren:()=> import('./layout/layout.module').then(m=>m.LayoutModule)},
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
