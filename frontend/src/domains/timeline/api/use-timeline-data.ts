import {
  useExperiencesQuery,
  useProjectsQuery,
  type ExperiencesQuery,
  type ProjectsQuery
} from '@shared/api/generated'
import { useLanguage } from '@shared/i18n/use-language'
import { toGqlLanguage } from '@shared/api/gql-language'

export type ExperienceItem = ExperiencesQuery['experiences'][number]
export type ProjectItem = ProjectsQuery['projects'][number]

/** Опыт работы с текущим языком UI. `skip` откладывает запрос (напр. до скролла в вьюпорт). */
export function useExperiences(skip = false) {
  const { language } = useLanguage()
  return useExperiencesQuery({ variables: { lang: toGqlLanguage(language) }, skip })
}

/** Проекты с текущим языком UI. */
export function useProjects(skip = false) {
  const { language } = useLanguage()
  return useProjectsQuery({ variables: { lang: toGqlLanguage(language) }, skip })
}
