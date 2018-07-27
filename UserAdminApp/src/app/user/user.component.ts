import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template : `<h2>{{_name}}</h2>`
})
export class UserComponent implements OnInit {

  _name: string; 
  constructor(){
  }   
  ngOnInit(){
  }
@Input()
  set Name(name : string ){
      this._name = (name && name.trim()) || "I am default name"; 
  }
  get Name(){
      return this._name;
  }

}
