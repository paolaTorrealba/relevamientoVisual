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
 }

 export interface nomegusta {
  id:string;
  email: string;
  img: string;
  votos: number;
 }
 

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private AFauth: AngularFireAuth,
     public router: Router, 
     public firestore: AngularFirestore) {

  // //this.afAuth.authState.subscribe(user => {
  //  // console.log(user);
  //     /*if (user) {
  //       this.user = user;
  //       localStorage.setItem('user', JSON.stringify(this.user));
  //     } else {
  //       localStorage.setItem('user', null);
  //     }
  //   }) */
  }

  // =============OK ===========
  login(email: string, password: string){
      return this.AFauth.auth.signInWithEmailAndPassword(email,password);
  }
    //  this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res =>{
    //    console.log("respuesta de auth.logins: " +res);  
    //    this.guardarUsuario();     
    //   //si esta todo bien navego a /Home
    //    this.router.navigate(['home']);

    //  }).catch(function(error){
    //    console.log("Error logeando: " + error);

    //    alert("Usuario o contraseña incorrectos");
    //  })
  // }

  //============ ok
  public getListaUsuarios(tipo:string) {
    // return this.firestore.collection('usuarios').snapshotChanges();
    return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as usuario;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
  // actualizarFotoNoMeGusta(data) {
  //   return this.firestore.collection('VXHqZWSJ1NejWt6XLbBI').doc('nomegusta').update(data);
    
  // }
  actualizarFotoMeGusta(data) {
    return this.firestore.collection('megusta').doc(data.id).update(data);
  }

 public getListaMeGusta(tipo:string) {
  //  console.log("getListaMeGusta");
    return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as megusta;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  guardarFotoMeGusta(data) {
    return this.firestore.collection('megusta').add(data);
  }

  public getListaNoMeGusta(tipo:string) {  
      return this.firestore.collection(tipo).snapshotChanges().pipe(map(rooms => {
        return rooms.map(a =>{
          const data = a.payload.doc.data() as nomegusta;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }
  
    guardarFotoNoMeGusta(data) {
      return this.firestore.collection('nomegusta').add(data);
    }

  guardarUsuario(){
    console.log("guardar usuario de auth")

    this.AFauth.authState.subscribe(user => {
      console.log("usuario: ",user);
      if (user) {
        let user_auth: any = user;
        let usuario: Usuario = new Usuario();
        usuario.email = user.email;
   
        localStorage.setItem("email",usuario.email);
        // localStorage.setItem('user', JSON.stringify(usuario));
      } else {
        localStorage.setItem("email", null);
      }
      //console.log(JSON.parse(localStorage.getItem('user')));
      
      //let u = JSON.parse(localStorage.getItem('user'));
      //console.log(u.email);
    }) 
  }

 

  private setearUser(){
    //let usuarios = this.getUsers();


  }

/*
  //logout
  logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  //ver si el usuario esta logeado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }*/


}
