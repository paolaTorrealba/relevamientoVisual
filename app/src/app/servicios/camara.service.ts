import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from "firebase";
import "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  public firebase = firebase;
  public config;
  public usuario;

  constructor(private storage: AngularFireStorage) {

  }

  //storageRef = storage().ref('files');

  public subir(nombreArchivo: string, file: any){
  	
  }

  

}
