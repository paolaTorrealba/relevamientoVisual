import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

export interface usuario {
  id: string;
  email: string;
  clave: string;
  perfil: string;
  sexo: string;
}
export interface megusta {
  id:string;
  nrofoto:number;
  email: string;
  img: string;
  votos: number;
 }
 export interface nomegusta {
  id:string;
  nrofoto:number;
  email: string;
  img: string;
  votos: number;
 }

@Injectable()
export class AuthProvider {

  constructor(private auth: AngularFireAuth,
   private db:AngularFirestore, 
   private http: HttpClient) {

  }

  login (email:string,pass:string) {
    return this.auth.auth.signInWithEmailAndPassword(email,pass);
  }

  logOut(){
    this.auth.auth.signOut();
  }

  getListaUsuarios(tipo:string) {
    return this.db.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  // No me gusta
  guardarFotoNoMeGusta(data) {
    return this.db.collection('nomegustas').add(data);
  }

  guardarFotoMeGusta(data) {
    return this.db.collection('megustas').add(data);
  }

  getListaNoMeGusta() {  
    return this.db.collection('nomegustas').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as nomegusta;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
  getListaMeGusta() {  
    return this.db.collection('megustas').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as megusta;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
 actualizarFotoNoMeGusta(data) {
  return this.db.collection('nomegustas').doc(data.id).update(data);
  
}

actualizarFotoMeGusta(data) {
  return this.db.collection('megustas').doc(data.id).update(data);
}

}
