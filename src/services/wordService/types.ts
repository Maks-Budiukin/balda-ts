type VocabularyEntryType = {
  definition: string
}

export type VocabularyType = {
  [key: string]: VocabularyEntryType
}

export interface IWordService {
  checkWord(word: string): Promise<string | null>
}
