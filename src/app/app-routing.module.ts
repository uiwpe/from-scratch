import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'simon',
    pathMatch: 'full'
  },
  {
    path: 'simon',
    loadChildren: () => import('./simon/simon.module').then(m => m.SimonModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
