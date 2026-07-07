export type NewsCategory = 'Spuštění' | 'Přihlášení' | 'Chatbot' | 'Materiály'

export type NewsItem = {
  id: string
  title: string
  description: string
  source: string
  publishedAt: string
  category: NewsCategory
  trend: 'Proběhlo' | 'Probíhá' | 'Připravuje se'
  linkType: 'project' | 'detail'
  projectId?: string
  details: string[]
}

export const aiNewsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Příprava webové stránky AI akademie',
    description:
      'Webový portál AI akademie byl dokončen v 08/2026 a nyní probíhá příprava rozvojových úprav pro další školní rok.',
    source: 'AI akademie',
    publishedAt: '08/2026',
    category: 'Spuštění',
    trend: 'Proběhlo',
    linkType: 'project',
    projectId: 'web-ai-akademie',
    details: [
      'Byl dokončen web AI akademie jako centrální rozcestník programu, projektů a harmonogramu.',
      'Nasazeny jsou sekce novinky, kalendář akcí, fotogalerie a části pro žáky i učitele.',
      'Pro další školní rok jsou připraveny navazující funkční a obsahové úpravy.',
    ],
  },
  {
    id: 'news-2',
    title: 'Formulář pro přihlášení do AI akademie',
    description:
      'V září 2026 bude spuštěn formulář pro přihlášení do AI akademie na školní rok 2026/2027.',
    source: 'AI akademie',
    publishedAt: '09/2026',
    category: 'Přihlášení',
    trend: 'Připravuje se',
    linkType: 'detail',
    details: [
      'Formulář bude obsahovat volbu modelu AI akademie a základní kontaktní údaje.',
      'Po odeslání obdrží uchazeč potvrzení a další postup k zahájení programu.',
      'Přihlášky budou navázané na organizaci kapacit workshopů a projektových týmů.',
    ],
  },
  {
    id: 'news-3',
    title: 'Napojení chatbota Matyho na AI',
    description:
      'V období září až říjen 2026 bude probíhat napojení chatbota Matyho na AI služby a úpravy jeho odpovědí.',
    source: 'AI akademie',
    publishedAt: '09-10/2026',
    category: 'Chatbot',
    trend: 'Připravuje se',
    linkType: 'project',
    projectId: 'chatbot-mgo',
    details: [
      'Proběhne integrace chatbota Matyho s AI modelem a školní znalostní bází.',
      'Součástí projektu je testování odpovědí, bezpečnostních limitů a kvality výstupů.',
      'Vývoj i změny budou průběžně viditelné v sekci projektu.',
    ],
  },
]
