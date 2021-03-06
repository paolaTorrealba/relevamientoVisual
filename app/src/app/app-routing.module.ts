import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { CosasLindasComponent } from './componentes/cosas-lindas/cosas-lindas.component';
import { CosasFeasComponent } from './componentes/cosas-feas/cosas-feas.component';
import { GraficaComponent } from './componentes/grafica/grafica.component';
import { MisFotosComponent } from './componentes/mis-fotos/mis-fotos.component';  
import { CosasLindasListComponent } from './componentes/cosas-lindas-list/cosas-lindas-list.component';
import { CosasFeasListComponent } from './componentes/cosas-feas-list/cosas-feas-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  //{path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: 'cosasLindas', component: CosasLindasComponent },
  {path: 'cosasFeas', component: CosasFeasComponent },
  {path: 'cosasFeasList', component: CosasFeasListComponent },
  {path: 'cosasLindasList', component: CosasLindasListComponent },
  {path: 'misFotos', component: MisFotosComponent },
  {path: 'home/grafico', component: GraficaComponent },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
