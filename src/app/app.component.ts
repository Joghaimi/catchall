import { Component } from '@angular/core';
import { TeamService } from './Services/TeamService';
import { GameMode, GameStage, Score, ShowTopScore, Team, TopScore } from './models/player';
import Keyboard from "simple-keyboard";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gameMode: GameMode = GameMode.inWar;
  gameStage: GameStage = GameStage.playVideo;
  showTopScore: ShowTopScore = ShowTopScore.today;
  public get GameStage(): typeof GameStage {
    return GameStage;
  }
  public get GameMode(): typeof GameMode {
    return GameMode;
  }
  public get ShowTopScore(): typeof ShowTopScore {
    return ShowTopScore;
  }

  title = 'catchall';
  showTeamNamming = false;
  showCountDown = false;
  displayVideo = true;
  displayStartButton = false;
  StartTheGame = false;
  enableRestartTheGame = false;
  hiddeBtn = false;
  numberOfIteration = 0;
  statment = "Hi Player !";
  team: Team = {
    teamName: "", player: [
      // { firstname: "ahjm", lastname: "dai", score: 5, winNumber: 1 },
      // { firstname: "ahjm", lastname: "dai", score: 5, winNumber: 3 },
    ]
  };
  numberOfPlayer = 0;
  winnerPlayer = "Draw";
  player1 = "Player 1";
  player2 = "Player 2";
  player3 = "Player 3";
  player4 = "Player 4";
  topScore: TopScore = { name: "test", score: 0 };
  gameTime = 120;
  teamName = "";
  keyboard!: Keyboard;
  getTeamMemperResponse: any;
  videoOrTopScore = false;


  todayTopThreeScore: Score[] = [];
  thisWeekTopThreeScore: Score[] = [];
  thisMonthTopThreeScore: Score[] = [];


  constructor(private teamService: TeamService) {
    this.getTopScoreAndDisplayIt();
  }
  ngOnInit() {
    this.getTopScorePlayer();
  }
  getTopScoreAndDisplayIt() {
    let todayTopScore: Score;
    let thisWeekTopScore: Score;
    let thisMonthTopScore: Score;

    this.teamService.ThisDayTopThreeScore().subscribe(e => {
      this.todayTopThreeScore = e;
      console.log(this.todayTopThreeScore);
    });

    this.teamService.ThisWeekTopThreeScore().subscribe(e => {
      this.thisWeekTopThreeScore = e;
      console.log(this.thisWeekTopThreeScore);
    });
    this.teamService.ThisMonthTopThreeScore().subscribe(e => {
      this.thisMonthTopThreeScore = e;
      console.log(this.thisMonthTopThreeScore);
    });
    let intervalId = setInterval(() => {
      this.showTopScore = this.getNextShowTopScore(this.showTopScore);
    }, 8000);
    let biggerInterval = setInterval(() => {
      this.videoOrTopScore = !this.videoOrTopScore;
    }, 60000)


  }


  getNextShowTopScore(current: ShowTopScore): ShowTopScore {
    const enumValues = Object.values(ShowTopScore).filter(value => typeof value === 'number') as ShowTopScore[];
    const currentIndex = enumValues.indexOf(current);
    const nextIndex = (currentIndex + 1) % enumValues.length;
    return enumValues[nextIndex];
  }
  SelectGameMode(gameMode: GameMode) {
    this.gameMode = gameMode;
    // if (this.gameMode == GameMode.inWar) {
    //   this.gameTime = 180;
    //   this.SaveTeamName();
    // }
    // else {
    //   this.gameTime = 120;
    //   this.gameStage = GameStage.TeamName;
    // }


    this.teamService.SelectGameMode(gameMode).subscribe(
      e => {
        if (this.gameMode == GameMode.inWar) {
          this.gameTime = 180;
          this.SaveTeamName();
        }
        else {
          this.gameTime = 120;
          this.gameStage = GameStage.TeamName;
        }


      }
    );
  }


  getTopScorePlayer() {
    this.teamService.TopScore().subscribe(
      e => {
        this.topScore = e;
      }
    );
  }



  SaveTeamName() {
    this.gameStage = GameStage.CountDown;
    setTimeout(() => {
      this.gameStage = GameStage.Go;
      // this.showCountDown = false;
      if (this.team.player.length > 0) {
        let lastBillNumber = this.team.player[this.team.player.length - 1].billno
        this.team.player = this.team.player.filter(player => player.billno == lastBillNumber)

        // Workd ..
        // this.teamService.markBillAsVoid(this.getTeamMemperResponse).subscribe(
        //   x => {
        //     console.log("MarkBillAsVoid =>");
        //     console.log(x);
        //   }
        // );



        this.team.player.forEach(
          player => {
            player.score = 0;
          }
        );
        // this.numberOfPlayer = this.team.player.length;
        // this.numberOfPlayer = 2;
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

                      if (GameMode.inWar == this.gameMode) {
                        setTimeout(() => {
                          this.teamService.getTeamScore().subscribe(
                            score => {
                              if (score != null)
                                this.team = score;

                              if (this.team.player[0].winNumber > this.team.player[1].winNumber)
                                this.winnerPlayer = this.team.player[0].firstname + " " + this.team.player[0].lastname
                              else if (this.team.player[0].winNumber < this.team.player[1].winNumber)
                                this.winnerPlayer = this.team.player[1].firstname + " " + this.team.player[1].lastname
                              else
                                this.winnerPlayer = "draw"
                              this.gameStage = GameStage.winner;
                            }
                          )
                        }, 2000)
                      }



                      this.enableRestartTheGame = true;
                      if (this.gameMode == GameMode.inTeam) {
                        setTimeout(() => {
                          this.StartTheGame = false;
                          clearInterval(intervalId);
                          window.location.reload();
                        }, 20000);
                      } else {
                        setTimeout(() => {
                          this.StartTheGame = false;
                          clearInterval(intervalId);
                          window.location.reload();
                        }, 30000);
                      }
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
  removeVideo() {
    this.gameStage = GameStage.getPlayers;
    // this.displayVideo = false;
    // this.displayStartButton = true;
    // this.numberOfPlayer = 1;
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
    // this.gameStage = GameStage.SelectGameMode;
    // return;
    if (this.StartTheGame)
      return;
    this.teamService.getTeamMembers().subscribe(
      e => {
        this.gameStage = GameStage.SelectGameMode;

        this.hiddeBtn = true;
        this.team.player = e;
        if (this.team.player.length < 1) {
          alert("ادخل الاعبين");
          this.reload();
          return;
        }
        this.showTeamNamming = true;
        this.getTopScorePlayer();
        this.getTeamMemperResponse = e;
      }
    );

  }


}
