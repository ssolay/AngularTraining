import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieComponent } from "./movies/movie.component";
import { upperValuePipe } from "./movies/upperValue.pipe";
import { MovieFilterPipe} from "./movies/movieFilter.pipe";
import { LangFilterPipe} from "./movies/languageFilter.pipe";
import {NgxPaginationModule} from 'ngx-pagination';
import { StarComponent } from './shared/starDisplay/star.component';
import { routing }        from './app.routing';
import { MusicComponent } from "./music/music.component";
import { HomeComponent } from "./home/home.component";
//import { StarRatingModule } from 'angular-star-rating';

@NgModule({

    //All Module decl here
    imports:[
        BrowserModule,
        FormsModule,
        NgxPaginationModule,
        routing
        //StarRatingModule.forRoot()
    ],
    //All Component & Pipe
    declarations:[
        AppComponent,
        MovieComponent,
        upperValuePipe,
        MovieFilterPipe,
        LangFilterPipe,
        StarComponent,
        MusicComponent,
        HomeComponent,
        //StarRatingModule,
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