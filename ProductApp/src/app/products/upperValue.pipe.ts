import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'myUpper'
})

export class upperValuePipe implements PipeTransform{
    transform(value:string, type:string){
        if(type=="upper"){
            value = value.toUpperCase()
        }else{
            value = value.toLowerCase()
        }
        
        return value;
    }
}