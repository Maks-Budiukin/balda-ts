import type { ICell } from '../cell/types'

export type IBoardState = {
  size: number
  initWord: string
  cellsMap: ICell[][]
  openedCells: number
  placedCell: ICell | null
  pickedWord: string
  selectedCells: ICell[]
}

export interface IBoard {
  state: IBoardState

  init(): void
  canPlaceLetter(x: number, y: number): boolean
  placeLetter(x: number, y: number, letter: string): void
  unplaceLetter(): void
  unpickWord(): void
  togglePick(x: number, y: number): void
}
