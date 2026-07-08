import { assetPath } from '../utils/assetPath'

export type HomeGalleryItem = {
  id: string
  title: string
  description: string
  date: string
  location: string
  image: string
  eventTag: string
}

export const homeGalleryPhotos: HomeGalleryItem[] = [
  {
    id: 'gallery-vibecoding-2026-01',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Úvodní část workshopu: co je vibecoding, jak pracovat s AI asistentem a jak navrhnout první prototyp aplikace.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-01.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-02',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Žáci testovali, jak formulace promptu ovlivní kvalitu vygenerovaného kódu a návrhu aplikace.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-02.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-03',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Praktická ukázka přechodu od nápadu k funkčnímu prototypu v prostředí Visual Studio Code.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-03.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-04',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Diskuse nad tím, které AI nástroje jsou vhodné pro školní projekty a týmovou spolupráci.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-04.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-05',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Skupinová práce na mini zadáních: návrh funkce, generování kódu, test a rychlá iterace.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-05.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-06',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Ukázka ladění chyb a ověřování výstupů AI tak, aby byl výsledný kód spolehlivý a čitelný.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-06.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-07',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Přednáška Ing. Tomáše Mutiny o bezpečné práci s AI a správné validaci zdrojů a dat.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-07.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-08',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Prezentace žákovských prototypů a porovnání různých přístupů k návrhu stejného řešení.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-08.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-09',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Závěrečné tipy: jaké nástroje kombinovat při tvorbě webu, dokumentace a testování.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-09.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-vibecoding-2026-10',
    title: 'Vibecoding pro vyšší gymnázium',
    description:
      'Fotodokumentace akce: praktické využití AI nástrojů ve školním prostředí vyššího gymnázia.',
    date: '24. března 2026',
    location: 'Matiční gymnázium Ostrava',
    image: assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-10.jpg'),
    eventTag: 'Vibecoding pro vyšší gymnázium',
  },
  {
    id: 'gallery-zsbohuminska-0',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Společná akce žáků ZŠ Bohumínská Ostrava, ZŠ ČSA Bohumín a Matičního gymnázia Ostrava zaměřená na programování, AI a robotiku.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5388.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-1',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Společná akce žáků ZŠ Bohumínská Ostrava, ZŠ ČSA Bohumín a Matičního gymnázia Ostrava zaměřená na programování, AI a robotiku.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5390.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-2',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Žáci si vyzkoušeli praktické úlohy v programování a práci s moderní technikou pod vedením lektorů a studentů MGO.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5391.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-5',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Žáci pracovali v týmech, řešili úkoly a zkoušeli praktické scénáře využití AI nástrojů.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5392.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-6',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Program zahrnoval práci s robotikou, kódováním i sdílením postupů mezi skupinami.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5393.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-7',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Účastníci rozvíjeli digitální dovednosti a představili vlastní nápady pro další práci.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5394.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-3',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Účastníci společně tvořili, programovali a rozvíjeli vlastní nápady v přátelské spolupráci mezi základní školou a gymnáziem.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5408.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-8',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Spolupráce mezi školami podpořila kreativitu, komunikaci i praktické řešení úloh.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5409.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-9',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Průběh akce ukázal, jak lze AI a robotiku smysluplně zapojit do výuky i projektů.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5410.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
  {
    id: 'gallery-zsbohuminska-4',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    description:
      'Závěrečné společné foto týmu a žáků po dopoledni plném robotiky, AI nástrojů a sdílení zkušeností.',
    date: '17. června 2026',
    location: 'ZŠ Bohumínská Ostrava',
    image: assetPath('events/zazitkove-odpoledne/IMG_5411.JPG'),
    eventTag: 'Zážitkové odpoledne s programováním a robotikou',
  },
]