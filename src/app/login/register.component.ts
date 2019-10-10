import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

//funcion que se encuentra en el custom.js que se creo para que se puedan 
//llamar a los plugins del html desde cualquier componente
declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  //establesco la propiedad para poder utilizar los formularios
  //tambien se debe importar an el app.module correspondiente  import {ReactiveFormsModule} from '@angular/forms';
  //forma es el nombre que va a tener el formulario en el html y se indica asi [formGroup]="forma"
  forma:FormGroup;

  constructor(private _usuarioService:UsuarioService,public router:Router) { }

  sonIguales(campo1:string, campo2:string){
    //para que la funcion que se crea sea valida debe retornar una funcion de tipo FormGroup
    return (group: FormGroup)=>{

      let pass1= group.controls[campo1].value;
      let pass2= group.controls[campo2].value;

      //si pasa la validacion se debe retornar un null
      if (pass1 === pass2 ) {
        return null;
      }

      //si la condicion no se cumple se tiene que retornar un mensaje(error) con este formato
      return{
        sonIguales:true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    //declaro todas las variables(inputs) que va a tener el formulario
    this.forma = new FormGroup({
      //dentro del FormControl el primer parametro es el valor del campo por defecto
      //el segundo son las valizaciones si se ocupa mas de uno se envian dentro de un arreglo
      nombre: new FormControl(null,Validators.required),
      correo: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,Validators.required),
      password2: new FormControl(null,Validators.required),
      condiciones: new FormControl(false)
      //validaciones personalizadas
    },{ validators: this.sonIguales('password','password2')});

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@tes.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }


  registrarUsuario(){

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire({
        type: 'error',
        title: 'Atencion',
        text: 'Debe aceptar las condiciones'
      })
      return;
    }

    let usuario= new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
          .subscribe(resp=>{
            console.log(resp);
            this.router.navigate(['/login']);
          });
  }

}
