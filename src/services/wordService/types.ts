type VocabularyEntryType = {
  definition: string
}

export type VocabularyType = {
  [key: string]: VocabularyEntryType
}

export interface IWordService {
  vocabulary: VocabularyType | null
  checkWord(word: string): Promise<string | null>
}
