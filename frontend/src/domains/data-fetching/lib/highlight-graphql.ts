export type TokenKind =
  | 'keyword'
  | 'operation'
  | 'field'
  | 'argument'
  | 'variable'
  | 'type'
  | 'punctuation'
  | 'string'
  | 'number'
  | 'plain'

export interface Token {
  text: string
  kind: TokenKind
}

const KEYWORDS = new Set([
  'query',
  'mutation',
  'subscription',
  'fragment',
  'on',
  'true',
  'false',
  'null'
])

/** Tailwind classes per token kind — читаемо и в светлой, и в тёмной теме. */
export const TOKEN_CLASS: Record<TokenKind, string> = {
  keyword: 'text-fuchsia-600 dark:text-fuchsia-400',
  operation: 'text-amber-600 dark:text-amber-400',
  field: 'text-sky-600 dark:text-sky-400',
  argument: 'text-orange-600 dark:text-orange-400',
  variable: 'text-emerald-600 dark:text-emerald-400',
  type: 'text-amber-600 dark:text-amber-400',
  punctuation: 'text-muted-foreground',
  string: 'text-green-600 dark:text-green-400',
  number: 'text-teal-600 dark:text-teal-400',
  plain: 'text-foreground/90'
}

// Порядок важен: пробелы → переменные → строки → числа → имена → пунктуация.
const TOKEN_RE =
  /(\s+)|(\$[A-Za-z_]\w*)|("(?:[^"\\]|\\.)*")|(-?\d+(?:\.\d+)?)|([A-Za-z_]\w*)|([{}()[\]:!,=@.])/g

interface RawToken {
  text: string
  /** whitespace | variable | string | number | name | punctuation */
  type: 'ws' | 'variable' | 'string' | 'number' | 'name' | 'punct'
}

function scan(source: string): RawToken[] {
  const raw: RawToken[] = []
  let match: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0
  while ((match = TOKEN_RE.exec(source)) !== null) {
    if (match[1]) raw.push({ text: match[1], type: 'ws' })
    else if (match[2]) raw.push({ text: match[2], type: 'variable' })
    else if (match[3]) raw.push({ text: match[3], type: 'string' })
    else if (match[4]) raw.push({ text: match[4], type: 'number' })
    else if (match[5]) raw.push({ text: match[5], type: 'name' })
    else if (match[6]) raw.push({ text: match[6], type: 'punct' })
  }
  return raw
}

function nextMeaningful(raw: RawToken[], from: number): RawToken | undefined {
  for (let i = from + 1; i < raw.length; i++) {
    if (raw[i].type !== 'ws') return raw[i]
  }
  return undefined
}

function prevMeaningful(raw: RawToken[], from: number): RawToken | undefined {
  for (let i = from - 1; i >= 0; i--) {
    if (raw[i].type !== 'ws') return raw[i]
  }
  return undefined
}

/**
 * Лёгкий контекстный токенайзер GraphQL для статичного сниппета в CodePanel.
 * Не полноценный парсер — различает ключевые слова, поля, аргументы,
 * переменные и типы по соседним токенам.
 */
export function highlightGraphql(source: string): Token[] {
  const raw = scan(source)

  return raw.map((token, i): Token => {
    switch (token.type) {
      case 'ws':
        return { text: token.text, kind: 'plain' }
      case 'variable':
        return { text: token.text, kind: 'variable' }
      case 'string':
        return { text: token.text, kind: 'string' }
      case 'number':
        return { text: token.text, kind: 'number' }
      case 'punct':
        return { text: token.text, kind: 'punctuation' }
      case 'name': {
        if (KEYWORDS.has(token.text)) return { text: token.text, kind: 'keyword' }

        const prev = prevMeaningful(raw, i)
        const next = nextMeaningful(raw, i)

        // Имя сразу после ключевого слова операции — имя операции/фрагмента.
        if (prev?.type === 'name' && KEYWORDS.has(prev.text)) {
          return { text: token.text, kind: 'operation' }
        }
        // Имя после `:` — это тип (Language, String, ...).
        if (prev?.type === 'punct' && prev.text === ':') {
          return { text: token.text, kind: 'type' }
        }
        // Имя перед `:` — имя аргумента.
        if (next?.type === 'punct' && next.text === ':') {
          return { text: token.text, kind: 'argument' }
        }
        // Всё остальное — поле выборки.
        return { text: token.text, kind: 'field' }
      }
    }
  })
}
