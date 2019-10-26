import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from  '../../servicios/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  constructor(public router: Router, private  authService:  AuthService) { }

  ngOnInit() { }

  irACosasLindas(){
  	this.mostrar = true;
  	this.tipo_cosas = true;
  	this.SeleccionDeTipoDeFoto.emit(true);
  	this.router.navigate(['/cosasLindas']);
    localStorage.setItem("sala", "meGusta");
  }

  irACosasFeas(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
  	this.SeleccionDeTipoDeFoto.emit(false);
  	this.router.navigate(['/cosasFeas']);
    localStorage.setItem("sala", "noMeGusta");
  }

  async guardarDatosUser(datos){   
    let emailLocal= localStorage.getItem("email");

  }
}
