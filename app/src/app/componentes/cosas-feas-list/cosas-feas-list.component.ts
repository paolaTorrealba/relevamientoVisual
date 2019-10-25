import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";
import { AuthProvider } from 'src/app/providers/auth/auth';

@Component({
  selector: 'app-cosas-feas-list',
  templateUrl: './cosas-feas-list.component.html',
  styleUrls: ['./cosas-feas-list.component.scss'],
})
export class CosasFeasListComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  public firebase = firebase;
  public usuario;
  fotoActual;
  public sala;
  public fotos = [];
  public foto: string = "./assets/images/sinfoto.png";
  public fotosMias= new Array();
  public fotosFeas=new Array();
  public fotosLindas= new Array();
  spinner: boolean = true;
  public email:string;

  constructor(public router: Router, private auth: AuthProvider, private  data:  AuthService ) { 
      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");          
      this.obtenerFotosFeas();
      console.log("Fotos Feas List:1 ",this.fotosFeas); 
    }

  ngOnInit() {
    this.obtenerFotosFeas();    
  }

  obtenerFotosFeas() {
     this.fotosFeas=new Array();
     this.data.getListaNoMeGusta("nomegustas").subscribe(lista => {
      this.fotosFeas=lista;
      this.fotoActual=lista[0];   
      console.log("lista: ",lista); 
      console.log("la primer foto:",this.fotoActual);  
    });
    //  this.auth.getListaNoMeGusta().subscribe(lista => {
    //       this.fotosFeas=lista;
    //  });
    //  console.log("Fotos Feas List:1 ",this.fotosFeas);    
  } 
  
  votar(imgRef){
    this.obtenerFotosFeas();
    // this.data.getListaNoMeGusta("nomegustas").subscribe(lista => {
    //   this.fotosFeas=lista;      
    // });
    console.log("fotos feas: ", this.fotosFeas);
    console.log("item votos: ",imgRef );
    imgRef.votos = imgRef.votos+1;
    console.log("item votos actualizado: ",imgRef );
    this.auth.actualizarFotoNoMeGusta(imgRef).then(res => {      
    });    
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
  // irACosasLindas(){
  // 	this.mostrar = true;
  // 	this.tipo_cosas = false;
  // 	this.SeleccionDeTipoDeFoto.emit(false);
  // 	this.router.navigate(['/cosasLindas']);
  //   localStorage.setItem("sala", "meGusta");
  // }


}
