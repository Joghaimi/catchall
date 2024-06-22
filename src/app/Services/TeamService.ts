import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameMode, Player, Team, TopScore } from '../models/player';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(private httpClient: HttpClient) { }

    SelectGameMode(gameMode: GameMode) {
        if(gameMode == GameMode.inTeam)
            return this.httpClient.post('http://catchy.local:5221/api/Catchy/GameMode?mode=inTeam' , gameMode);
        else
            return this.httpClient.post('http://catchy.local:5221/api/Catchy/GameMode?mode=inWar' , gameMode);

    }




    TopScore() {
        return this.httpClient.get<TopScore>('http://catchy.local:5221/api/Catchy/TopScore');
    }

    RoomTime() {
        return this.httpClient.get<number>('http://catchy.local:5221/api/Catchy/CurrentTime');
    }
    SendTeamMamber(Team: Team) {
        return this.httpClient.post('http://catchy.local:5221/api/Catchy/ReceiveScore', Team);
    }
    getTeamScore(): Observable<Team> {
        // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/GetScore');
        return this.httpClient.get<Team>('http://catchy.local:5221/api/Catchy/GetScore');
    }

    getRound(roomName1: string, roomName: string): Observable<any> {
        return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/GetRoundNumber');
    }
    getTeamMembers(): Observable<Player[]> {
        return this.httpClient.post<Player[]>('https://qmdug12n2k.execute-api.us-east-1.amazonaws.com/dev/getcatchywallplayers', { "username": "frenzi", "password": "frenzi" });
    }
    markBillAsVoid(paramter: any): Observable<any> {
        return this.httpClient.post<any>('https://qmdug12n2k.execute-api.us-east-1.amazonaws.com/dev/markcatchywallsync', { "username": "frenzi", "password": "frenzi", "bills": paramter });
    }


    startTheGame() {
        // return this.httpClient.post('https://' + roomName1 + '.local:7248/api/' + roomName + '/StartStopGame?startGame=true', true);
        return this.httpClient.post('http://localhost:5221/api/Catchy/RoomStatus?gameStatus=Started', true);
    }
    getTeamMembersAndScore(roomName1: string, roomName: string): Observable<any> {
        return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/ReturnScore');
    }
    getScore(roomName1: string, roomName: string): Observable<any> {
        return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/GetScore');
    }



}
