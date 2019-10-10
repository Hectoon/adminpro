import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

//funcion que se encuentra en el custom.js que se creo para que se puedan 
//llamar a los plugins del html desde cualquier componente
declare function init_plugins();

//declaro una variable que corresporde al api de google
//esta libreria se encuentra importada en el javascript de google del html 
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email:string;
  auth2:any;

  constructor(private router:Router,public _usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();

    this.googleInit()

    this.email=localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame=true;
    }
  }

  //funcion que nos va a capturar los datos de la cuenta de google
  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2= gapi.auth2.init({
        client_id:'513927770374-o1fj5qsk1he4buf3cuojvktj64u5bfa4.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element,{},(googleUser)=>{
      //muestro la informacion del usuario google
      //let profile= googleUser.getBasicProfile();

      let token= googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
          .subscribe(resp=>{
            this.router.navigate(['/dashboard']);
          });
      
    })
  }

  ingresar(forma: NgForm){
    if (forma.invalid) {
      return;
    }

    let usuario= new Usuario(null,forma.value.email,forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe(res=>{
          this.router.navigate(['/dashboard']);
        })
    /* this.router.navigate(['/dashboard']); */
  }

}
