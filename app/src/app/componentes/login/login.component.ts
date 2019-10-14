import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from  '../../servicios/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

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
    password: new FormControl('')
  });
  
  constructor(private  data:  AuthService,
     private formB: FormBuilder, public router: Router,) {
      this.usuarios=new Array();
      this.formulario = formB.group({
          email: [null, Validators.compose([Validators.required, Validators.email])],
          password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
    
  }
  ngOnInit() { }
 

  onSubmitLogin(formValues){
      this.data.login(formValues.email, formValues.password).then(res => {
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
                // this.mostrarSpiner=false;
                // this.navCtrl.setRoot(PrincipalPage, {usuario : res});
                this.router.navigate(['home']);
              // }
              
            }
          }

        })
      });
  }

  rellenarDatos(){
    this.formulario.patchValue({
      email: "tester@gmail.com",
      clave: "555555",

    });
    console.log("this.formulario:", this.formulario)
    let usuarioTest= new Usuario();
    usuarioTest.email="tester@gmail.com";
    localStorage.setItem("usuario", JSON.stringify(usuarioTest));

  }

  


 
}
