import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(private httpClient: HttpClient) { }

    getRound(roomName1: string, roomName: string): Observable<any> {
        // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/GetRoundNumber');
        return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/GetRoundNumber');
    }


    getTeamMembers(): Observable<any[]> {
        // return this.httpClient.get<any[]>('https://gathering.local:7248/GatheringRoom/getThePlayers');
        return this.httpClient.get<any[]>('http://gathering.local:5000/GatheringRoom/getThePlayers');
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
   
    // startTheGame(roomName1: string, roomName: string) {
    //     // return this.httpClient.post('https://' + roomName1 + '.local:7248/api/' + roomName + '/StartStopGame?startGame=true', true);
    //     return this.httpClient.post('http://' + roomName1 + '.local:5000/api/' + roomName + '/StartStopGame?startGame=true', true);
    // }

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
    isGameStarted() {
        return this.httpClient.get('https://fort.local:7248/api/FortRoom/IsGameStarted');
    }

    GameStatus(roomName1: string, roomName: string) {
        // return this.httpClient.get('https://' + roomName1 + '.local:7248/api/' + roomName + '/RoomStatus', { responseType: 'text' });
        return this.httpClient.get('http://' + roomName1 + '.local:5000/api/' + roomName + '/RoomStatus', { responseType: 'text' });

    }
    RoomTime() {
        // return this.httpClient.get<number>('https://' + roomName1 + '.local:7248/api/' + roomName + '/CurrentTime');
        return this.httpClient.get<number>('http://localhost:5221/api/Catchy/CurrentTime');
    }



}
