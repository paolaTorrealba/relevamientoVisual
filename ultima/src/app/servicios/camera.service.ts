
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import * as firebase from 'firebase/app';
import * as firebase from "firebase";
import { File } from "@ionic-native/file/ngx";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationService } from './notification.service';
import { General } from '../general';
import { Elemento } from '../clases/elemento';
@Injectable({
  providedIn: 'root'
})
export class CameraService {
  currentImage: any;
  imageURL
  public sala;
  private dispositivo="mobile";//cambiar para probar en web

  private imagenes: Array<any>;
  
  public firebase = firebase;
  constructor(
    private camera: Camera, 
    private file: File,
    private localNotifications: LocalNotifications,
    private toastController: ToastController,
    private afs: AngularFirestore,
    private general: General,
    private afsAuth: AngularFireAuth,   
    private notificationService: NotificationService,

  ) { 
   
    // this.sala ='feas'
    this.imagenes = new Array<object>();

    // generar el registro a guardar en dabatase

  }

  async cargarFotoFea(imgName) {
    if (this.dispositivo=="web"){
      let imgUrl = await this.getImageByName('feas', 'mesa1.jpg');
      this.imagenes.push({ "nombre": "mesa1.jpg", "url": imgUrl });
    }else 
    { 
      let imgUrl = await this.getImageByName('feas', imgName);
      this.imagenes.push({ "url": imgUrl, "nombre": imgName });
    }
  }

  async cargarFotoLinda(imgName) {
    if (this.dispositivo=="web"){
      let imgUrl = await this.getImageByName('lindas', 'mesa1.jpg');
      this.imagenes.push({ "nombre": "mesa1.jpg", "url": imgUrl });
    }else 
    { 
      let imgUrl = await this.getImageByName('lindas', imgName);
      this.imagenes.push({ "url": imgUrl, "nombre": imgName });
    }
  }

  //primera llamada desde el componente
  async takePhotoLinda(tipo){    
     console.log("takePhotoLinda, tipo")    
    let imgName = `${tipo}-${Date.now()}`;
    await this.takeFotos('lindas', imgName);
    this.cargarFotoLinda(imgName); 
    // let pictures = firebase.storage().ref(`${'lindas'}/${imgName}`);
    // console.log("las fotos: ",pictures)
    // this.guardarConUsuario(tipo,pictures);
}
//primera llamada desde el componente
  async takePhotoFea(tipo){        
      let imgName = `${this.sala}-${Date.now()}`;
      await this.takeFotos('feas', imgName);
      this.cargarFotoFea(imgName); 
      // console.log("las fotos: ",this.imagenes)
      // this.guardarConUsuario(tipo,this.imagenes);
  }
//segunda llamada local
  async takeFotos(collection, imageName):Promise<string> {
    console.log("takeFoto, aca tomo la foto")
    let options: CameraOptions = {
      quality: 80,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE
    };
    return new Promise(async (resolve, reject) => {
      
      try {
        let result = await this.camera.getPicture(options);
        let image = `data:image/jpeg;base64,${result}`;
        //guardo en Firebase Storage
        let pictures = firebase.storage().ref(`${collection}/${imageName}`);
        //tomo url de foto en Firebase Storage
        pictures.putString(image, "data_url").then(() => {
          pictures.getDownloadURL().then((url) => {
            alert("Foto guardada con éxito: " + url );
            resolve(url);
          });  
        });
  
        this.guardarConUsuario(collection,pictures);
      } catch (error) {
        alert(error);
        reject(error)
      }

    })
  }

  guardarConUsuario(tipo,item){
    console.log("guardo foto con datos", item, item[0].url)
    let foto = new Elemento();
    foto.email = this.getCurrentUser().email;
    foto.img= item[0].url;
    foto.votos =0;
    // foto.nombre=this.getCurrentUser().nombre;
    foto.votosusuario=[];
    foto.date= new Date();

    this.saveFoto(tipo,foto);
   
  }
  saveFoto(tipo, item) {  
    console.log(item, item.url) 
    return this.afs.collection(tipo).add(Object.assign({}, item));
  }
  getImageByName(collection, imageName) {
    console.log(firebase.storage().ref(`${collection}/${imageName}`).getDownloadURL())
    return firebase.storage().ref(`${collection}/${imageName}`).getDownloadURL();
  }

  getAllImages(type){
    console.log("getAllImages",type)
    return new Promise((resolve, reject) => {
      resolve(firebase.storage().ref("images").child(type).listAll());
    })
  }

  setDocument(collection:string, id:string, object:object): void {
    console.log("setDoc ",collection, id, object)
    this.afs.collection(collection).doc(id).set(object);
  }

  getOnce(collection, id){
    return this.afs.collection(collection).doc(id).get().toPromise();
  }

  getCurrentUser(){
    return this.afsAuth.auth.currentUser;
  }

  getObservableFromDocument(collection, id){
    return this.afs.collection(collection).doc(id).valueChanges();
  }

}