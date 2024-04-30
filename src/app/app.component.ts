import { Component } from '@angular/core';
import { TeamService } from './Services/TeamService';
import { Team } from './models/player';

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
  team: Team = { player: [] };
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
  // game() {

  //   let isTimerStarted = false;
  //   let timerIsSet = false;
  //   setInterval(() => {
  //     if (this.StartTheGame) {



  //       // Send Start The Game
  //       // Start The Timer
  //       this.teamService.RoomTime().subscribe(
  //         time => {
  //           this.gameTime = time;
  //           timerIsSet = true;
  //         }
  //       );
  //       //

  //     }




  //   }, 1000);
  // }



  myFunction() {
    this.displayVideo = false;
    this.displayStartButton = true;
    this.numberOfPlayer = 1;
    console.log("--------->>>");
  }
  getPlayers() {
    if (this.StartTheGame)
      return;
    this.teamService.getTeamMembers().subscribe(
      e => {
        this.team.player = e;
        console.log("this.team.player[0].firstName");
        console.log(this.team.player[0].firstname);
        this.team.player.forEach(
          player => {
            player.score = 0;
          }
        );
        this.numberOfPlayer = this.team.player.length;
        // Send Teams To The Game 
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
                      this.StartTheGame=false;
                      window.location.reload();
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
    );
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
