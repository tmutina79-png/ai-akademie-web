import { Globe, MessageSquareQuote, type LucideIcon } from 'lucide-react'

export type ProjectItem = {
  id: string
  title: string
  description: string
  tech: string[]
  status: string
  owner: string
  icon: LucideIcon
  image: string
}

export const projects: ProjectItem[] = [
  {
    id: 'online-ai-akademie-mgo',
    title: 'Online AI akademie pro všechny žáky MGO',
    description:
      'Připravovaný projekt online akademie pro celé gymnázium. Po absolvování žáci zvládnou základy i pokročilejší funkce AI nástrojů.',
    tech: ['AI nástroje', 'E-learning', 'Interaktivní obsah'],
    status: 'Připravuje se',
    owner: 'Žáci a učitelé',
    icon: Globe,
    image: '/mgo-logo.jpeg',
  },
  {
    id: 'web-ai-akademie',
    title: 'Příprava webové stránky AI akademie',
    description:
      'Vznik webu AI akademie od struktury obsahu po nasazení a navazující rozvoj pro další školní rok.',
    tech: ['React', 'UI/UX', 'Publikace obsahu'],
    status: 'Dokončeno (08/2026), další rozvoj připraven',
    owner: 'Žáci a učitelé',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chatbot-mgo',
    title: 'Chatbot MATY na stránkach Matičního gymnázia Ostrava',
    description:
      'Žáci navrhli a otestovali asistenta pro rychlé odpovědi na nejčastější dotazy studentů.',
    tech: ['Prompting', 'UX testování', 'Nasazení na web'],
    status: 'Běží a dále se rozvíjí',
    owner: 'Žáci',
    icon: MessageSquareQuote,
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'web-olympiada-mgo',
    title: 'Webové stránky s možností online přihlášení na Olympiádu MGO',
    description:
      'Projekt byl dokončen v červnu 2026 a nyní se připravují úpravy pro další školní rok.',
    tech: ['React', 'Formuláře', 'Validace dat'],
    status: 'Dokončeno (06/2026), úpravy pro příští rok',
    owner: 'Žáci',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  },
]
