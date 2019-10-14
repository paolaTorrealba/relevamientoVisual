import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as firebase from "firebase";

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



  constructor(public router: Router, private  data:  AuthService ) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");  
      this.obtenerFotosLindas();

    }

  ngOnInit() {}

  obtenerFotosLindas() {
    this.data.getListaNoMeGusta('megusta').subscribe(lista => {
        this.fotosLindas=lista;      
    });
  }

}
