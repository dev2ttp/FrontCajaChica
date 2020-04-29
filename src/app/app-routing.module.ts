import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { PagoComponent } from './components/pago/pago.component';
import { PagoEfectivoComponent } from './components/pago-efectivo/pago-efectivo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent }, // canActivate: [AuthGuard]ç
  { path: '', component: PagoComponent},
  { path: 'efectivo', component: PagoEfectivoComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
