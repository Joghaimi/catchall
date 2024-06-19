import { Component } from '@angular/core';
import { TeamService } from './Services/TeamService';
import { Team, TopScore } from './models/player';
import Keyboard from "simple-keyboard";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catchall';
  showTeamNamming = false;
  showCountDown = false;
  displayVideo = true;
  displayStartButton = false;
  StartTheGame = false;
  enableRestartTheGame = false;
  hiddeBtn = false;
  team: Team = { teamName: "", player: [] };
  numberOfPlayer = 0;
  player1 = "Player 1";
  player2 = "Player 2";
  player3 = "Player 3";
  player4 = "Player 4";
  topScore:TopScore = {name:"test" ,score: 0};
  gameTime = 120;
  teamName = "";
  keyboard!: Keyboard;

  /**
   *
   */
  constructor(private teamService: TeamService) {
  }
  getTopScorePlayer() {
    this.teamService.TopScore().subscribe(
      e => {
        this.topScore = e;
      }
    );
  }




















  SaveTeamName() {
    this.showTeamNamming = false;
    this.showCountDown = true;
    setTimeout(() => {
      this.showCountDown = false;
      if (this.team.player.length > 0) {
        let lastBillNumber = this.team.player[this.team.player.length - 1].billno
        this.team.player = this.team.player.filter(player => player.billno == lastBillNumber)

        // Workd ..
        this.teamService.markBillAsVoid(e).subscribe(
          x=>{
            console.log("MarkBillAsVoid =>");
            console.log(x);
          }
        );

        this.getTopScorePlayer();


        this.team.player.forEach(
          player => {
            player.score = 0;
          }
        );
        // this.numberOfPlayer = this.team.player.length;
        this.numberOfPlayer = 2;
        // Send Teams To The Game 
        this.team.teamName = this.teamName;
        this.teamService.SendTeamMamber(this.team).subscribe(
          res => {
            this.StartTheGame = true;
            let intervalId = setInterval(() => {
              if (this.StartTheGame) {
                this.teamService.RoomTime().subscribe(
                  time => {
                    this.gameTime = time;
                    if (this.gameTime == 0) {
                      clearInterval(intervalId);
                      this.StartTheGame = false;
                      this.enableRestartTheGame = true;
                      setTimeout(() => {
                        window.location.reload();
                      },20000);

                    }
                  }
                );
                // Update Score
                this.teamService.getTeamScore().subscribe(
                  score => {
                    if (score != null)
                      this.team = score;
                  }
                )
              }
            }, 1000);
          }
        )
        console.log(this.team.player[0]);
      }
    }, 5000);
  }
  myFunction() {
    this.displayVideo = false;
    this.displayStartButton = true;
    this.numberOfPlayer = 1;
  }
  reload() {
    window.location.reload();
  }


  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }
  initKeyboard() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.teamName = input;
  };

  onKeyPress = (button: string) => {
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



  getPlayers() {
    // return;
    if (this.StartTheGame)
      return;
    this.teamService.getTeamMembers().subscribe(
      e => {
        this.hiddeBtn = true;
        this.team.player = e;
        this.showTeamNamming = true;
        this.getTopScorePlayer();
      }
    );

  }


}
