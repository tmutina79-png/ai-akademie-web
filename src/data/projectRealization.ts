export type RealizationStep = {
  id: string
  title: string
  period: string
  description: string
}

export type RealizationMilestone = {
  id: string
  date: string
  title: string
  description: string
}

export const realizationSteps: RealizationStep[] = [
  {
    id: 'step-1',
    title: 'Prvotní fáze projektu (příprava a zázemí)',
    period: 'Leden 2026',
    description:
      'Schválení projektu, podpis veřejnoprávní smlouvy (ev. č. 0568/2026/Kaš) a příprava nákupu techniky: 7 iPadů, výkonný PC a dataprojektor.',
  },
  {
    id: 'step-2',
    title: 'Školení pedagogů',
    period: 'Leden - srpen 2026',
    description:
      'Intenzivní profesní rozvoj dvou garantů projektu v oblasti generativní AI, vývoje aplikací a vibecodingu včetně přípravy ukázkových zadání pro žáky.',
  },
  {
    id: 'step-3',
    title: 'Realizace webové stránky AI akademie',
    period: 'Jaro - léto 2026',
    description:
      'Na základě získaných dovedností vznikl a byl spuštěn informační a metodický portál AI akademie jako centrální bod pro sdílení pokroku a výsledků.',
  },
  {
    id: 'step-4',
    title: 'Partnerství s VŠB-TU Ostrava',
    period: 'Léto 2026',
    description:
      'Navázání oficiální spolupráce s FEI VŠB-TU Ostrava pod odbornou záštitou paní proděkanky pro rozvoj a výzkum.',
  },
  {
    id: 'step-5',
    title: 'Příprava, marketing a zápis žáků',
    period: 'Září 2026',
    description:
      'Nábor studentů do kroužku, otevření zápisu, převzetí techniky, instalace AI aplikací a označení majetku textem o financování.',
  },
]

export const realizationMilestones: RealizationMilestone[] = [
  {
    id: 'milestone-1',
    date: '22. září 2026',
    title: 'Workshop s externím partnerem z VŠB-TUO',
    description: 'Odborná přednáška a praktický workshop pod vedením univerzitního partnera.',
  },
  {
    id: 'milestone-2',
    date: '2. listopadu 2026',
    title: 'Workshop: Vibecoding',
    description: 'Praktické využití AI pro rychlý vývoj aplikací a generování kódu.',
  },
  {
    id: 'milestone-3',
    date: '4. listopadu 2026',
    title: 'AI ve Studentské firmě MGO a implementace v praxi',
    description:
      'Akci připravuje Mgr. Jana Moricová se svými žáky. Program je zaměřený na AI ve studentské firmě a její praktickou implementaci.',
  },
  {
    id: 'milestone-4',
    date: '5. listopadu 2026',
    title: 'Prezentace hotových produktů žáků MGO',
    description: 'Slavnostní vyvrcholení s prezentací projektů, webů a 3D modelů.',
  },
]
