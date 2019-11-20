import { Component, OnInit } from '@angular/core';

//funcion que se encuentra en el custom.js que se creo para que se puedan 
//llamar a los plugins del html desde cualquier componente
declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins()
  }

}
