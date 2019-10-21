import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from  '../../servicios/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // -- variables
  usuarios;
  public email:string;
  public pass:string;
  formulario = new FormGroup({
    email: new FormControl(''),
    clave: new FormControl('')
  });
  showSplash = true;
  constructor(private  data:  AuthService,
     private formB: FormBuilder, public router: Router,) {
      this.usuarios=new Array();
      this.formulario = formB.group({
          email: [null, Validators.compose([Validators.required, Validators.email])],
          clave: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
    
  }
  ngOnInit() {  timer(3000).subscribe(() => this.showSplash = false) }
 

  onSubmitLogin(formValues){
      this.data.login(formValues.email, formValues.clave).then(res => {
        this.data.getListaUsuarios('usuarios').subscribe(lista => {
          this.usuarios=lista;
          console.log(this.usuarios);
          let flag = false;
          for(let i=0;i<this.usuarios.length;i++){           
            if(this.usuarios[i].email == formValues.email) {
              // if(this.usuarios[i].perfil != 'admin' ){
              //   flag = true;
                let usuario = this.usuarios[i];
                localStorage.setItem("usuario", JSON.stringify(usuario));
                localStorage.setItem("email", usuario.email);
                localStorage.setItem("clave", usuario.clave);
                // this.mostrarSpiner=false;
                // this.navCtrl.setRoot(PrincipalPage, {usuario : res});
                this.router.navigate(['home']);
              // }
              
            }
          }

        })
      });
  }

  rellenarAdmin(){
    this.formulario.patchValue({email: "admin@admin.com",clave: "111111"});
    console.log("this.formulario:", this.formulario)
    let usuarioAlternativo= new Usuario();
    usuarioAlternativo.email="admin@admin.com";
    usuarioAlternativo.clave="111111";
    localStorage.setItem("usuario", JSON.stringify(usuarioAlternativo));
  }

  rellenarInvitado(){
    this.formulario.patchValue({email: "invitado@invitado.com",clave: "222222"});
    console.log("this.formulario:", this.formulario)
    let usuarioTest= new Usuario();
    usuarioTest.email="invitado@invitado.com";
    usuarioTest.clave="222222";
    localStorage.setItem("usuario", JSON.stringify(usuarioTest));
   
  }
 
  rellenarUsuario(){
    this.formulario.patchValue({email: "usuario@usuario.com",clave: "333333"});
    console.log("this.formulario:", this.formulario)
    let usuarioTest= new Usuario();
    usuarioTest.email="usuario@usuario.com";
    usuarioTest.clave="333333";
    localStorage.setItem("usuario", JSON.stringify(usuarioTest));
  }
  rellenarAnonimo(){
    this.formulario.patchValue({ email: "anonimo@anonimo.com",clave: "444444" });
    console.log("this.formulario:", this.formulario)
    let usuarioAlternativo= new Usuario();
    usuarioAlternativo.email="anonimo@anonimo.com";
    usuarioAlternativo.clave="444444";
    localStorage.setItem("usuario", JSON.stringify(usuarioAlternativo));
  }

  rellenarTester(){
    this.formulario.patchValue({email: "tester@tester.com",clave: "555555"});
    console.log("this.formulario:", this.formulario)
    let usuarioTest= new Usuario();
    usuarioTest.email="tester@tester.com";
    usuarioTest.clave="555555";
    localStorage.setItem("usuario", JSON.stringify(usuarioTest));
  } 
}
