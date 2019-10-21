import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";
import { AuthProvider } from 'src/app/providers/auth/auth';

@Component({
  selector: 'app-cosas-lindas-list',
  templateUrl: './cosas-lindas-list.component.html',
  styleUrls: ['./cosas-lindas-list.component.scss'],
})
export class CosasLindasListComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  public firebase = firebase;
  public usuario;
  public sala;
  public fotosMias= new Array();
  public fotosLindas= new Array();
  spinner: boolean = true;
  public email:string;

  constructor(public router: Router,private auth: AuthProvider, private  data:  AuthService ) {  
      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");  
      this.obtenerFotosLindas();
    }

    ngOnInit() {
      this.obtenerFotosLindas();    
    }

    obtenerFotosLindas() {
      this.fotosLindas=new Array();
      this.data.getListaMeGusta("megustas").subscribe(lista => {
      this.fotosLindas=lista;      
    });
    } 

    votar(imgRef){
      this.obtenerFotosLindas();
      console.log("fotos lindas: ", this.fotosLindas);
      console.log("item votos: ",imgRef );
      imgRef.votos = imgRef.votos+1;
      console.log("item votos actualizado: ",imgRef );
      this.auth.actualizarFotoMeGusta(imgRef).then(res => {      
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
   irAFotosMiasList(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
    this.SeleccionDeTipoDeFoto.emit(true);  
  	this.router.navigate(['/misFotos']);
    localStorage.setItem("sala", "mias");
  }

}
