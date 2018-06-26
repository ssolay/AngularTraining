import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class MusicService {

    private _musicUrl="https://ngmusicdb.herokuapp.com/api/getMusic"


  constructor(private _http:Http) {
  }

  public search(searchTerm:string): Observable<any> {   
	let myParams = new URLSearchParams();
	myParams.append('name', searchTerm);
    let options = new RequestOptions({params: myParams });
    return this._http.get(this._musicUrl,options)
    .map(response => response.json())
      .catch(this.handleError)
  }


   private handleError(error:Response){
    return Observable.throw(error.statusText || "server error")
}
}