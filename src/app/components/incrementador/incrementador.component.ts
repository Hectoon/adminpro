import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: true}) txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso:number = 50;

  @Output() cambioValor: EventEmitter<number>= new EventEmitter();

  constructor() {
    /* console.log('leyenda:', this.leyenda);
    console.log('progreso',this.progreso); */
  }

  ngOnInit() {
  }

  onChange(newValue: number){
    //javascript puro. el getElementsByName regresa un arreglo con todos los 
    //elementos que coinciden con el nombre 
    //let elemHTML:any = document.getElementsByName('progreso')[0];



    if (newValue >= 100) {
      this.progreso = 100;
    } else if(newValue <= 0){
      this.progreso = 0;
    } else{
      this.progreso=newValue
    }
    //con el .value capturo el valor del input 
    //elemHTML.value=this.progreso;

    this.txtProgress.nativeElement.value= this.progreso;
    
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor){
    
    if (this.progreso >= 100 && valor > 0) {
      this.progreso=100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso=0;
      return;
    }
    this.progreso= this.progreso + valor;
    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();

  }

}
