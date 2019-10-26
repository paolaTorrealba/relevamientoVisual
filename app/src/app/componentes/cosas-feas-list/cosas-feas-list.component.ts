import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";
import { AuthProvider } from 'src/app/providers/auth/auth';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cosas-feas-list',
  templateUrl: './cosas-feas-list.component.html',
  styleUrls: ['./cosas-feas-list.component.scss'],
})
export class CosasFeasListComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;


  // agrego movimiento
  x:string;
  y:string;
  z:string;
  seMovio: any;
  timeStamp:string;
  off=true;
  on=false;  
  public posicion=0;
  id: Subscription;
  //  fin movimiento
  public firebase = firebase;
  public usuario;
  fotoActual;
  public sala;
  yavoto=false; 
  public voto;
  public fotos = [];
  public foto: string = "./assets/images/sinfoto.png";
  public fotosMias= new Array();
  public fotosFeas=new Array();
  spinner: boolean = true;
  public email:string;

  constructor(public deviceMotion: DeviceMotion,
      public router: Router, private auth: AuthProvider,
      private  data:  AuthService ) { 
      this.sala = localStorage.getItem("sala");  
      localStorage.setItem("votoFeas", "no");  
      this.voto="no";   
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");          
      this.start();
      
    }

  ngOnInit() {
    this.obtenerFotosFeas();    
  }

  obtenerFotosFeas() {
      this.fotosFeas=new Array();
      this.data.getListaNoMeGusta("nomegustas").subscribe(lista => {
      this.fotosFeas=lista;
      this.fotoActual=lista[this.posicion];
    });
     
  } 

  // MOVIMIENTO
  start(){
    this.off=false;
    this.on=true;         
    this.seMovio=false;
    var option: DeviceMotionAccelerometerOptions = {frequency: 1000 };
    this.id= this.deviceMotion.watchAcceleration(option).subscribe((result: DeviceMotionAccelerationData) =>
    {
        this.x= "" + result.x;
        this.y= "" + result.y;
        this.z= "" + result.z;
        this.timeStamp= ""+result.timestamp;

        //lateral izquierdo x=9
        if (result.x>8.6  && result.x<9.9 ){
             this.siguiente();               
        }            
        //lateral derecho x=-9
        if (result.x<-8.5 && result.x>-9.5){
             this.anterior();           
        }      
        if (result.y<9.5 && result.y>8.5){
          this.inicio();            

      }  
        
    });    
  } 
// FIN MOVIMIENTO
  
siguiente() {
  console.log("posicion: ",this.posicion);
  this.posicion= this.posicion+1;
  console.log("pocision +1:",this.posicion);
  if (this.posicion<=this.fotosFeas.length-1 && this.posicion>=0){      
    this.obtenerFotosFeas();
  }    
}

anterior() {
  console.log("posicion: ",this.posicion);
  this.posicion= this.posicion-1;
  console.log("pocision -1:",this.posicion);
  if (this.posicion<=this.fotosFeas.length-1 && this.posicion>=0){      
    this.obtenerFotosFeas();
  }       
}

inicio(){     
  this.posicion= 0;      
  if (this.posicion<=this.fotosFeas.length-1 && this.posicion>=0){      
    this.obtenerFotosFeas();
  }    
}
  votar(imgRef){
    
    for(let i=0;i<this.fotoActual.votosusuario.length;i++){
      if(this.fotoActual.votosusuario[i] === this.email) {
        console.log("el usuario ya voto la foto");  
        this.yavoto=true;       
      }
    }
    if (!this.yavoto){
      console.log("no voto")
      this.obtenerFotosFeas();
      imgRef.votos = imgRef.votos+1;
      imgRef.votosusuario.push(this.email);
      console.log("imgRef",imgRef);
      this.auth.actualizarFotoNoMeGusta(imgRef).then(res => {      
      });           
    }
  
     
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
