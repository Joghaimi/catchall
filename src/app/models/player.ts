export interface Player {
    id?: string,
    billno?: string,
    firstname?: string,
    lastname?: string
    score?: number
    winNumber:number
}


export interface Team {
    teamName: string,
    player: Player[]
}
export interface TopScore {
    score: number,
    name: string
}
export enum GameMode {
    inTeam,
    inWar
}

export enum GameStage {
    playVideo,
    getPlayers,
    SelectGameMode,
    TeamName,
    CountDown,
    Go,
    winner
}
export interface Score {
    id?: string,
    teamName?: string,
    teamScore?: number
}
