
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
    private notificationService: NotificationService
  ) { 
   
    this.sala ='noMeGusta'
    this.imagenes = new Array<object>();
  }

  async cargarFoto(imgName) {
    if (this.dispositivo=="web"){
      let imgUrl = await this.getImageByName('feas', 'mesa1.jpg');
      this.imagenes.push({ "nombre": "mesa1.jpg", "url": imgUrl });
                                                          
    }else // si es mobile
    { 
      let imgUrl = await this.getImageByName('feas', imgName);
      this.imagenes.push({ "url": imgUrl, "nombre": imgName });
    }
  }

  async takePhoto(tipo){        
      let imgName = `${this.sala}-${Date.now()}`;
      await this.takeFoto(this.sala, imgName);
      this.cargarFoto(imgName); 
  }

  async takeFoto(collection, imageName):Promise<string> {
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
        let pictures = firebase.storage().ref(`${'feas'}/${imageName}`);
        //tomo url de foto en Firebase Storage
        pictures.putString(image, "data_url").then(() => {
          pictures.getDownloadURL().then((url) => {
            // alert("Foto guardada con éxito: " + url );
            resolve(url);
          });  
        });
  
      } catch (error) {
        alert(error);
        reject(error)
      }

    })
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