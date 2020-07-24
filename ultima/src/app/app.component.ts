import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root', 
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private splash= true;
  private notificationAudio= new Audio("../assets/sonidos/inicio.mp3")
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.splash){
setTimeout(() => {
  this.notificationAudio.play();
  setTimeout(()=> {
    this.pararAlarma();
    this.splash = false;
  }, 10650)
}, 300)
      }
    });
  }

  pararAlarma() {
    this.notificationAudio.pause();
    this.notificationAudio.currentTime = 0;
  }
}
