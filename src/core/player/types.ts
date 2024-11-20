export type ScoreObject = {
  word: string
  definition: string
}

export interface IPlayer {
  playerNumber: number
  scoreBoard: ScoreObject[]
  totalScore: number

  addToScoreBoard(word: string, definition: string): void
  getPlayerName: string
}
