export type HeroHighlightTone = 'indigo' | 'amber' | 'emerald'

export type HeroHighlightItem = {
  id: string
  label: string
  title: string
  tone: HeroHighlightTone
  to?: string
}

export const heroHighlights: HeroHighlightItem[] = [
  {
    id: 'today-block',
    label: 'Tematický plán',
    title: 'Příprava tematického plánu AI akademie pro žáky',
    tone: 'indigo',
  },
  {
    id: 'upcoming-event',
    label: 'Nadcházející akce',
    title: 'Workshop: AI ve výuce webu',
    tone: 'amber',
  },
  {
    id: 'new-material',
    label: 'Akademie pro žáky',
    title: '2 modely AI akademie',
    tone: 'emerald',
    to: '/akademie-zaci',
  },
]
