import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms';

import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-root',
  template: `
      <textarea cols="30" rows="4" [(ngModel)] = "str"></textarea>
      <p><button (click)="pushMe()">pushMeToLog</button></p>
  `
})

export class AppComponent {
  title = 'app works!';
  str:string;
  //console.log(this.str);

  
  
  


  constructor() {
    //let now = moment(new Date()); // add this 2 of 4
    //let end = moment("2018-07-26");
    
    //let playerName: string;
    
    //let duration = moment.
    //let hours = duration.hours;
    //let days  = duration.asDays;
    
    //console.log(duration.asHours); // add this 3 of 4
    //console.log(now.add(7, 'days').format()); // add this 4of 4
    //console.log(now.format());
    
    //console.log('The current date is ' + now.diff(end,'hours') + ' ago');
  }

  pushMe() {
    console.log( "TextAreaComponent::str: " + this.str);
     let now = moment(new Date()); // add this 2 of 4
    let end = moment(this.str);
    console.log('The current date is ' + now.diff(end,'hours') + ' ago');

}

 

}