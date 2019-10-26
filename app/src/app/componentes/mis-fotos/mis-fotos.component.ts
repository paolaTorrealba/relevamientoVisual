import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.component.html',
  styleUrls: ['./mis-fotos.component.scss'],
})
export class MisFotosComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  public firebase = firebase;
  public usuario;
  public sala;
  public fotosMias= new Array();
  public fotosFeas= new Array();
  public fotosLista= new Array();
  public fotoActual;
  public posicion=0;
  public email:string;
  spinner: boolean = true;

  constructor(public router: Router,
    private  data:  AuthService) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");    
      this.obtenerFotos();      
    }

  ngOnInit() {
    this.obtenerFotos();     
  }

  obtenerFotos() {      
     this.obtenerFotosMias();
    //  for(let i=0;i<this.fotosLista.length;i++){                 
    //    if(this.fotosLista[i].email === this.email) {          
    //      this.fotosMias.push(this.fotosLista[i]);
    //    } 
    //  }  
    
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
