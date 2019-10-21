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
  public sala;
  public fotos = [];
  public foto: string = "./assets/images/sinfoto.png";
  public fotosMias= new Array();
   public fotosFeas=new Array();
     public fotosLindas= new Array();

  spinner: boolean = true;
  public email:string;



  constructor(public router: Router, 
    private auth: AuthProvider, private  data:  AuthService ) {  

      this.sala = localStorage.getItem("sala");      
      this.usuario = JSON.stringify(localStorage.getItem('usuario'));
      this.email = localStorage.getItem("email"); 
      
      this.fotosFeas=new Array();
      this.auth.getListaNoMeGusta().subscribe(lista => {
        this.fotosFeas=lista;
      });

      console.log("fotos feas list desde contro",this.fotosFeas);
      // this.obtenerFotosFeas();

    }

  ngOnInit() {
    // this.obtenerFotosFeas();
    this.fotosFeas=new Array();
      this.auth.getListaNoMeGusta().subscribe(lista => {
        this.fotosFeas=lista;
      });

      console.log("fotos feas list desde ng",this.fotosFeas);
  }

  obtenerFotosFeas() {
    // this.auth.getListaNoMeGusta().subscribe(lista => {
    //   this.fotosFeas=[];
    //   for(let i=0;i<lista.length;i++)     {
    //     this.fotosFeas.push(lista[i]);
    //   }
    
    // });
    // this.data.getListaNoMeGusta('nomegusta').subscribe(lista => {
    //     this.fotosFeas=lista;      
    // });
    console.log("fotos feas list desde obt en cosas feas",this.fotosFeas);
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

    this.data.getListaNoMeGusta("nomegustas").subscribe(lista => {
      this.fotosFeas=lista;      
  });
  console.log("algo mas", this.fotosFeas)

 console.log("fotos feasultimo list cpmpo",this.fotosFeas);
    console.log("estoy votando",imgRef )
    // let votos=imgRef.votos;   
    // console.log(votos);
    imgRef.votos = imgRef.votos+1;
    console.log(imgRef);

    this.auth.actualizarFotoNoMeGusta(imgRef).then(res => {   
    
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
