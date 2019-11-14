import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(public _usuarioService:UsuarioService,private http: HttpClient) {
    this.usuario= this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){
    this.usuario.nombre=usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email= usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
          .subscribe(resp=>{
            console.log(resp);
          });
  }


  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      /* swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error'); */
      Swal.fire({
        type: 'error',
        title: 'Sólo imágenes',
        text: 'El archivo seleccionado no es una imagen'
      })
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result; 

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }


}
