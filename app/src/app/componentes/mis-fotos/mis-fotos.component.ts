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
  public fotosLindas= new Array();
  public email:string;
  spinner: boolean = true;

  constructor(public router: Router,
    private  data:  AuthService) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");    
      this.obtenerFotosMias();      
    }

  ngOnInit() {
    this.obtenerFotosMias();     
  }

  obtenerFotosMias() {   
    console.log("obtener fotos mias")
     this.obtenerFotosFeas();
     this.obtenerFotosLindas();  
     for(let i=0;i<this.fotosFeas.length;i++){                 
       if(this.fotosFeas[i].email === this.email) {          
         this.fotosMias.push(this.fotosFeas[i]);
       } 
     }  
     for(let i=0;i<this.fotosLindas.length;i++){              
       if(this.fotosLindas[i].email === this.email) {     
         this.fotosMias.push(this.fotosLindas[i]);
       } 
     }     
  } 

  obtenerFotosFeas() {
    this.data.getListaNoMeGusta('nomegusta').subscribe(lista => {
        this.fotosFeas=lista;      
    });     
  } 
  
  obtenerFotosLindas() {
    this.data.getListaMeGusta('megusta').subscribe(lista => {
        this.fotosLindas=lista;      
      });      
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
