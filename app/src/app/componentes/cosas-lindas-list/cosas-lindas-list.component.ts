import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";
import { AuthProvider } from 'src/app/providers/auth/auth';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-cosas-lindas-list',
  templateUrl: './cosas-lindas-list.component.html',
  styleUrls: ['./cosas-lindas-list.component.scss'],
})
export class CosasLindasListComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  items: any[] = [];
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
  public voto;
  public sala;
  yavoto=false; 
  public fotoActual;
  public fotosMias= new Array();
  public fotosLindas= new Array();
  spinner: boolean = true;
  public email:string;

  constructor( public deviceMotion: DeviceMotion,
     public router: Router,
     private auth: AuthProvider,
     private  data:  AuthService ) {  
        this.x= "-";
        this.y= "-";
        this.z= "-";
        this.timeStamp= "-";    
        
        this.sala = localStorage.getItem("sala"); 
        localStorage.setItem("votoLindas", "no");  
        this.voto="no";
        this.usuario = JSON.stringify(localStorage.getItem('usuario'));
        this.email = localStorage.getItem("email");         
        this.start();
    }        
    
    ngOnInit() {
      this.obtenerFotosLindas();        
    }

    obtenerFotosLindas() {
      
          this.fotosLindas=new Array();
          this.data.getListaMeGusta("megustas").subscribe(lista => {
          this.fotosLindas=lista;        
          this.fotoActual=lista[this.posicion];
         
          console.log("la pocision: ", this.posicion);
          console.log("lista: ",lista[this.posicion]); 
          console.log("la primer foto:",this.fotoActual);  
      
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
               //vertical
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
      if (this.posicion<=this.fotosLindas.length-1 && this.posicion>=0){      
        this.obtenerFotosLindas();
      }    
    }

    anterior() {
      console.log("posicion: ",this.posicion);
      this.posicion= this.posicion-1;
      console.log("pocision -1:",this.posicion);
      if (this.posicion<=this.fotosLindas.length-1 && this.posicion>=0){      
        this.obtenerFotosLindas();
      }       
    }
    inicio(){     
      this.posicion= 0;      
      if (this.posicion<=this.fotosLindas.length-1 && this.posicion>=0){      
        this.obtenerFotosLindas();
      }    
    }

    votar(imgRef){
      console.log("los votos",this.fotoActual.votosusuario[0]  )
      for(let i=0;i<this.fotoActual.votosusuario.length;i++){
        if(this.fotoActual.votosusuario[i] === this.email) {
          console.log("el usuario ya voto la foto");  
          this.yavoto=true;       
        }
      }
      if (!this.yavoto){
        console.log("no voto")
        this.obtenerFotosLindas();
        imgRef.votos = imgRef.votos+1;
        imgRef.votosusuario.push(this.email);
        console.log("imgRef",imgRef);
        this.auth.actualizarFotoMeGusta(imgRef).then(res => {      
        });           
      }
    }

  irAInicio(){  
    this.router.navigate(['home']); 
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
