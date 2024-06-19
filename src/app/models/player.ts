export interface Player {
    id?: string,
    billno?: string,
    firstname?: string,
    lastname?: string
    score?: number
}


export interface Team {
    teamName: string,
    player: Player[]
}
export interface TopScore {
    score: number,
    name: string
}
