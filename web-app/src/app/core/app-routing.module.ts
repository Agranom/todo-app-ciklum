import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTE } from '../shared/constants';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AUTH_ROUTE },
  { path: AUTH_ROUTE, loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
