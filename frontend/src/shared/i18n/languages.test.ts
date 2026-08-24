import { describe, it, expect } from 'vitest'
import { isLanguageCode, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './languages'

describe('languages', () => {
  it('accepts supported codes', () => {
    expect(isLanguageCode('ru')).toBe(true)
    expect(isLanguageCode('en')).toBe(true)
  })

  it('rejects unsupported codes', () => {
    expect(isLanguageCode('fr')).toBe(false)
    expect(isLanguageCode('')).toBe(false)
  })

  it('has a default within the supported set', () => {
    expect(SUPPORTED_LANGUAGES).toContain(DEFAULT_LANGUAGE)
  })
})
