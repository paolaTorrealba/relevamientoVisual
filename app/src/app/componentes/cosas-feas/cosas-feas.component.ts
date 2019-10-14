import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CamaraService } from '../../servicios/camara.service';
import * as firebase from "firebase";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.component.html',
  styleUrls: ['./cosas-feas.component.scss'],
})
export class CosasFeasComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  public firebase = firebase;
  public usuario;
  public sala;
  public fotos = [];
  public foto: string = "./assets/images/sinfoto.png";
  public fotosNoMeGusta=new Array(); 
  spinner: boolean = true;

  constructor(public router: Router,
    private  data:  AuthService,
    private camera: Camera, 
    private camService: CamaraService) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));  
    }

  ngOnInit() {}

  async abrirCamara() {
    let date = new Date();
    let imageName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;

    try {
      let options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      let result = await this.camera.getPicture(options);
      let image = `data:image/jpeg;base64,${result}`;
      let pictures = this.firebase.storage().ref(`megusta/${imageName}`);
     
      pictures.putString(image, "data_url").then(() => {
        pictures.getDownloadURL().then((url) => {
          this.foto = url;       
        });
      });    
      
    } catch (error) {
      alert(error);
    }
  }

  public  guardarFoto(){
    this.obtenerFotos();    
    this.usuario = JSON.parse(localStorage.getItem("usuario"));    
    if (this.foto!=""){
      let data= {
        "email":this.usuario.email,
        "img":this.foto,
        "id": this.fotosNoMeGusta.length+1,
        "votos":"0"
      }     
      this.data.guardarFotoNoMeGusta(data).then(res =>{  
      }).catch(error => {
           console.log(error,"error al guardar la imagen");   
         });
    }  else {
      console.log("No hay foto nueva");
    }
  
 }

 obtenerFotos() {
    this.fotosNoMeGusta;
    this.data.getListaNoMeGusta('nomegusta').subscribe(lista => {
        this.fotosNoMeGusta=lista;      
      });
}
  


  votar(imgRef){
    let referencia = imgRef.referencia;
    let child;
    let dbRefImg = this.firebase.database().ref(this.sala).child(referencia);
    let dbRefUser = this.firebase.database().ref("usuarios").child(this.usuario.email.replace(".", ""));
    let votos;

    dbRefUser.child('votos').once("value", (snapshot) => {
      child = snapshot.toJSON();     
    }).then(() => {
      
      var voto = false;
      for (var i in child) {
        if (i == referencia) {
          voto = child[i].voto;
          break;    
        }
      }

      if (!voto) {
        dbRefImg.once('value', function (snapshot) {
          votos = snapshot.toJSON();
        }).then(() => {
          dbRefImg.update({ votos: votos.votos + 1 }).then(() => {
            for (var i = this.fotos.length - 1; i >= 0; i--) {
              if(this.fotos[i].referencia == referencia)  {
                this.fotos[i].votos++;
                break;
              }
            }
            dbRefUser.child('votos').child(referencia).set({
              'voto': true
            });

          });
        })
      } else {        
        dbRefImg.once('value', function (snapshot) {
          votos = snapshot.toJSON();
        }).then(() => {
          dbRefImg.update({ votos: votos.votos - 1 }).then(() => {
            for (var i = this.fotos.length - 1; i >= 0; i--) {
              if(this.fotos[i].referencia == referencia) {
                this.fotos[i].votos--;
                break;
              }
            }
            dbRefUser.child('votos').child(referencia).set({
              'voto': false
            });
          });
        })
      }
    });
  }


  irACosasFeas(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
  	this.SeleccionDeTipoDeFoto.emit(false);
  	this.router.navigate(['/cosasFeas']);
    localStorage.setItem("sala", "noMeGusta");
  }

  irAInicio(){  
    this.router.navigate(['home']); 
  }

  irAMisFotos(){  
    this.router.navigate(['misFotos']); 
  }

  salir(){  
    this.router.navigate(['login']); 
  }

  irACosasLindas(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
  	this.SeleccionDeTipoDeFoto.emit(false);
  	this.router.navigate(['/cosasLindas']);
    localStorage.setItem("sala", "meGusta");
  }
}
