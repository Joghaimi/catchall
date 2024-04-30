import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player, Team } from '../models/player';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(private httpClient: HttpClient) { }

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

    clearGatheringRoomMember() {
        // return this.httpClient.get('https://gathering.local:7248/GatheringRoom/GoToTheNextRoom');
        return this.httpClient.get('http://gathering.local:5000/GatheringRoom/GoToTheNextRoom');
    }

    isOccupied() {
        // return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsOccupied');
        return this.httpClient.get('http://fort.local:5000/api/FortRoom/IsOccupied');
    }


    isOccupiedByName(roomName: string) {
        // return this.httpClient.get('https://' + roomName + '.local:7248/api/' + roomName + '/IsOccupied');
        return this.httpClient.get('http://' + roomName + '.local:5000/api/' + roomName + '/IsOccupied');
    }
    isOccupiedByName2(roomName: string, roomName2: string) {
        // return this.httpClient.get('https://' + roomName + '.local:7248/api/' + roomName2 + '/IsOccupied');
        return this.httpClient.get('http://' + roomName + '.local:5000/api/' + roomName2 + '/IsOccupied');
    }



    startTheGame() {
        // return this.httpClient.post('https://' + roomName1 + '.local:7248/api/' + roomName + '/StartStopGame?startGame=true', true);
        return this.httpClient.post('http://localhost:5221/api/Catchy/RoomStatus?gameStatus=Started', true);
    }




    getTeamMembersAndScore(roomName1: string, roomName: string): Observable<any> {
        // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/ReturnScore');
        return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/ReturnScore');
    }
    getScore(roomName1: string, roomName: string): Observable<any> {
        // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/GetScore');
        return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/GetScore');
    }







}
