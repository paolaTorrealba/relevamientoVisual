import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";
import { Subscription } from 'rxjs';
import { DeviceMotionAccelerometerOptions, DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.component.html',
  styleUrls: ['./mis-fotos.component.scss'],
})
export class MisFotosComponent implements OnInit {
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
  public sala;
  public fotosMias= new Array(); 
  public fotosLista= new Array();
  public fotoActual;

  public email:string;
  spinner: boolean = true;

  constructor(public deviceMotion: DeviceMotion,
    public router: Router,
    private  data:  AuthService) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");    
      this.obtenerFotos();      
    }

  ngOnInit() {
    this.obtenerFotos();     
  }

  // MOVIMIENTO
  start(){
    this.off=false;
    this.on=true;         
    this.seMovio=false;
    var option: DeviceMotionAccelerometerOptions = {frequency: 1500 };
    this.id= this.deviceMotion.watchAcceleration(option).subscribe((result: DeviceMotionAccelerationData) =>
    {
        this.x= "" + result.x;
        this.y= "" + result.y;
        this.z= "" + result.z;
        this.timeStamp= ""+result.timestamp;

         //lateral izquierdo x=9
         if (result.x>2 ){
          this.siguiente();               
        }            
        //lateral derecho x=-9
        if (result.x<-2){
              this.anterior();           
        }     
          //vertical
        if (result.y>6 ){
              this.inicio();     
        }   
        
    });    
  } 
// FIN MOVIMIENTO

  inicio(){     
    this.posicion= 0;      
    if (this.posicion<=this.fotosMias.length-1 && this.posicion>=0){      
      this.obtenerFotosMias();
    }    
  }
  obtenerFotos() {      
     this.obtenerFotosMias();    
  } 

  obtenerFotosMias() {
 
    this.fotosLista=new Array();
    this.fotosMias=new Array();
    this.data.getListaMisFotos("misfotos").subscribe(lista => {
        this.fotosLista=lista; 
        for(let i=0;i<lista.length;i++){                 
          if(lista[i].email === this.email) {  
            console.log("en el if", lista[i].email, "mail:",this.email)        
            this.fotosMias.push(lista[i]);
          } 
        }
        console.log(lista);
        console.log("mias", this.fotosMias);
        this.fotoActual=lista[this.posicion];
        console.log(this.fotoActual);
    });     
  } 
  
  siguiente() {
    console.log("posicion: ",this.posicion);
    this.posicion= this.posicion+1;
    console.log("pocision +1:",this.posicion);
    if (this.posicion<=this.fotosMias.length-1 && this.posicion>=0){      
      this.obtenerFotosMias();
    }    
  }

  anterior() {
    console.log("posicion: ",this.posicion);
    this.posicion= this.posicion-1;
    console.log("pocision -1:",this.posicion);
    if (this.posicion<=this.fotosMias.length-1 && this.posicion>=0){      
      this.obtenerFotosMias();
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
  
}
