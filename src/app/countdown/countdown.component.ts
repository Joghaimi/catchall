import { Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  name="Ready"
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.name="go";
      console.log("Test")
   }, 1000);
  }
  

}
