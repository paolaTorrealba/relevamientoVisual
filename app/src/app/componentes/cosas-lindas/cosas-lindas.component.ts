import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CamaraService } from '../../servicios/camara.service';
import * as firebase from "firebase";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.component.html',
  styleUrls: ['./cosas-lindas.component.scss'],
})
export class CosasLindasComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;
  
  public firebase = firebase;
  public usuario;
  public sala;
  public fotos = [];
  public foto: string = "./assets/images/sinfoto.png";
  public fotosMeGusta=new Array(); 
  spinner: boolean = true;

  constructor(public router: Router,
    private  data:  AuthService,
    private camera: Camera, 
    private camService: CamaraService) { 

    console.log("parseo el usuario");
    this.sala = localStorage.getItem("sala");
    console.log(this.sala);
    this.usuario = JSON.stringify(localStorage.getItem('usuario'));
    console.log(this.usuario);   
  }

  ngOnInit() {
  	/*  console.log("inicio");
    //crear usuarios
    this.firebase.database().ref('users/admin@gmailcom').set({
      'correo': 'admin@gmail.com',
      'perfil': 'admin',
      'sexo': 'femenino'
    });*/  

  }

  async abrirCamara() {
    // this.foto="./assets/images/no.png";
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
          // let baseRef = this.firebase.database().ref(this.sala);
          // baseRef.push({ "email": this.usuario.email, "votos": 0 });
        });
      });    
      
    } catch (error) {
      alert(error);
    }
  }

  
 public  guardarFoto(){
  this.obtenerFotos();
  console.log("entre: ============");
  this.usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log("this.usuario.email:",this.usuario.email);
  console.log("this.fotosMeGusta:",this.fotosMeGusta);
  console.log("this.fotosMeGusta.length:",this.fotosMeGusta.length);
  console.log("this.foto:",this.foto);
  if (this.foto!=""){
    let data= {
      "email":this.usuario.email,
      "img":this.foto,
      "id": this.fotosMeGusta.length+1,
      "votos":"0"
    }
    console.log("data:",data);
    this.data.guardarFotoMeGusta(data).then(res =>{  
    }).catch(error => {
         console.log(error,"error al guardar el producto");   
       });
  }  else {
    console.log("no hay foto nueva");
  }

  }

  obtenerFotos() {
    console.log("obtener fotos:");
    
    this.fotosMeGusta;
    this.data.getListaMeGusta('megusta').subscribe(lista => {
        this.fotosMeGusta=lista;
        console.log("fotos:",this.fotosMeGusta);
      });

   console.log("termino");



    // let votos;
    // this.firebase.database().ref(this.sala)
    // .once("value", (snap) => {

    //   let data = snap.val();
    //   this.fotos = [];
    //   let contador = 0;
    //   console.log("data:");
    //   console.log(data)
    //   for (let item in data) {

    //     this.fotos.push(data[item]);
    //     this.fotos[contador].referencia = item
    //     contador++;
    //   }
    //   console.log(this.fotos);
    //   this.fotos.reverse();
    //   console.log(this.fotos);
    //   this.spinner = false;
    //   localStorage.setItem('grafica', 'texxto');
    //   var element = <HTMLInputElement> document.getElementById('btn-grafico');
    //   element.classList.remove('ocultar');
    // });
  }



  votar(imgRef){
    let referencia = imgRef.referencia;
    let child;
    let dbRefImg = this.firebase.database().ref(this.sala).child(referencia);
    let dbRefUser = this.firebase.database().ref("usuarios").child(this.usuario.email.replace(".", ""));
    let votos;

    dbRefUser.child('votos').once("value", (snapshot) => {

      child = snapshot.toJSON();
      //console.log(child);
    }).then(() => {
      
      var voto = false;
      for (var i in child) {
        if (i == referencia) {
          voto = child[i].voto;
          break;
          //console.log(child[i].voto);
        }
      }

      if (!voto) {

        dbRefImg.once('value', function (snapshot) {

          votos = snapshot.toJSON();
          //console.log(votos);

        }).then(() => {
          dbRefImg.update({ votos: votos.votos + 1 }).then(() => {
            for (var i = this.fotos.length - 1; i >= 0; i--) {
              if(this.fotos[i].referencia == referencia)
              {
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
        //console.log("Esa imagen ya la has votado...");
        dbRefImg.once('value', function (snapshot) {

          votos = snapshot.toJSON();
          //console.log(votos);

        }).then(() => {
          dbRefImg.update({ votos: votos.votos - 1 }).then(() => {
            for (var i = this.fotos.length - 1; i >= 0; i--) {
              if(this.fotos[i].referencia == referencia)
              {
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

  
  irAFotosMiasList(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
    this.SeleccionDeTipoDeFoto.emit(true);  
  	this.router.navigate(['/misFotos']);
    localStorage.setItem("sala", "mias");
  }

  irACosasFeasList(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
    this.SeleccionDeTipoDeFoto.emit(false);  
  	this.router.navigate(['/cosasFeasList']);
    localStorage.setItem("sala", "noMeGusta");
  }
  irACosasLindasList(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
    this.SeleccionDeTipoDeFoto.emit(true);  
  	this.router.navigate(['/cosasLindasList']);
    localStorage.setItem("sala", "meGusta");
  }

}
