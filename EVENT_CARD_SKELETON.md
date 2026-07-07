# Kostra karty udalosti (Planovac akci)

Tato kostra odpovida aktualni podobe karty na strance Planovac akci.
Pouzij ji pro kazdou dalsi udalost, aby byla vizualne i obsahove stejna.

## Co od tebe budu vzdy potrebovat

1. Zakladni udaje
- Nazev akce
- Datum (YYYY-MM-DD)
- Cas (napr. 09:00 - 12:00)
- Misto konani

2. Ucastnici
- Instituce (seznam)
- Ucitele/Lektori (seznam)
- Zaci (seznam)

3. Text akce
- Strucne shrnuti akce (1-3 vety, zobrazuje se v karte i detailu)

4. Media
- Fotky (seznam cest v /public/...)
- Video (cesta v /public/... nebo YouTube embed URL)
- Volitelne: uvodni obrazek videa (jinak se bere prvni fotka)

## Datova sablona (kopirovat)

{
  "id": "event-unikatni-id",
  "title": "Nazev akce",
  "date": "2026-06-17",
  "timeRange": "09:00 - 12:00",
  "location": "Misto konani",
  "participants": [
    "Instituce 1",
    "Instituce 2",
    "Ucitel 1",
    "Zak 1"
  ],
  "participantGroups": {
    "institutions": ["Instituce 1", "Instituce 2"],
    "teachers": ["Ucitel 1"],
    "students": ["Zak 1", "Zak 2"]
  },
  "summary": "Strucne shrnuti akce.",
  "photos": [
    "/events/nazev-akce/foto-1.jpg",
    "/events/nazev-akce/foto-2.jpg"
  ],
  "videoEmbedUrl": "/events/nazev-akce/video-muted.mp4"
}

## Chovani karty, ktere zustava stejne

- Sekce Kdo se ucastnil je rozdelena na: Instituce / Ucitele / Zaci.
- Fotky se zobrazuji v pevne mrizce 2 radku s posunem na dalsi fotky.
- Klik na fotku otevre modal s prepinanim dalsi/predchozi.
- Video je bez zvuku; po nacteni ukazuje uvodni obrazek akce.
- Poradi fotek je po kazdem nacteni stranky nahodne promichane.
