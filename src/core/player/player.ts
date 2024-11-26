import type { IPlayer, ScoreObject } from './types'

export class Player implements IPlayer {
  private playerNumber: number
  scoreBoard: ScoreObject[]
  totalScore: number

  constructor(playerNumber: number) {
    this.playerNumber = playerNumber
    this.scoreBoard = []
    this.totalScore = 0
  }

  addToScoreBoard(word: string, definition: string): void {
    this.scoreBoard.push({ word, definition })
    this.totalScore += word.length
  }

  get getPlayerName(): string {
    return `Player ${this.playerNumber}`
  }
}
