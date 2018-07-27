import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpParams } from "@angular/common/http";


@Injectable()
export class MusicService {

    private _musicUrl="https://ngmusicdb.herokuapp.com/api/getMusic"


  constructor(private _http:Http) {
  }

  public search(searchTerm:string): Observable<any> {   
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let myParams = new HttpParams().set("artists.name", searchTerm);
    //let options = new RequestOptions({params: myParams });
    return this._http.get(this._musicUrl,{
        params: myParams
      })
    .map(response => response.json())
      .catch(this.handleError)
  }

  public getAlbums(artistName:string)
  {
    let myParams : URLSearchParams = new URLSearchParams();
	myParams.set('name', artistName);
    //let options = new RequestOptions({params: myParams });
    return this._http.get(this._musicUrl,{
        search: myParams
      })
    .map(response => response.json())
      .catch(this.handleError)
     
  }


   private handleError(error:Response){
    return Observable.throw(error.statusText || "server error")
}
}