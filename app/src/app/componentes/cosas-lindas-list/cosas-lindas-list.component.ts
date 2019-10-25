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

  items: any[] = [];
  rotateImg = 0;
   lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

   images = [
      'bandit',
      'batmobile',
      'blues-brothers',
      'bueller',
      'delorean',
      'eleanor',
      'general-lee',
      'ghostbusters',
      'knight-rider',
      'mirth-mobile'
    ];

  public firebase = firebase;
  public usuario;
  public voto;
  public sala;
  public fotoActual;
  public fotosMias= new Array();
  public fotosLindas= new Array();
  spinner: boolean = true;
  public email:string;

  constructor(public router: Router,private auth: AuthProvider, private  data:  AuthService ) {  
      this.sala = localStorage.getItem("sala"); 
      this.voto = localStorage.getItem("voto");     
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email");  
      this.obtenerFotosLindas();


      // for (let i = 0; i < 1000; i++) {
      //   this.items.push({
      //     name: i + ' - ' + this.fotosLindas[this.rotateImg],
      //     imgSrc: this.getImgSrc(),
      //     avatarSrc: this.getImgSrc(),
      //     imgHeight: Math.floor(Math.random() * 50 + 150),
      //     content: this.lorem.substring(0, Math.random() * (this.lorem.length - 100) + 100)
      //   });
  
      //   this.rotateImg++;
      //   if (this.rotateImg === this.fotosLindas.length) {
      //     this.rotateImg = 0;
      //   }
      // }

      this.fotoActual=this.fotosLindas[0];
      console.log("fotos lindas[0]",this.fotosLindas[0]);
      console.log("fotos lindas desde contructor",this.fotosLindas);
    
    }    
    
    //  getImgSrc() {
    //   const src = 'https://dummyimage.com/600x400/${Math.round( Math.random() * 99999)}/fff.png';
    //   this.rotateImg++;
    //   if (this.rotateImg === this.fotosLindas.length) {
    //     this.rotateImg = 0;
    //   }
    //   return src;
    // }

    ngOnInit() {
      this.obtenerFotosLindas();    
      this.fotoActual=this.fotosLindas[0];
      console.log("fotos lindas desde ng",this.fotosLindas);
      console.log("fotos lindas[0] desde ng",this.fotosLindas[0]);
    }

    obtenerFotosLindas() {
      let uno=1;
      this.fotosLindas=new Array();
      this.data.getListaMeGusta("megustas").subscribe(lista => {
      this.fotosLindas=lista;     
      if (uno==1) {
        this.fotoActual=lista[1];
      }  
      else{
        this.fotoActual=lista[2];   
        console.log("lista: ",lista[2]); 
        console.log("la primer foto:",this.fotoActual);  
      }
    });
    } 

    siguiente() {
      let uno=1;
      let dos=2;
      this.fotosLindas=new Array();
      this.data.getListaMeGusta("megustas").subscribe(lista => {
      this.fotosLindas=lista;  
      if (dos==2) {
        this.fotoActual=lista[2];
      }  
      else{
      
        console.log("lista: ",lista[2]); 
        console.log("la primer foto:",this.fotoActual);  
      }
       
    });
    }

    votar(imgRef){
      if (this.voto === "no"){
        localStorage.setItem("voto", "si"); 
        this.obtenerFotosLindas();
        console.log("fotos lindas: ", this.fotosLindas);
        console.log("item votos: ",imgRef );
        imgRef.votos = imgRef.votos+1;
        console.log("item votos actualizado: ",imgRef );
        this.auth.actualizarFotoMeGusta(imgRef).then(res => {      
        });    
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
   irAFotosMiasList(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
    this.SeleccionDeTipoDeFoto.emit(true);  
  	this.router.navigate(['/misFotos']);
    localStorage.setItem("sala", "mias");
  }

}
