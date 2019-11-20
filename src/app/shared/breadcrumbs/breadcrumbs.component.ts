import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private router:Router,
              //sirve para colocar el titulo en la parte superior de la pagina
              private title: Title,
              //coloca los metatags(los textos que se previsualizan en google) de la pagina  
              private meta: Meta) {
    
    this.getDataRoute().subscribe(data=>{
      this.titulo= data.titulo;
      //asigno el titulo de la pagina
      this.title.setTitle(this.titulo);


      const metatag: MetaDefinition={
        name:'description',
        content: this.titulo
      }

      this.meta.updateTag(metatag);

    });
  }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(
      //el instanceof sirve para confirmar el tipo de un objeto en tiempo de ejecución
      filter(evento=> evento instanceof ActivationEnd),
      filter((evento:ActivationEnd)=> evento.snapshot.firstChild === null),
      map((evento:ActivationEnd)=> evento.snapshot.data)
    );
  }

}
