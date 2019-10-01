import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes:Ajustes={
    temaUrl:"assets/css/colors/default.css",
    tema:"default"
  }

  // con el @Inject(DOCUMENT) creo una referencia al DOM del html
  constructor(@Inject(DOCUMENT) private _document) {
    //para poder usar esat funcion aqui se tiene que importar el setting.service
    // en el app.component.ts
    this.cargarAjustes();
  }
  
  guardarAjustes(){
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }

  cargarAjustes(){

    if (localStorage.getItem('ajustes')) {
      this.ajustes=JSON.parse(localStorage.getItem('ajustes')) ;
      this.aplicarTema(this.ajustes.tema);
    }else{
      this.aplicarTema(this.ajustes.tema);
    }

  }

  aplicarTema(tema:string){
    let url= `assets/css/colors/${tema}.css`
    this._document.getElementById('tema').setAttribute('href',url);

    this.ajustes.tema= tema;
    this.ajustes.temaUrl=url;

    this.guardarAjustes();
  }
}

interface Ajustes{
  temaUrl:string;
  tema:string;
}
