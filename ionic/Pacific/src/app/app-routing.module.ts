import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then(m => m.CatalogoPageModule)
  },
  {
    path: 'reserva/:id',
    loadChildren: () => import('./pages/reserva/reserva.module').then(m => m.ReservaPageModule)
  },
  {
    path: 'mis-reservas',
    loadChildren: () => import('./pages/mis-reservas/mis-reservas.module').then(m => m.MisReservasPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  { path: '**', redirectTo: 'login' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
