export type GrantTimelineStatus = 'hotovo' | 'probiha' | 'planovano'

export type GrantTimelineItem = {
  id: string
  date: string
  title: string
  description: string
  status: GrantTimelineStatus
  details?: string[]
}

export type GrantPreparationItem = {
  id: string
  title: string
  description: string
  state: 'probiha' | 'ceka'
}

export type GrantTrainingItem = {
  id: string
  date: string
  title: string
  provider: string
  note: string
}

export type GrantLeafletItem = {
  id: string
  title: string
  publishedAt: string
  link: string
  description: string
}

export type GrantCalendarItem = {
  id: string
  date: string
  time: string
  title: string
  location: string
  note: string
}

export type GrantProject = {
  id: string
  title: string
  code: string
  sponsor: string
  period: string
  summary: string
  timeline: GrantTimelineItem[]
  trainings: GrantTrainingItem[]
  leaflets: GrantLeafletItem[]
  calendar: GrantCalendarItem[]
  pendingPreparation: GrantPreparationItem[]
}

export const grantProjects: GrantProject[] = [
  {
    id: 'mat-aia-2026',
    title: 'Matiční AI akademie',
    code: '0568/2026/Kaš',
    sponsor: 'Statutární město Ostrava',
    period: 'leden 2026 - listopad 2026',
    summary:
      'Projekt financovaný z rozpočtu statutárního města Ostravy propojuje AI vzdělávání, vibecoding, spolupráci s VŠB-TUO a praktické výstupy žáků i učitelů.',
    timeline: [
      {
        id: 'tl-1',
        date: '2026-01-10',
        title: 'Prvotní fáze projektu a příprava zázemí',
        description:
          'Projekt byl schválen, byla podepsána veřejnoprávní smlouva (ev. č. 0568/2026/Kaš) a připraven nákup techniky: 7 iPadů, výkonné PC a dataprojektoru.',
        status: 'hotovo',
        details: [
          'Byla uzavřena veřejnoprávní smlouva 0568/2026/Kaš.',
          'Byla připravena technická specifikace vybavení pro výuku a workshopy.',
        ],
      },
      {
        id: 'tl-2',
        date: '2026-03-15',
        title: 'Školení pedagogů (leden - srpen)',
        description:
          'Dva garanti projektu procházejí intenzivním profesním rozvojem v oblasti generativní AI, vývoje aplikací a vibecodingu včetně metodické přípravy ukázkových úloh.',
        status: 'probiha',
        details: [
          'Generativní AI ve vzdělávání (20. 1. 2026, externí vzdělávací platforma).',
          'Vibecoding pro pedagogy (8. 4. 2026, VŠB-TU Ostrava).',
          'Průběžná příprava metodických úloh pro žáky.',
        ],
      },
      {
        id: 'tl-3',
        date: '2026-06-20',
        title: 'Realizace webové stránky AI akademie',
        description:
          'Pedagogové vytvořili a spustili informační a metodický portál AI akademie jako centrální místo pro sdílení postupu, výsledků a publicity projektu.',
        status: 'probiha',
        details: [
          'Nasazena homepage, kalendář akcí a přehled projektů.',
          'Průběžně se doplňují obsahové aktualizace a harmonogram.',
        ],
      },
      {
        id: 'tl-3b',
        date: '2026-06-25',
        title: 'Založení AI Coding Club MGO',
        description:
          'V červnu byl oficiálně založen AI Coding Club MGO jako praktická platforma pro studentské projekty, vibecoding a vývoj školních AI řešení.',
        status: 'hotovo',
        details: [
          'Byl potvrzen koncept klubu, role členů a základní pravidla fungování.',
          'Klub byl navázán na výstupy projektu MAT-AIA-2026 a tematický plán pro žáky.',
        ],
      },
      {
        id: 'tl-4',
        date: '2026-08-28',
        title: 'Partnerství s VŠB-TU Ostrava',
        description:
          'Byla navázána oficiální spolupráce s FEI VŠB-TU Ostrava pod odbornou záštitou paní proděkanky pro rozvoj a výzkum.',
        status: 'probiha',
        details: [
          'Domluven odborný program pro podzimní workshopové bloky.',
          'Nastaveno průběžné metodické konzultování s univerzitním partnerem.',
        ],
      },
      {
        id: 'tl-5',
        date: '2026-09-05',
        title: 'Příprava, marketing a zápis žáků',
        description:
          'Spuštění náborové kampaně, otevření zápisu do kroužku AI akademie, převzetí techniky, instalace AI aplikací a povinné označení majetku financování.',
        status: 'probiha',
        details: [
          'Probíhá propagace mezi žáky a třídami.',
          'Dokončuje se příprava promo materiálů k podzimnímu programu.',
        ],
      },
      {
        id: 'tl-6',
        date: '2026-09-22',
        title: 'Workshop s externím partnerem z VŠB-TUO',
        description:
          'Odborná přednáška a praktický workshop pod vedením partnera z technické univerzity.',
        status: 'planovano',
        details: ['Obsah: odborná přednáška + praktický workshop se zapojením žáků.'],
      },
      {
        id: 'tl-7',
        date: '2026-11-02',
        title: 'Workshop: Vibecoding',
        description:
          'Praktické nasazení AI nástrojů pro rychlý vývoj aplikací a generování kódu.',
        status: 'planovano',
        details: ['Téma: návrh a tvorba AI aplikací bez hluboké předchozí znalosti programování.'],
      },
      {
        id: 'tl-8',
        date: '2026-11-04',
        title: 'AI ve Studentské firmě MGO a implementace v praxi',
        description:
          'Dopolední workshop s Ing. Tomášem Mutinou a odpolední případová studie s Mgr. Janou Moricovou.',
        status: 'planovano',
        details: [
          'Dopolední blok: expert Ing. Tomáš Mutina.',
          'Odpolední blok: případová studie studentské firmy MGO.',
        ],
      },
      {
        id: 'tl-9',
        date: '2026-11-05',
        title: 'Prezentace hotových produktů žáků MGO',
        description:
          'Slavnostní prezentace hotových projektů, webů a 3D modelů vytvořených za pomoci AI.',
        status: 'planovano',
        details: ['Závěrečné veřejné představení výstupů žáků a evaluace projektu.'],
      },
    ],
    trainings: [
      {
        id: 'tr-1',
        date: '2026-01-20',
        title: 'Generativní AI ve vzdělávání',
        provider: 'Externí vzdělávací platforma',
        note: 'Intenzivní příprava garantů na pokročilé využití generativních AI nástrojů ve výuce.',
      },
      {
        id: 'tr-2',
        date: '2026-04-08',
        title: 'Vibecoding pro pedagogy',
        provider: 'VŠB-TU Ostrava',
        note: 'Praktický workshop k vývoji aplikací, tvorbě zadání a metodickému vedení studentských projektů.',
      },
    ],
    leaflets: [
      {
        id: 'lf-1',
        title: 'Informační leták pro žáky a rodiče',
        publishedAt: '2026-08-25',
        link: '#',
        description: 'Představení cílů projektu, harmonogramu a podmínek zapojení.',
      },
      {
        id: 'lf-2',
        title: 'Leták k workshopům podzim 2026',
        publishedAt: '2026-09-10',
        link: '#',
        description: 'Přehled plánovaných workshopů, termínů a tematických bloků.',
      },
    ],
    calendar: [
      {
        id: 'cal-1',
        date: '2026-09-22',
        time: '13:00',
        title: 'Workshop s externím partnerem z VŠB-TUO',
        location: 'Matiční gymnázium Ostrava',
        note: 'Odborná přednáška a praktický workshop s univerzitním partnerem.',
      },
      {
        id: 'cal-2',
        date: '2026-11-02',
        time: '13:30',
        title: 'Workshop: Vibecoding',
        location: 'Učebna IT',
        note: 'Praktické nasazení AI nástrojů pro rychlý vývoj aplikací a generování kódu.',
      },
      {
        id: 'cal-3',
        date: '2026-11-04',
        time: '09:00',
        title: 'AI ve Studentské firmě MGO a implementace v praxi',
        location: 'AULA MGO',
        note: 'Dopolední blok s Ing. Tomášem Mutinou, odpolední případová studie s Mgr. Janou Moricovou.',
      },
      {
        id: 'cal-4',
        date: '2026-11-05',
        time: '13:00',
        title: 'Prezentace hotových produktů žáků MGO',
        location: 'AULA MGO',
        note: 'Slavnostní prezentace projektu, webů a 3D modelů vytvořených v rámci AI akademie.',
      },
    ],
    pendingPreparation: [
      {
        id: 'prep-1',
        title: 'Nákup materiálu',
        description: 'Dokončit nákup a převzetí vybavení: tablety, výkonné PC a dataprojektor.',
        state: 'probiha',
      },
      {
        id: 'prep-2',
        title: 'Letáky a promo materiál',
        description: 'Doplnit a finalizovat informační letáky a propagační podklady pro žáky a rodiče.',
        state: 'ceka',
      },
    ],
  },
]
