import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CamaraService } from '../../servicios/camara.service';
import * as firebase from "firebase";
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth/auth';


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
  public fotosLindas=new Array(); 
  public fotosMias= new Array();
  spinner: boolean = true;
  public email:string;

  constructor(public router: Router,private  data:  AuthService,
              private camera: Camera, private auth: AuthProvider,
              private camService: CamaraService) { 

          this.sala = localStorage.getItem("sala");      
          this.usuario = JSON.stringify(localStorage.getItem('usuario'));
          this.email = localStorage.getItem("email");
          this.obtenerFotosLindas();   
  }

  ngOnInit() { }

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
        });
      });    
      
    } catch (error) {
      alert(error);
    }
  }
  
 public  guardarFoto(){
  console.log("longitud lista Lindas: ",this.fotosLindas.length)
  this.usuario = JSON.parse(localStorage.getItem("usuario"));
  if (this.foto!=""){
    let data= {
      "email":this.usuario.email,
      "img":this.foto,
      "votos":0,
      "nrofoto": this.fotosLindas.length +1
    }
    console.log("item guardado:", data);
    this.auth.guardarFotoMeGusta(data).then(res =>{  
    }).catch(error => {
         console.log(error,"error al guardar el producto");   
       });
  }  else {
    console.log("no hay foto nueva");
  }
  }

  obtenerFotosLindas() {
     this.data.getListaMeGusta("megustas").subscribe(lista => {
        this.fotosLindas=lista;      
     });
     console.log("Fotos Lindas: ",this.fotosLindas); 
  }

  limpiarListas(){
    console.log("limpiar");
    this.fotosMias= new Array();
    this.fotosLindas= new Array();
    this.fotosLindas= new Array();
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
