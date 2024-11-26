import type { IPlayer } from '../player/types'

export type GameState = {
  gameStarted: boolean
  gameEnded: boolean
  players: IPlayer[]
  currentPlayerIndex: number
  submittedWords: string[]
  skippedTurns: number
  winners: IPlayer[]
}

export interface IGame {
  state: GameState

  blockSubmit(): string | boolean
  submitWord(): Promise<void>
  passTurn(): void
  skipTurn(): void
  initGame(): Promise<void>
  startGame(): void
}
