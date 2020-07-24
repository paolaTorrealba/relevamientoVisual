  
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { General } from 'src/app/general';
import { CameraService } from 'src/app/servicios/camera.service';


@Component({
  selector: 'app-lista-lindas',
  templateUrl: './lista-lindas.page.html',
  styleUrls: ['./lista-lindas.page.scss'],
})
export class ListaLindasPage implements OnInit {

  images: Array<object>;
  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private cameraService:CameraService, 
    private navCtrl: NavController, 
    private loadingController: LoadingController,
    private general: General,
  ) { }

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages(){
    this.presentLoading();
    this.images = new Array<object>()
    this.cameraService.getAllImages(this.general.type).then((images: firebase.storage.ListResult) => {
      images.items.forEach((image:firebase.storage.Reference) => {
        Promise.all([image.getDownloadURL(),this.cameraService.getOnce("images", image.name), 
        this.cameraService.getOnce("votos", image.name) ]).then(values => {
          if(values[1].get("usuario") == this.cameraService.getCurrentUser().email.split('@')[0]){
            this.images.push({"url": values[0], "name": image.name,
             "date":values[1].get("date"), 
             "usuario": values[1].get("usuario"),
             "votos":values[2].get("votos") || 0});
            this.images.sort((a:any,b:any) => (a.date > b.date) ? -1 : 1);
          }
        })
      })
    }).catch(() => {
      this.navCtrl.navigateRoot("login");
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Buscando imagenes"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}