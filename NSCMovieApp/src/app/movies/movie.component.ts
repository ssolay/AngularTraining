import { Component } from '@angular/core';

@Component({selector: 'movie-comp',templateUrl: 'movie.component.html',styleUrls: ['movie.component.css']})
export class MovieComponent{
    title:string="Reserve your Favorite Movies";
    showTable:boolean=true;
    showImage:boolean=false;
    filtertext:string;
    imageWidth:number=150;
    movies:any[]=[
        {
            _id: "5ab12612f36d2879268f284a",
            name: "Black Panther",
            language: "ENGLISH",
            rate: 4.5,
            type: "Action Adventure Fantasy",
            imageUrl: "https://image.ibb.co/f0hhZc/bp.jpg"
        },
        {
            _id: "5ab12666f36d2879268f2902",
            name: "Death Wish",
            language: "ENGLISH",
            type: "Action Crime Thriller",
            rate: 3.2,
            imageUrl: "https://image.ibb.co/gC9PfH/dw.jpg"
        },
        {
            _id: "5ab12678f36d2879268f291d",
            name: "Coco",
            language: "ENGLISH",
            type: "Adventure Animation Family",
            rate: 5,
            imageUrl: "https://image.ibb.co/dQwWSx/coco.jpg"
        }, {
            _id: "5ab12686f36d2879268f2930",
            name: "Pari",
            language: "HINDI",
            rate: 2.5,
            type: "Horror Thriller",
            imageUrl: "https://image.ibb.co/fgmbuc/pari.jpg"
        }, {
            _id: "5ab12698f36d2879268f293e",
            name: "Pad Man",
            language: "HINDI",
            type: "Biography Drama",
            rate: 4,
            imageUrl: "https://image.ibb.co/hX087x/pad.jpg"
        }, {
            _id: "5ab126a8f36d2879268f293f",
            name: "Aiyaary",
            language: "HINDI",
            type: "Action Drama",
            rate: 3.5,
            imageUrl: "https://image.ibb.co/iQxzEc/a.jpg"
        }, {
            _id: "5ab126b6f36d2879268f2943",
            name: "Veerey Ki Wedding",
            language: "HINDI",
            type: "Comedy Romance",
            rate: 2,
            imageUrl: "https://image.ibb.co/c2Tvnx/vw.jpg"
        }, {
            _id: "5ab4e66b0c1d2b27846c6407",
            name: "Black Friday",
            language: "ENGLISH",
            rate: 4.5,
            type: "Action Adventure Fantasy",
            imageUrl: "https://image.ibb.co/f0hhZc/bp.jpg"
        }

    
    ]
    
}