import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component'
import { ProductComponent } from "./products/product.component";
import { upperValuePipe } from "./products/upperValue.pipe";
import { AddValuePipe } from "./products/addValue.pipe";
import { ProductFilterPipe } from "./products/productFilter.pipe";
import { StarComponent } from "./shared/star.component";
import { ProductService } from "./products/product.service";
import { ProductDetail } from "./products/product_detail.component";
import { OrderComponent } from "./orders/order.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./shared/notFound.component";

@NgModule({

    //All Module decl here
    imports:[
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path:'products', component:ProductComponent},
            {path:'products/:id', component:ProductDetail},
            {path:'orders', component:OrderComponent},
            {path:'home', component:HomeComponent},
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'**', component:NotFoundComponent}
        ])
    ],
    //All Component & Pipe
    declarations:[
        AppComponent,
        DashboardComponent,
        ProductComponent,
        upperValuePipe,
        AddValuePipe,
        ProductFilterPipe,
        StarComponent,
        ProductDetail,
        OrderComponent,
        HomeComponent,
        NotFoundComponent
    ],
    //Only First Component
    bootstrap:[
        AppComponent
    ],
    //All Services decl here
    providers:[
        ProductService
    ]
})

export class AppModule{

}