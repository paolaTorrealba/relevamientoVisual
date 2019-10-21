import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CamaraService } from '../../servicios/camara.service';
import * as firebase from "firebase";
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AuthProvider } from 'src/app/providers/auth/auth';

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
  public fotosMias= new Array();
 fotosFeas;
  public fotosLindas= new Array();

  spinner: boolean = true;
  public email:string;



  constructor(public router: Router,
    private  data:  AuthService,
    private camera: Camera, 
    private auth: AuthProvider,
    private camService: CamaraService) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");
      console.log("this.usuario en constr",this.usuario);  
      console.log("email en constr",this.email);  
      console.log("sala en constr",this.sala); 
      // this.obtenerFotosMias();
      this.obtenerFotosFeas();
      console.log("================");
    }

  ngOnInit() {}

  async abrirCamara() {
    this.foto="./assets/images/ok.png";
    // let date = new Date();
    // let imageName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;

    // try {
    //   let options: CameraOptions = {
    //     quality: 50,
    //     targetHeight: 600,
    //     targetWidth: 600,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE
    //   };

    //   let result = await this.camera.getPicture(options);
    //   let image = `data:image/jpeg;base64,${result}`;
    //   let pictures = this.firebase.storage().ref(`megusta/${imageName}`);
     
    //   pictures.putString(image, "data_url").then(() => {
    //     pictures.getDownloadURL().then((url) => {
    //       this.foto = url;       
    //     });
    //   });    
      
    // } catch (error) {
    //   alert(error);
    // }
  }

  public  guardarFoto(){
    // this.obtenerFotos();    
    console.log("longitud",this.fotosFeas.length)
    this.usuario = JSON.parse(localStorage.getItem("usuario"));    
    if (this.foto!=""){
      let data= {
        "email":this.usuario.email,
        "img":this.foto,                
        "votos":0,
        "nrofoto": this.fotosFeas.length +1
      }     
      console.log("data del guardado", data);
      this.auth.guardarFotoNoMeGusta(data).then(res =>{
        }).catch(error => {
          console.log(error,"error al guardar la imagen"); 
      });
    }  else {
      console.log("No hay foto nueva");
    }


    //   this.data.guardarFotoNoMeGusta(data).then(res =>{  
    //   }).catch(error => {
    //        console.log(error,"error al guardar la imagen");   
    //      });
    // }  else {
    //   console.log("No hay foto nueva");
    // }
  
 }

 obtenerFotosMias() {
   console.log("las fotos antes :");

   console.log("feas: ",this.fotosFeas);
   console.log("lindas: ",this.fotosLindas);
   console.log("mias: ",this.fotosMias);

    this.obtenerFotosFeas();
    this.obtenerFotosLindas();
    console.log("las fotos despues:");
    console.log("feas: ",this.fotosFeas);
    console.log("lindas: ",this.fotosLindas);
    console.log("mias: ",this.fotosMias);

    // this.usuario = JSON.stringify(localStorage.getItem('usuario'));  
    console.log("this.usuario",this.usuario);
    console.log("email", this.email)

    for(let i=0;i<this.fotosFeas.length;i++){ 
      console.log("el mail de feas: ", this.fotosFeas[i].email)            
      if(this.fotosFeas[i].email === this.email) {   
        console.log("es true");  
        console.log("this.fotosFeas[i] ",this.fotosFeas[i]);  
        this.fotosMias.push(this.fotosFeas[i]);
      } 
    }  
    for(let i=0;i<this.fotosLindas.length;i++){ 
      console.log("el mail de lindas: ", this.fotosLindas[i].email)          
      if(this.fotosLindas[i].email === this.email) {     
        this.fotosMias.push(this.fotosLindas[i]);
      } 
    }  
    console.log("finally")
    console.log("feas: ",this.fotosFeas);
    console.log("lindas: ",this.fotosLindas);
    console.log("mias: ",this.fotosMias);
 } 

limpiarListas(){
  console.log("limpiar");
  this.fotosMias= new Array();
  this.fotosFeas= new Array();
  this.fotosLindas= new Array();
}

 obtenerFotosFeas() {
  // console.log("fotos feas list desde obtener de  feas 1",this.fotosFeas);
  // this.fotosFeas=new Array();
  // this.auth.getListaNoMeGusta().subscribe(lista => {
  //   this.fotosFeas=lista;
  // });

  // console.log("fotos feas list desde obtener de  feas 2",this.fotosFeas);

  // this.data.getListaNoMeGusta('nomegusta').subscribe(lista => {
  //       this.fotosFeas=lista;      
  //   });
  //   console.log("fotos feas list desde obtener de  feas 3",this.fotosFeas);
  // this.auth.getListaNoMeGusta().subscribe(lista => {
  //   this.fotosFeas=[];
  //   for(let i=0;i<lista.length;i++)     {
  //     this.fotosFeas.push(lista[i]);
  //   }
  
  // });
  this.data.getListaNoMeGusta("nomegustas").subscribe(lista => {
      this.fotosFeas=lista;      
  });

 console.log("fotos feasultimo compo",this.fotosFeas);
 
} 

obtenerFotosLindas() {
  this.data.getListaMeGusta('megusta').subscribe(lista => {
      this.fotosLindas=lista;      
    });
    console.log(this.fotosLindas);
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
   irAFotosMiasList(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
    this.SeleccionDeTipoDeFoto.emit(true);  
  	this.router.navigate(['/misFotos']);
    localStorage.setItem("sala", "mias");
  }
  

}
