import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


// se tiene que importar el RouterModule para que todos los componentes que 
//estan en este modulo puedan usar el router 
import { RouterModule } from '@angular/router';

//se importa el CommonModule para poder usar *ngif, *ngFor y los pipes
import { CommonModule } from '@angular/common';

//pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        PipesModule       
    ],
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ]
})

export class SharedModule{}