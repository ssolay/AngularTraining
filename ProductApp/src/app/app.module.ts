import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component'
import { ProductComponent } from "./products/product.component";

@NgModule({

    //All Module decl here
    imports:[
        BrowserModule,
        FormsModule
    ],
    //All Component & Pipe
    declarations:[
        AppComponent,
        DashboardComponent,
        ProductComponent
    ],
    //Only First Component
    bootstrap:[
        AppComponent
    ],
    //All Services decl here
    providers:[]
})

export class AppModule{

}