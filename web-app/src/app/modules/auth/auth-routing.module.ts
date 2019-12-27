import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '../../shared/constants';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: SIGN_IN_ROUTE },
  { path: SIGN_IN_ROUTE, component: SignInComponent },
  { path: SIGN_UP_ROUTE, component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
