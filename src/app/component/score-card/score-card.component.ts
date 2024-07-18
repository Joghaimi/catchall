import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {


  @Input() Score: String |any= "0"; // decorate the property with @Input()
  @Input() Order: number = 1; // decorate the property with @Input()
  @Input() TeamName: string|any = "teamName"; // decorate the property with @Input()
  @Input() Date: string = "teamName"; // decorate the property with @Input()



  constructor() { }

  ngOnInit(): void {
  }


}
