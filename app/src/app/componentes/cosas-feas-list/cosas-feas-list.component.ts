import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";

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
  public sala;
  public fotos = [];
  public foto: string = "./assets/images/sinfoto.png";
  public fotosMias= new Array();
  public fotosFeas= new Array();
  public fotosLindas= new Array();

  spinner: boolean = true;
  public email:string;



  constructor(public router: Router, private  data:  AuthService ) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");  
      this.obtenerFotosFeas();

    }

  ngOnInit() {}

  obtenerFotosFeas() {
    this.data.getListaNoMeGusta('nomegusta').subscribe(lista => {
        this.fotosFeas=lista;      
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
