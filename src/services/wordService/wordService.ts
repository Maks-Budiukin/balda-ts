import type { IWordService, VocabularyType } from './types'

export class WordService implements IWordService {
  vocabulary: VocabularyType | null

  constructor() {
    this.vocabulary = null
  }
  async fetchData(): Promise<void> {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Harrix/Russian-Nouns/refs/heads/main/src/data.json',
      )
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      this.vocabulary = await response.json()
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    }
  }

  async checkWord(word: string): Promise<string | null> {
    if (!this.vocabulary) {
      await this.fetchData()
    }
    const lowercaseWord = this.vocabulary?.[word.toLowerCase()]

    if (lowercaseWord) {
      return lowercaseWord.definition
    }
    return null
  }
}
