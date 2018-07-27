import {Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `<h1>Hello {{message}}</h1> <br/> 

  <app-user *ngFor="let n of childNameArray" 
  [Name]="n">
  </app-user>
`,
})
export class AdminComponent {

  message : string = "I am Parent";
  childmessage : string = "I am passed from Parent to child component"
  childNameArray = ['foo','koo',' ','moo','too','hoo',''];

}
