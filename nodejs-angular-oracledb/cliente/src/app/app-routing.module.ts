import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonComponent } from './json/json.component';
import { LandingComponent } from './landing/landing.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'landing', component: LandingComponent},
  {path:'', redirectTo: 'landing', pathMatch: 'full'},
  {path:'test', component: TestComponent},
  {path:'json', component: JsonComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
