import { Routes, RouterModule } from '@angular/router';

import { MovieComponent } from './movies/movie.component';
import { MusicComponent } from './music/music.component';
import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './login';

const appRoutes: Routes = [
    { path: 'movie', component: MovieComponent },
    { path: 'music', component: MusicComponent },
    { path: 'home', component: HomeComponent },
    {path:'',redirectTo:'home',pathMatch:'full'},
    //{path: 'empdetail', component: EmpDetailComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);