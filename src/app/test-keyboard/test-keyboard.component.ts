import { Component, OnInit } from '@angular/core';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-test-keyboard',
  templateUrl: './test-keyboard.component.html',
  styleUrls: ['./test-keyboard.component.css']
})
export class TestKeyboardComponent implements OnInit {

  keyboard!: Keyboard;
  teamName="";
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.teamName = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

}
