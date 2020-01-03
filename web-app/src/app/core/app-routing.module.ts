import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTE, TASKS_ROUTE } from '../shared/constants';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: TASKS_ROUTE },
  { path: TASKS_ROUTE, loadChildren: () => import('../modules/tasks/tasks.module').then(m => m.TasksModule) },
  { path: AUTH_ROUTE, loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
