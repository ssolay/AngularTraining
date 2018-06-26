import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './product.model'

@Component({
    selector:'prod-comp',
    templateUrl:'./product.component.html',
    //styles:['thead{color:red}','h2{color:blue}']
    styleUrls:["./product.component.css"]
})

export class ProductComponent{
    title:string="@@@@ Product List @@@@@";
    showTable:boolean=true;
    showImage:boolean=false;
    filtertext:string;
    errorMessage:string;
    imageWidth:number=50;
    products:IProduct[]
    

    constructor( private _productService: ProductService ){}

    ngOnInit():void{
        
        this._productService.getProducts()
            .subscribe((data) => this.products = data,
                (err) => this.errorMessage = err)
    }

    toggleImage():void{
        this.showImage = !this.showImage
    }

    onDataRecive(message:string):void{
        this.title= "****Product list>>>>> "+ message
    }
}

/*
OneWay binding
--Data Binding   {{}}
--Property binding []
--Event Binding    ()
TwoWay Binding     [()]


typeScript

String = "angular"  "10"
Number= 18 0909 9349 
Boolean= true/false

Date


var marks=[4,54,56,67,678]
var myArray=[2,45,34,"Y56y","5y5",true,3,5]

var a = "angular"
undefined
a
"angular"
var a = "react"
undefined
a
"react"
let c = "javascript"
undefined
c
"javascript"
let c = "javascript1"
VM1820:1 Uncaught SyntaxError: Identifier 'c' has already been declared
    at <anonymous>:1:1
(anonymous) @ VM1820:1
c="javascript1"
"javascript1"
c
"javascript1"
const d ="react"
undefined
d
"react"
const d ="react1"
VM1837:1 Uncaught SyntaxError: Identifier 'd' has already been declared
    at <anonymous>:1:1
(anonymous) @ VM1837:1
d ="react1"
VM1840:1 Uncaught TypeError: Assignment to constant variable.
    at <anonymous>:1:3
(anonymous) @ VM1840:1


for(i=0;i<10;i++){
    var name="john"
}

for(i=0;i<10;i++){
    var name="john"
}
undefined
name
"john"
for(i=0;i<10;i++){
    let name="john"
}
undefined
name
"john"
for(i=0;i<10;i++){
    let name1="john"
}
undefined
name1

var a = "javascript"
var  b = " i m doing  "
a+b

var a = "javascript"
var b = `i am doing ${a}`

function add(a,b){
    return a+b
}

var add = (a,b) => {return a+b}

indexOf
filter


*/