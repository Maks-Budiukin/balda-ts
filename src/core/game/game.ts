import type { GameState, IGame } from './types'
import type { IPlayer } from '../player/types'
import type { IBoard } from '../board/types'
import type { IWordService } from '@/services/wordService/types'

const initState: GameState = {
  gameStarted: false,
  gameEnded: false,
  players: [],
  currentPlayerIndex: 0,
  submittedWords: [],
  skippedTurns: 0,
  winners: [],
}

export class Game implements IGame {
  state: GameState
  board: IBoard
  wordService: IWordService

  constructor(board: IBoard, players: IPlayer[], wordService: IWordService) {
    this.state = {
      ...initState,
      players,
    }
    this.board = board
    this.wordService = wordService
  }

  blockSubmit(): string | boolean {
    if (!this.board.state.placedCell) {
      return 'Нужно поставить новую букву'
    } else if (this.board.state.selectedCells.length < 2) {
      return 'Выделите слово длинее одной буквы'
    } else if (!this.board.state.selectedCells.includes(this.board.state.placedCell)) {
      return 'Слово должно содержать новую букву'
    } else if (this.state.submittedWords.includes(this.board.state.pickedWord)) {
      return 'Такое слово уже называли'
    } else {
      return false
    }
  }

  async submitWord(): Promise<void> {
    const word = this.board.state.pickedWord

    const definition = await this.wordService.checkWord(word)

    if (definition) {
      this.state.submittedWords.push(word)
      this.state.players[this.state.currentPlayerIndex].addToScoreBoard(word, definition)
      this.board.state.placedCell = null
      this.board.state.openedCells += 1
      if (this.board.state.openedCells === this.board.state.size ** 2) {
        this.endGame()
      }
      this.board.unpickWord()
      this.state.skippedTurns = 0
      this.passTurn()
    } else {
      window.alert('Мы не знаем такого слова')
    }
  }

  passTurn(): void {
    if (this.state.players[this.state.currentPlayerIndex + 1]) {
      this.state.currentPlayerIndex += 1
    } else {
      this.state.currentPlayerIndex = 0
    }
  }

  skipTurn(): void {
    this.state.skippedTurns += 1

    if (this.state.players.length === this.state.skippedTurns) {
      this.endGame()
      return
    }

    this.board.unplaceLetter()
    this.passTurn()
  }

  async initGame(): Promise<void> {
    this.board.fill()
    this.board.placeInitWord()
  }

  startGame(): void {
    this.state.gameEnded = false
    this.state.gameStarted = true
    this.initGame()
  }

  getWinner(): void {
    const result = this.state.players.reduce(
      (acc: { bestScore: number; winners: IPlayer[] }, player: IPlayer) => {
        const score = player.totalScore
        if (score > acc.bestScore) {
          return { bestScore: score, winners: [player] }
        } else if (score === acc.bestScore) {
          return {
            bestScore: acc.bestScore,
            winners: [...acc.winners, player],
          }
        }
        return acc
      },
      { bestScore: 0, winners: [] },
    )

    this.state.winners = result.winners
  }

  endGame(): void {
    this.state.gameStarted = false
    this.getWinner()

    const score = this.state.winners[0].totalScore

    if (this.state.winners.length === 1) {
      window.alert(
        `Конец игры! Победил ${this.state.winners[0].getPlayerName} с феноменальным счётом в ${score} очков!`,
      )
    } else if (this.state.winners.length === this.state.players.length) {
      window.alert(`Ничья! Все игроки набрали по ${score} очков!`)
    } else {
      const names = this.state.winners.map((player) => player.getPlayerName)

      window.alert(`Конец игры! Победили ${names.join(', ')}, у каждого из них ${score} очков!`)
    }

    this.state.gameEnded = true
  }
}
