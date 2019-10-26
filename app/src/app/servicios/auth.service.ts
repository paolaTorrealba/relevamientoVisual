import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { Usuario } from '../clases/usuario';
import { map } from "rxjs/operators";
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore"; 
import { AngularFireModule } from '@angular/fire'; 

//import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Observable } from 'rxjs';

export interface usuario {
   id: string;
	 email: string;
	 clave: string;
	 perfil: string;
	 sexo: string;
}

export interface megusta {
  id:string;
  email: string;
  img: string;
  votos: number;
  votosusuario:Array<any>,
 }

 export interface nomegusta {
  id:string;
  email: string;
  img: string;
  votosusuario:Array<any>,
  votos: number;
 } 

 export interface mifoto {
  id:string;
  email: string;
  img: string;
  
 } 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth,
     public router: Router, 
     public firestore: AngularFirestore) {}

  login(email: string, password: string){
      return this.AFauth.auth.signInWithEmailAndPassword(email,password);
  }  

  public getListaUsuarios(tipo:string) {
    return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
  
  actualizarFotoNoMeGusta(data) {
    return this.firestore.collection('nomegusta').doc(data.id).update(data);    
  }

  actualizarFotoMeGusta(data) {
    return this.firestore.collection('megusta').doc(data.id).update(data);
  }

  actualizarFotoMia(data) {
    return this.firestore.collection('mifoto').doc(data.id).update(data);    
  }
  getListaMeGusta(tipo:string) { 
    return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as megusta;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
  getListaMisFotos(tipo:string) { 
    return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as mifoto;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getListaNoMeGusta(tipo:string) {  
    return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as nomegusta;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }  

  guardarFotoMeGusta(data) {
    return this.firestore.collection('megusta').add(data);
  }
  guardarFotoNoMeGusta(data) {
    return this.firestore.collection('nomegusta').add(data);
  }  
  guardarFotoMia(data) {
    return this.firestore.collection('mifoto').add(data);
  } 

  guardarUsuario(){
    console.log("guardar usuario de auth");
    this.AFauth.authState.subscribe(user => {
      console.log("usuario: ",user);
      if (user) {
        let user_auth: any = user;
        let usuario: Usuario = new Usuario();
        usuario.email = user.email;   
        localStorage.setItem("email",usuario.email);        
      } else {
        localStorage.setItem("email", null);
      }
     
    }) 
  }

}
