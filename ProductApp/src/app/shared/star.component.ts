import { Component, OnChanges , Input,
        Output, EventEmitter} from '@angular/core';

@Component({
    selector:'star-comp',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
})

export class StarComponent implements OnChanges{
    @Input() rating:number;
    starWidth:number;

    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>()

    ngOnChanges():void{
        this.starWidth = 86/5*this.rating
    }

    onStar():void{
        this.ratingClicked.emit(`the rating clicked is ${this.rating}`)
    }
}


/*  
    86/5*4.2

    overflow:hidde



    function add(a,b){
        return a+b
    }

    var sum = add(a,b)
*/