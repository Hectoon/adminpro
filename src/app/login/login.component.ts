import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//funcion que se encuentra en el custom.js que se creo para que se puedan 
//llamar a los plugins del html desde cualquier componente
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    init_plugins();
  }


  ingresar(){
    /* console.log("ingresar"); */
    this.router.navigate(['/dashboard']);
  }

}
