import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.component.html',
  styleUrls: ['./mis-fotos.component.scss'],
})
export class MisFotosComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;
  
  constructor(public router: Router) { }

  ngOnInit() {}

  irACosasFeas(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
  	this.SeleccionDeTipoDeFoto.emit(false);
  	this.router.navigate(['/cosasFeas']);
    localStorage.setItem("sala", "noMeGusta");
  }

  irACosasLindas(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
  	this.SeleccionDeTipoDeFoto.emit(false);
  	this.router.navigate(['/cosasLindas']);
    localStorage.setItem("sala", "meGusta");
  }
  irAInicio(){  
    this.router.navigate(['home']); 
  }

  salir(){  
    this.router.navigate(['login']); 
  }
  
}
