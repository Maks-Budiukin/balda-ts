export interface ICell {
  x: number
  y: number

  setLetter(letter: string | null): void
  getLetter: string | null
  isPicked: boolean
  togglePick(): void
}
