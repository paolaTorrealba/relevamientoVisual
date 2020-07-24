import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CameraService } from 'src/app/servicios/camera.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { General } from 'src/app/general';
import { ListaImagenesService } from 'src/app/servicios/lista-imagenes.service';

@Component({
  selector: 'app-galeria-lindas',
  templateUrl: './galeria-lindas.page.html',
  styleUrls: ['./galeria-lindas.page.scss'],
})
export class GaleriaLindasPage implements OnInit {
  images: Array<object>;
  public listaImagenes: any =  [];

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private cameraService:CameraService, 
    private navCtrl: NavController,
    private general: General,
    private toastController: ToastController,
    private loadingController: LoadingController,
    public listaImagenesService: ListaImagenesService,
  ) {  
  }

  ngOnInit() {  
  
  }

  ngOnChanges() {
    this.getAllImages()
  }

  getAllImages(){
    this.presentLoading();
    this.listaImagenesService.getListaImagenesLindas().subscribe(listaImagenes => {
           this.listaImagenes=listaImagenes;
           console.log("lista", this.listaImagenes)
    })

  }

 
  vote(option){
    console.log("votar")
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top",
      color: color
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Espere un momento..."
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  private goToHome() {
    this.navCtrl.navigateRoot("/home");
  }
}
