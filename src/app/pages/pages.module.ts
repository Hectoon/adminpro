import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';

import { CommonModule } from '@angular/common';

//importacion para poder usar el [(ngModel)]
import {FormsModule} from '@angular/forms'
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

//greaficas
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

//Pipes
import { PipesModule } from '../pipes/pipes.module';





@NgModule({
    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule,
        PipesModule
        
    ]
})

export class PagesModule{}