import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.component.html',
  styleUrls: ['./cosas-feas.component.scss'],
})
export class CosasFeasComponent implements OnInit {
  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;
  
  constructor(public router: Router) { }

  ngOnInit() {}

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
  irAMisFotos(){  
    console.log("voy a is fotos")
    this.router.navigate(['misFotos']);     
  }

  salir(){  
    this.router.navigate(['login']); 
  }
}
