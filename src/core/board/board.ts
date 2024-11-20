import { Cell } from '../cell/cell'
import type { ICell } from '../cell/types'

import type { IBoard, IBoardState } from './types'

const initState: IBoardState = {
  size: 0,
  initWord: '',
  cellsMap: [],
  openedCells: 0,
  placedCell: null,
  pickedWord: '',
  selectedCells: [],
}

export class Board implements IBoard {
  state: IBoardState

  constructor(initWord: string) {
    this.state = {
      ...initState,
      size: initWord.length,
      initWord,
    }
  }

  fill(): void {
    for (let x = 0; x <= this.state.size - 1; x += 1) {
      this.state.cellsMap[x] = []
      for (let y = 0; y <= this.state.size - 1; y += 1) {
        const cell = new Cell(x, y)
        this.state.cellsMap[x][y] = cell
      }
    }
  }

  placeInitWord(): void {
    const middleRow = Math.floor(this.state.initWord.length / 2)
    for (let i = 0; i <= this.state.initWord.length - 1; i += 1) {
      this.state.cellsMap[i][middleRow].setLetter(this.state.initWord[i])
    }
    this.state.openedCells += this.state.initWord.length
  }

  getCell(x: number, y: number): ICell | null {
    if (this.state.cellsMap[x]?.[y]) {
      return this.state.cellsMap[x][y]
    } else {
      return null
    }
  }

  getNeighbors(x: number, y: number, callback?: (neighbors: ICell[]) => any): any {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    const neighbors: ICell[] = []

    directions.map(([j, k]) => {
      const neighborX = x + j
      const neighborY = y + k

      const cell = this.getCell(neighborX, neighborY)

      if (cell) {
        neighbors.push(cell)
      }
    })

    if (callback) {
      return callback(neighbors)
    } else {
      return neighbors
    }
  }

  canPlaceLetter(x: number, y: number): boolean {
    if (this.state.placedCell || this.getCell(x, y)?.getLetter) {
      return false
    }

    return this.getNeighbors(x, y, (neighbors): boolean => neighbors.some((cell) => cell.getLetter))
  }

  placeLetter(x: number, y: number, letter: string): void {
    if (this.canPlaceLetter(x, y)) {
      const cell = this.getCell(x, y)
      cell?.setLetter(letter)
      this.state.placedCell = cell
    }
  }

  unplaceLetter(): void {
    if (this.state.placedCell) {
      this.state.placedCell.setLetter(null)
    }
    this.state.placedCell = null
    this.unpickWord()
  }

  unpickWord(): void {
    this.state.selectedCells.forEach((cell) => cell.togglePick())
    this.state.selectedCells = []
    this.state.pickedWord = ''
  }

  togglePick(x: number, y: number): void {
    if (!this.state.placedCell) {
      return
    }

    const cell = this.getCell(x, y)
    if (!cell || !cell.getLetter) {
      return
    }

    const lastSelectedCell = this.state.selectedCells[this.state.selectedCells.length - 1]

    if (!cell.isPicked) {
      if (
        this.state.selectedCells.length === 0 ||
        this.getNeighbors(lastSelectedCell.x, lastSelectedCell.y, (neighbors) =>
          neighbors.includes(cell),
        )
      ) {
        this.state.pickedWord += cell.getLetter
        this.state.selectedCells.push(cell)
        cell.togglePick()
      }
    } else {
      if (lastSelectedCell === cell) {
        this.state.pickedWord = this.state.pickedWord.slice(0, -1)
        this.state.selectedCells.pop()
        cell.togglePick()
      }
    }
  }
}
