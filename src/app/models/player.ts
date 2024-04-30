export interface Player {
    id?: string,
    firstname?: string,
    lastname?: string
    score?:number
}


export interface Team {
    player: Player[]
}
