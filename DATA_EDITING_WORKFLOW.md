# DATA EDITING WORKFLOW (AI akademie web)

Tento soubor je rychlá pomůcka pro ruční správu obsahu přímo v kódu.

## Kde upravovat obsah

- Homepage kalendář akcí: `src/data/homeEvents.ts`
- Dotační projekty (timeline, školení, letáky, harmonogram): `src/data/grantProjects.ts`

## 1) Šablona pro homepage akci

Soubor: `src/data/homeEvents.ts`

```ts
{
  id: 'home-event-5',
  title: 'Název akce',
  description: 'Krátký popis akce.',
  date: '2026-11-12',
  startTime: '13:00',
  endTime: '15:00',
  category: 'Workshop', // 'Workshop' | 'Přednáška' | 'Deadline' | 'Prezentace'
  location: 'Učebna IT',
  host: 'AI akademie MGO',
  priority: 'Střední', // 'Nízká' | 'Střední' | 'Vysoká'
  reminder: '60 minut předem',
  recurring: 'Ne',
}
```

## 2) Šablona pro timeline krok projektu

Soubor: `src/data/grantProjects.ts` -> `timeline`

```ts
{
  id: 'tl-10',
  date: '2026-11-20',
  title: 'Název kroku',
  description: 'Co se v tomto kroku děje.',
  status: 'probiha', // 'hotovo' | 'probiha' | 'planovano'
}
```

Poznámka: Pro české zobrazení se používají interní hodnoty bez diakritiky (`probiha`, `planovano`), UI je převádí na „Probíhá“, „Plánováno“.

## 3) Šablona pro školení garantů

Soubor: `src/data/grantProjects.ts` -> `trainings`

```ts
{
  id: 'tr-3',
  date: '2026-10-15',
  title: 'Název školení',
  provider: 'Instituce / garant',
  note: 'Volitelná poznámka ke školení.',
}
```

## 4) Šablona pro leták / podklad

Soubor: `src/data/grantProjects.ts` -> `leaflets`

```ts
{
  id: 'lf-3',
  title: 'Název letáku',
  publishedAt: '2026-10-01',
  link: '#',
  description: 'Krátký popis obsahu letáku.',
}
```

## 5) Šablona pro harmonogram (kalendář projektu)

Soubor: `src/data/grantProjects.ts` -> `calendar`

```ts
{
  id: 'cal-5',
  date: '2026-11-12',
  time: '14:00',
  title: 'Název akce',
  location: 'Aula MGO',
  note: 'Doplňující informace.',
}
```

## Doporučený postup při úpravách

1. Uprav data pouze v `src/data/homeEvents.ts` a `src/data/grantProjects.ts`.
2. Zachovej unikátní `id` v rámci každého seznamu.
3. Používej datum ve formátu `YYYY-MM-DD` a čas `HH:MM`.
4. Piš texty s českou diakritikou.
5. Po úpravě spusť kontrolu:

```bash
npm run build && npm run lint
```

## Rychlá kontrola stavů timeline

- `hotovo` = dokončeno
- `probiha` = aktuálně probíhá
- `planovano` = plánováno do budoucna
