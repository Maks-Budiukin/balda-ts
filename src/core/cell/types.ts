export interface ICell {
  x: number
  y: number
  letter: string | null
  picked: boolean
  setLetter(letter: string): void
  getLetter: string | null
  isPicked: boolean
  togglePick(): void
}
