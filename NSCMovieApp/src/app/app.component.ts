import { Component } from '@angular/core';

@Component({
    selector: 'app-comp',
    templateUrl: 'app.component.html'
})

export class AppComponent { }

/*import { Component } from '@angular/core';

@Component({
    selector:'app-comp',
    template:`<div>
               <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <a class="navbar-brand">NSC Entertaintment App</a>
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['/movie']">Movies</a></li>
                        
                    </ul>
                </div>
               </nav>
               <div>
                    <router-outlet></router-outlet>
                </div>
             </div>`
})

export class AppComponent{

}*/

