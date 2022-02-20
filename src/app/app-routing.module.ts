import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'update/:id', component:UpdateComponent},
  {path:'update', component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
