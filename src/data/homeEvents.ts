export type HomeEventCategory = 'Workshop' | 'Přednáška' | 'Deadline' | 'Prezentace'

export type HomeEventItem = {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  category: HomeEventCategory
  location: string
  host: string
  priority: 'Nízká' | 'Střední' | 'Vysoká'
  reminder: string
  recurring: string
}

export const homeEvents: HomeEventItem[] = [
  {
    id: 'home-event-zsbohuminska',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Společný projekt ZŠ Bohumínská Ostrava, ZŠ ČSA Bohumín a MGO. Účastníci si vyzkoušeli základy programování, AI, robotiku i práci s moderní technikou.',
    date: '2026-06-17',
    startTime: '09:00',
    endTime: '12:00',
    category: 'Workshop',
    location: 'ZŠ Bohumínská Ostrava',
    host: 'Ing. Tomáš Mutina a žáci MGO',
    priority: 'Vysoká',
    reminder: '1 den předem',
    recurring: 'Ne',
  },
  {
    id: 'home-event-1',
    title: 'Workshop s externím partnerem z VŠB-TUO',
    description:
      'Odborná přednáška a praktický workshop pod vedením přednášejícího partnera z technické univerzity.',
    date: '2026-09-22',
    startTime: '13:00',
    endTime: '16:00',
    category: 'Workshop',
    location: 'Matiční gymnázium Ostrava',
    host: 'VŠB-TU Ostrava',
    priority: 'Vysoká',
    reminder: '60 minut předem',
    recurring: 'Ne',
  },
  {
    id: 'home-event-2',
    title: 'Workshop: Vibecoding',
    description:
      'Praktické nasazení nástrojů umělé inteligence pro rychlý vývoj aplikací a generování kódu bez hluboké předchozí znalosti programování.',
    date: '2026-11-02',
    startTime: '13:30',
    endTime: '16:30',
    category: 'Workshop',
    location: 'Učebna IT',
    host: 'AI akademie MGO',
    priority: 'Vysoká',
    reminder: '1 den předem',
    recurring: 'Ne',
  },
  {
    id: 'home-event-3',
    title: 'AI ve Studentské firmě MGO a implementace v praxi',
    description:
      'Akci připravuje Mgr. Jana Moricová se svými žáky. Program je zaměřený na AI ve studentské firmě a její praktickou implementaci.',
    date: '2026-11-04',
    startTime: '09:00',
    endTime: '15:30',
    category: 'Přednáška',
    location: 'Aula MGO',
    host: 'Mgr. Jana Moricová a její žáci',
    priority: 'Vysoká',
    reminder: '1 den předem',
    recurring: 'Ne',
  },
  {
    id: 'home-event-4',
    title: 'Prezentace hotových produktů žáků MGO',
    description:
      'Slavnostní vyvrcholení kroužku, kde žáci MGO odprezentují hotové projekty, weby a 3D modely vytvořené za pomoci AI.',
    date: '2026-11-05',
    startTime: '13:00',
    endTime: '16:00',
    category: 'Prezentace',
    location: 'Aula MGO',
    host: 'Žáci AI akademie MGO',
    priority: 'Střední',
    reminder: '90 minut předem',
    recurring: 'Ne',
  },
]
