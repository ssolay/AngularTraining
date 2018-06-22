import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieComponent } from "./movies/movie.component";
import { upperValuePipe } from "./movies/upperValue.pipe";
import { MovieFilterPipe} from "./movies/movieFilter.pipe";

@NgModule({

    //All Module decl here
    imports:[
        BrowserModule,
        FormsModule
    ],
    //All Component & Pipe
    declarations:[
        AppComponent,
        MovieComponent,
        upperValuePipe,
        MovieFilterPipe,
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