import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//
import { environment } from '../environments/environment';
import { LoginComponent } from './componentes/login/login.component';  
import { HomeComponent } from './componentes/home/home.component';  
import { CosasLindasComponent } from './componentes/cosas-lindas/cosas-lindas.component';  
import { CosasFeasComponent } from './componentes/cosas-feas/cosas-feas.component';  
import { MisFotosComponent } from './componentes/mis-fotos/mis-fotos.component';  
import { GraficaComponent } from './componentes/grafica/grafica.component';  
import { AuthProvider } from './providers/auth/auth';

import { AngularFireModule } from '@angular/fire'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashComponent } from './componentes/splash/splash.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { HttpClientModule } from '@angular/common/http'; 
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore"; 
import { CosasLindasListComponent } from './componentes/cosas-lindas-list/cosas-lindas-list.component';
import { CosasFeasListComponent } from './componentes/cosas-feas-list/cosas-feas-list.component';

/*

reducir tiempo de carga: https://blog.ng-classroom.com/blog/ionic2/ionic-page-and-lazy-loading/

generar splash e icon: https://blog.ng-classroom.com/blog/tips/preparando-iconos-splashscreen/
*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SplashComponent,
    CosasLindasComponent,
    CosasFeasComponent,
    MisFotosComponent,
    CosasFeasListComponent,
    CosasLindasListComponent,
    GraficaComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    Camera, DeviceMotion, 
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
