import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from  '../../servicios/auth.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Output() public SeleccionDeTipoDeFoto: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean;
  tipo_cosas: boolean;

  constructor(public router: Router, private  authService:  AuthService) { }

  ngOnInit() {
    // console.log("llamo a ver todos con This.guardarDatosuser");
    // console.log("This.guardarDatosuser:"+ this.guardarDatosUser);
    // this.verTodos(this.guardarDatosUser);
  }

  irACosasLindas(){
  	this.mostrar = true;
  	this.tipo_cosas = true;
  	this.SeleccionDeTipoDeFoto.emit(true);
  	this.router.navigate(['/lista']);
    localStorage.setItem("sala", "meGusta");
  }

  irACosasFeas(){
  	this.mostrar = true;
  	this.tipo_cosas = false;
  	this.SeleccionDeTipoDeFoto.emit(false);
  	this.router.navigate(['/lista']);
    localStorage.setItem("sala", "noMeGusta");
  }

  // verTodos(callback){
  //   let usuarios: any;
  //   this.authService.getUsers('usuarios').subscribe(data => {
  //     console.log(data);
  //     usuarios = data.map(e => {
  //       return {
  //         id: e.payload.doc.id,
  //         data: e.payload.doc.data()
  //       } as any;
  //     });
  //     console.log("verTodos: "+callback);
  //     console.log(usuarios);
  //     //console.log(this.usuarios[0].data.correo); //para recuperar los datos
  //     setTimeout(function(){
  //       callback(usuarios);
  //     });

  //   });
  // }




  async guardarDatosUser(datos){   

    // console.log("guardardatos");
    // console.log("todos: "); 
    // console.log(todos);
    // let local = JSON.parse(localStorage.getItem('user'));
    let emailLocal= localStorage.getItem("email");

    // console.log("usuario: ");
    // console.log(emailLocal);

    // let datos: any[];
    // datos = todos.filter(user => user.email === emailLocal);
    // console.log("todos[0].email:")
    // console.log(todos[0].email);
   
    // console.log(datos[0]);

    // let userCompleto: Usuario = new Usuario();
    // console.log("datos");
    // console.log(datos);

    // userCompleto.email = datos[0].email;
    // //userCompleto.id = datos.id;
    // userCompleto.perfil = datos[0].perfil;
    // userCompleto.sexo = datos[0].sexo;
    // localStorage.setItem('user', userCompleto.email);
    //console.log(JSON.parse(localStorage.getItem('user')));
  }


}
