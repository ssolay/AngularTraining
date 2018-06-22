import { Pipe, PipeTransform } from '@angular/core';
import { IMovies } from './movie.model'

@Pipe({
    name:'langFilter'
})

export class LangFilterPipe implements PipeTransform{
    transform(value:IMovies[],filterBy:string){
        filterBy = filterBy ? filterBy.toLowerCase():null;
        return filterBy ? value.filter((movie:IMovies)=>
        movie.language.toLowerCase().indexOf(filterBy) !== -1):value
    }
}