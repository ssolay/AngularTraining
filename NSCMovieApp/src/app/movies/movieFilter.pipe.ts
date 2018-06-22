import { Pipe, PipeTransform } from '@angular/core';
import { IMovies } from './movie.model'

@Pipe({
    name:'movieFilter'
})

export class MovieFilterPipe implements PipeTransform{
    transform(value:IMovies[],filterBy:string){
        filterBy = filterBy ? filterBy.toLowerCase():null;
        return filterBy ? value.filter((movie:IMovies)=>
        movie.name.toLowerCase().indexOf(filterBy) !== -1):value
    }
}