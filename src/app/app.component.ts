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
  enableRestartTheGame = false;
  hiddeBtn = false;
  team: Team = { player: [] };
  numberOfPlayer = 0;
  player1 = "Player 1";
  player2 = "Player 2";
  player3 = "Player 3";
  player4 = "Player 4";
  topScore = 0;
  gameTime = 120;

  /**
   *
   */
  constructor(private teamService: TeamService) {
    // this.game();
  }

  myFunction() {
    this.displayVideo = false;
    this.displayStartButton = true;
    this.numberOfPlayer = 1;
    console.log("--------->>>");
  }
  reload() {
    window.location.reload();
  }
  getPlayers() {
    // return;
    if (this.StartTheGame)
      return;
    this.teamService.getTeamMembers().subscribe(
      e => {
        this.hiddeBtn = true;
        setTimeout(() => {
          this.team.player = e;
          if (this.team.player.length > 0) {
            let lastBillNumber = this.team.player[this.team.player.length - 1].billno
            this.team.player = this.team.player.filter(player => player.billno == lastBillNumber)
            console.log("getTeamMembers =>");
            console.log(e);

            // Workd ..
            // this.teamService.markBillAsVoid(e).subscribe(
            //   x=>{
            //     console.log("MarkBillAsVoid =>");
            //     console.log(x);
            //   }
            // );
            this.teamService.TopScore().subscribe(
              e=>{
                this.topScore = e;
              }
            );
            this.team.player.forEach(
              player => {
                player.score = 0;
              }
            );
            // this.numberOfPlayer = this.team.player.length;
            this.numberOfPlayer = 2;
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
                          this.StartTheGame = false;
                          this.enableRestartTheGame = true;
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
        }, 5000);


      }
    );

  }


}
