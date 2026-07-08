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
          'Projekt byl schválen, byla podepsána veřejnoprávní smlouva (ev. č. 0568/2026/Kaš) a projekt je připraven k realizaci.',
        status: 'hotovo',
        details: [
          'Byla uzavřena veřejnoprávní smlouva 0568/2026/Kaš.',
          'Byla připravena technická specifikace vybavení pro výuku a workshopy.',
        ],
      },
      {
        id: 'tl-2',
        date: '2026-03-15',
        title: 'Školení pedagogů (leden - říjen)',
        description:
          'Garanti projektu procházejí intenzivním profesním rozvojem v oblasti generativní AI, vývoje aplikací, GitHub Copilotu a praktického využití AI ve výuce i projektové práci.',
        status: 'probiha',
        details: [
          'AI v praxi: od nápadu k prototypu (březen - květen 2026, Masarykova univerzita, online).',
          'Počítač ve škole 2026 (31. 3. - 2. 4. 2026, Nové Město na Moravě, prezenční účast).',
          'MODAM 2026 (12. 6. 2026, FEI VŠB-TU Ostrava).',
          'GitHub Copilot ve VS Code (16. 6. 2026, online školení).',
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
        id: 'tl-4b',
        date: '2026-09-01',
        title: 'Nákup HW a SW (srpen - září)',
        description:
          'V období srpen až září dojde k nakoupení potřebného hardwaru a softwaru pro realizaci projektu.',
        status: 'planovano',
        details: [
          'Pořízení hardwarového vybavení pro výuku a workshopové aktivity.',
          'Pořízení a instalace potřebného softwarového zázemí.',
        ],
      },
      {
        id: 'tl-5',
        date: '2026-09-05',
        title: 'Příprava, marketing a zápis žáků',
        description:
          'Spuštění náborové kampaně, otevření zápisu do AI Code Club MGO, převzetí techniky, instalace AI aplikací a povinné označení majetku financování.',
        status: 'probiha',
        details: [
          'Probíhá propagace mezi žáky a třídami.',
          'Dokončuje se příprava promo materiálů k podzimnímu programu.',
        ],
      },
      {
        id: 'tl-5b',
        date: '2026-09-15',
        title: 'Vytvoření 3 produktů (květen - září 2026)',
        description:
          'V období květen až září byly v rámci projektu připraveny a rozvinuty tři konkrétní produktové výstupy publikované v sekci Projekty.',
        status: 'hotovo',
        details: [
          'Příprava webové stránky AI akademie.',
          'Chatbot MATY na stránkach Matičního gymnázia Ostrava.',
          'Webové stránky s možností online přihlášení na Olympiádu MGO.',
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
        title: 'Workshop: AI ve Studentské firmě MGO a implementace v praxi',
        description:
          'Akci připravuje Mgr. Jana Moricová se svými žáky. Program je zaměřený na AI ve studentské firmě a její praktickou implementaci.',
        status: 'planovano',
        details: [
          'Akci připravuje Mgr. Jana Moricová se svými žáky.',
          'Program je zaměřený na AI ve studentské firmě a její praktickou implementaci.',
        ],
      },
      {
        id: 'tl-9',
        date: '2026-11-05',
        title: 'Workshop: Prezentace hotových produktů žáků MGO',
        description:
          'Slavnostní prezentace hotových projektů, webů a 3D modelů vytvořených za pomoci AI.',
        status: 'planovano',
        details: ['Závěrečné veřejné představení výstupů žáků a evaluace projektu.'],
      },
      {
        id: 'tl-10',
        date: '2026-11-30',
        title: 'Ukončení realizace projektu (věcná část)',
        description:
          'Do tohoto data musí být dokončena věcná realizace projektu Matiční AI Akademie v souladu se smlouvou.',
        status: 'planovano',
        details: [
          'Termín dokončení realizace projektu: 30. 11. 2026.',
          'Do tohoto data musí být dosaženo účelu dotace a uhrazeny uznatelné výdaje v období realizace.',
        ],
      },
      {
        id: 'tl-11',
        date: '2026-12-11',
        title: 'Závěrečná zpráva a finanční vypořádání dotace',
        description:
          'Nejpozdější termín pro odevzdání závěrečné zprávy a finančního vypořádání dotace poskytovateli.',
        status: 'planovano',
        details: [
          'Termín předložení finančního vypořádání (včetně závěrečné zprávy): nejpozději 11. 12. 2026.',
          'Nevyčerpané prostředky nad 10 Kč musí být vráceny nejpozději ve stejné lhůtě.',
        ],
      },
    ],
    trainings: [
      {
        id: 'tr-1',
        date: '2026-03-01',
        title: 'AI v praxi: od nápadu k prototypu',
        provider: 'Masarykova univerzita, online',
        note: 'Průběžné online školení v období březen až květen 2026 zaměřené na převod nápadu do funkčního AI prototypu.',
      },
      {
        id: 'tr-2',
        date: '2026-03-31',
        title: 'Počítač ve škole 2026',
        provider: 'Nové Město na Moravě',
        note: 'Prezenční účast na konferenci v termínu 31. 3. - 2. 4. 2026 se zaměřením na digitální vzdělávání a školní inovace.',
      },
      {
        id: 'tr-3',
        date: '2026-06-12',
        title: 'MODAM 2026',
        provider: 'FEI VŠB-TU Ostrava',
        note: 'Odborný program zaměřený na moderní digitální a AI přístupy ve vzdělávání a technické praxi.',
      },
      {
        id: 'tr-4',
        date: '2026-06-16',
        title: 'GitHub Copilot ve VS Code',
        provider: 'Online školení',
        note: 'Praktické školení zaměřené na využití GitHub Copilotu ve Visual Studio Code při výuce, tvorbě zadání a programování.',
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
        date: '2026-03-01',
        time: 'březen - květen 2026',
        title: 'AI v praxi: od nápadu k prototypu',
        location: 'Masarykova univerzita, online',
        note: 'Průběžné online školení zaměřené na praktickou cestu od návrhu AI řešení k funkčnímu prototypu.',
      },
      {
        id: 'cal-2',
        date: '2026-03-31',
        time: '31. 3. - 2. 4. 2026',
        title: 'Počítač ve škole 2026',
        location: 'Nové Město na Moravě',
        note: 'Prezenční účast na konferenci zaměřené na digitální vzdělávání, technologie ve škole a sdílení pedagogické praxe.',
      },
      {
        id: 'cal-3',
        date: '2026-06-12',
        time: '12. 6. 2026',
        title: 'MODAM 2026',
        location: 'FEI VŠB-TU Ostrava',
        note: 'Odborná akce věnovaná moderním digitálním a AI přístupům s přesahem do vzdělávání a technické praxe.',
      },
      {
        id: 'cal-4',
        date: '2026-06-16',
        time: 'online školení',
        title: 'GitHub Copilot ve VS Code',
        location: 'Online',
        note: 'Praktické školení k efektivnímu využití GitHub Copilotu při programování, tvorbě zadání a práci učitele.',
      },
      {
        id: 'cal-5',
        date: '2026-09-22',
        time: '13:00',
        title: 'Workshop s externím partnerem z VŠB-TUO',
        location: 'Matiční gymnázium Ostrava',
        note: 'Odborná přednáška a praktický workshop s univerzitním partnerem.',
      },
      {
        id: 'cal-6',
        date: '2026-11-02',
        time: '13:30',
        title: 'Workshop: Vibecoding',
        location: 'Učebna IT',
        note: 'Praktické nasazení AI nástrojů pro rychlý vývoj aplikací a generování kódu.',
      },
      {
        id: 'cal-7',
        date: '2026-11-04',
        time: '09:00',
        title: 'Workshop: AI ve Studentské firmě MGO a implementace v praxi',
        location: 'AULA MGO',
        note: 'Dopolední blok s Ing. Tomášem Mutinou, odpolední případová studie s Mgr. Janou Moricovou.',
      },
      {
        id: 'cal-8',
        date: '2026-11-05',
        time: '13:00',
        title: 'Workshop: Prezentace hotových produktů žáků MGO',
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
