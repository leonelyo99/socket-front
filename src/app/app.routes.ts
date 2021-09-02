import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const ofRoutes: Routes = [
  { path: '', redirectTo: '/page', pathMatch: 'full' },
  { path: 'page', loadChildren: () => import('./page/page.module').then(m => m.PageModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ofRoutes,
    {
      useHash: false,
      preloadingStrategy: NoPreloading
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
