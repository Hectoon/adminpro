import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable,Subscriber,Subscription } from 'rxjs';
import { retry,map,filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})

//el OnDestroy permite saber cuando se esta cerrando(cambiando de pagina) el componente
export class RxjsComponent implements OnInit, OnDestroy {

  //se crea una propiedad de la clase para hacer referencia en el ngOnDestroy
  subscription: Subscription;

  constructor() {
    
    // los observables tienen 3 callback 
    this.subscription= this.regresaObserbable().pipe(
      // en retry se ocula para repetir la llamada a un subscribe despues de un error
      // el 2 representa la cantidad de intentos que va a hacer
      retry(2)
    ).subscribe(numero=> { console.log('subs ', numero) },// el primero se ejecuta con el next
                error=>{ console.log('Error en el obs', error)}, //el segundo es el error
                ()=>{console.log('el observador termino')} ); //el tercero se ejecuta cuando se termina de ejecutar el observable
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }


  regresaObserbable(): Observable<any>{
    return new Observable((observer: Subscriber<any>)=>{
      let contador = 0;

      let intervalo = setInterval(()=>{
        contador ++;

        const salida={
          valor: contador
        };


        observer.next(salida);

        /* if (contador===3) {
          clearInterval(intervalo);
          observer.complete();
        } */

        //para enviar o ejecutar error
        /* if (contador===2) {
          clearInterval(intervalo);
          observer.error('Auxilio');
        } */

      },1000);

    }).pipe(
      map(resp =>{ return resp.valor; }),
      //el primer dato es el valor de la respuesta
      //el segundo es el numero de veces en base 0 que e recibido notificaciones de ese observador
      filter( (valor, index) => {
        /* console.log('filter', valor ,index); */
        if ((valor % 2 )===1 ) {
          //impar
          return true;
        }else{
          //par
          return false;
        }
      })
    );
  }
}
