import { Component } from '@angular/core';
import { TeamService } from './Services/TeamService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catchall';
  displayVideo = true;
  displayStartButton = false;
  StartTheGame = false;

  numberOfPlayer = 4;
  player1 = "Player 1";
  player2 = "Player 2";
  player3 = "Player 3";
  player4 = "Player 4";

  gameTime = 360;

  /**
   *
   */
  constructor(private teamService: TeamService) {
    // this.game();
  }
  game() {

    let isTimerStarted = false;
    let timerIsSet = false;
    setInterval(() => {
      if (this.StartTheGame) {
        // Send Start The Game
        // Start The Timer
        this.teamService.RoomTime().subscribe(
          time => {
            this.gameTime = time;
            timerIsSet = true;
          }
        );
        //

      }






      // this.teamService.GameStatus(this.gameUrl1, this.gameUrl).subscribe(
      //   e => {
      //     this.gameStatus = e;
      //   }
      // );
      // // =====> Timer 
      // let tmerNotSetAndGameStarted = (!timerIsSet && this.gameStatus != "Started");
      // if (this.gameStatus != "NotStarted" || tmerNotSetAndGameStarted) {
      //   // Get Timer 
      //   this.teamService.RoomTime(this.gameUrl1, this.gameUrl).subscribe(
      //     time => {
      //       this.gameTotalTime = time;
      //       timerIsSet = true;
      //     }
      //   );
      //   this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
      //     e => {
      //       this.team = e;
      //     }
      //   );
      // }

      // if (this.gameStatus == "Started" && !isTimerStarted && timerIsSet) {
      //   this.startTimer();
      //   isTimerStarted = true;
      //   this.teamService.getTeamMembersAndScore(this.gameUrl1, this.gameUrl).subscribe(
      //     e => {
      //       this.team = e;
      //       this.totalScore = this.team.darkRoomScore + this.team.divingRoomScore + this.team.darkRoomScore
      //       + this.team.floorIsLavaRoomScore + this.team.fortRoomScore ;
      //     }
      //   );
      //   console.log("Time Started");
      // }
      // if (this.gameStatus == "Empty"){
      //   isTimerStarted =false;
      //   timerIsSet =false;
      // }



    }, 1000);
  }



  myFunction() {
    this.displayVideo = false;
    this.displayStartButton = true;
    this.numberOfPlayer = 1;
    console.log("--------->>>");
  }
  getPlayers() {
    if (this.StartTheGame)
      return;
    this.teamService.startTheGame().subscribe(
      e => {
        this.StartTheGame = true;
        let PlayerNamesSent = false;
        setInterval(() => {
          if (this.StartTheGame) {
            // Send Start The Game
            if (!PlayerNamesSent) {
              // Send Player Name
              PlayerNamesSent = true;
              this.numberOfPlayer = 2;
            }
            // Update Time 
            this.teamService.RoomTime().subscribe(
              time => {
                this.gameTime = time;
              }
            );
            // Update Score
          }
        }, 1000);
      }
    );




  }


}
