import type { ICell } from './types'

export class Cell implements ICell {
  readonly x: number
  readonly y: number
  letter: string | null
  picked: boolean

  constructor(x: number, y: number) {
    this.x = x
    this.y = y

    this.letter = null
    this.picked = false
  }

  setLetter(letter: string | null): void {
    this.letter = letter
  }

  get getLetter(): string | null {
    return this.letter
  }

  get isPicked(): boolean {
    return this.picked
  }

  togglePick(): void {
    this.picked = !this.picked
  }
}
