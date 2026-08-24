import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@shared/ui/card'
import { Badge } from '@shared/ui/badge'
import { Reveal } from '@shared/ui/reveal'
import { FetchFlow } from '@shared/ui/fetch-flow'
import { useSkills } from '../api/use-skills'

/** Навыки, загружаемые с бэкенда, с наглядной анимацией похода за данными. */
export function SkillsPanel() {
  const { t } = useTranslation('capabilities')
  const { data, loading, error } = useSkills()

  if (loading) return <FetchFlow label={t('skills.loading')} />
  if (error) return <p className="text-center text-sm text-red-500">{t('skills.error')}</p>

  const groups = [...(data?.skills ?? [])].sort((a, b) => a.order - b.order)
  if (groups.length === 0) return null

  return (
    <div>
      <h3 className="mb-6 text-xl font-bold">{t('skills.title')}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.08}>
            <Card className="h-full">
              <CardContent className="pt-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item} className="bg-card">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
