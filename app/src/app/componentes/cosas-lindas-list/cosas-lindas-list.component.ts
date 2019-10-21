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


  votar(imgRef){
    console.log("estoy votando",imgRef )
    let votos=imgRef.votos;
    if (votos === "0")
       votos="1";
       if (votos === "1")
       votos="2";
       if (votos === "2")
       votos="3";
       if (votos === "3")
       votos="4";
   

    console.log(votos);
    imgRef.votos = votos+1;
    console.log(imgRef);

    this.data.actualizarFotoMeGusta(imgRef).then(res => {   
    
    });
    

    // console.log("estoy votando",votos1 )
    // let referencia = imgRef.referencia;
    // console.log("referencia", referencia)
    // let child;
    // let dbRefImg = this.firebase.database().ref(this.sala).child(referencia);
    // let dbRefUser = this.firebase.database().ref("usuarios").child(this.usuario.email.replace(".", ""));
    // let votos;
    // console.log("votos", votos)
    // console.log("dbRefUser", dbRefUser)
    // console.log("dbRefImg", dbRefImg)

    // dbRefUser.child('votos').once("value", (snapshot) => {
    //   child = snapshot.toJSON();     
    // }).then(() => {
      
    //   var voto = false;
    //   for (var i in child) {
    //     if (i == referencia) {
    //       voto = child[i].voto;
    //       break;    
    //     }
    //   }

    //   if (!voto) {
    //     dbRefImg.once('value', function (snapshot) {
    //       votos = snapshot.toJSON();
    //     }).then(() => {
    //       dbRefImg.update({ votos: votos.votos + 1 }).then(() => {
    //         for (var i = this.fotos.length - 1; i >= 0; i--) {
    //           if(this.fotos[i].referencia == referencia)  {
    //             this.fotos[i].votos++;
    //             break;
    //           }
    //         }
    //         dbRefUser.child('votos').child(referencia).set({
    //           'voto': true
    //         });

    //       });
    //     })
    //   } else { 
    //     console.log("estoy en el else")       
    //     dbRefImg.once('value', function (snapshot) {
    //       votos = snapshot.toJSON();
    //     }).then(() => {
    //       dbRefImg.update({ votos: votos.votos - 1 }).then(() => {
    //         for (var i = this.fotos.length - 1; i >= 0; i--) {
    //           if(this.fotos[i].referencia == referencia) {
    //             this.fotos[i].votos--;
    //             break;
    //           }
    //         }
    //         dbRefUser.child('votos').child(referencia).set({
    //           'voto': false
    //         });
    //       });
    //     })
    //   }
    // });
  }
}
