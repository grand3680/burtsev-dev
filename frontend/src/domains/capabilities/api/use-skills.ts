import { useSkillsQuery, type SkillsQuery } from '@shared/api/generated'
import { useLanguage } from '@shared/i18n/use-language'
import { toGqlLanguage } from '@shared/api/gql-language'

export type SkillGroup = SkillsQuery['skills'][number]

/** Навыки, сгруппированные по категориям, на текущем языке UI. */
export function useSkills() {
  const { language } = useLanguage()
  return useSkillsQuery({ variables: { lang: toGqlLanguage(language) } })
}
