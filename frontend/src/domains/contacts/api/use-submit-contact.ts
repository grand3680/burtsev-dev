import { useSubmitContactMutation } from '@shared/api/generated'

/** Тонкая обёртка над сгенерированной мутацией отправки контакта. */
export function useSubmitContact() {
  return useSubmitContactMutation()
}
