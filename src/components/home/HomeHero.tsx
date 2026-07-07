import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homeEvents } from '../../data/homeEvents'
import { projects } from '../../data/projects'
import { assetPath } from '../../utils/assetPath'

const personNamePattern = /\b(?:Ing\.|Mgr\.)?\s*[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]+(?:\s+[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]+)+/g

const eventParticipantNames = ['Matěj Raško', 'Eliáš Riedl', 'Filip Gecík', 'Jan Pastrňák', 'Jakub Bajger']

function extractPersonNames(value: string) {
  const matches = value.match(personNamePattern) ?? []
  const blockedWords = ['gymnázium', 'škola', 'mgo', 'ostrava', 'všb', 'tuo', 'učebna', 'aula', 'projekt', 'workshop', 'prezentace']

  return matches
    .map((item) => item.replace(/^(Ing\.|Mgr\.)\s*/g, '').trim())
    .filter((item) => {
      const normalized = item.toLowerCase()
      return !blockedWords.some((word) => normalized.includes(word))
    })
}

export function HomeHero() {
  const activeProjectCount = projects.filter((project) => {
    const normalized = project.status.toLowerCase()
    return normalized.includes('připravuje') || normalized.includes('dokončeno') || normalized.includes('běží') || normalized.includes('probíhá')
  }).length

  const eventsCount = homeEvents.length

  const engagedNamesCount = new Set(
    [
      ...projects.flatMap((project) => extractPersonNames(`${project.title} ${project.description} ${project.owner}`)),
      ...homeEvents.flatMap((event) => extractPersonNames(`${event.title} ${event.description} ${event.host}`)),
      ...eventParticipantNames,
    ],
  ).size

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#c7d2fe] px-6 py-12 shadow-[0_14px_32px_rgba(15,23,42,0.10)] md:px-10 md:py-16" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)' }}>
      <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-48 w-48 rounded-full bg-indigo-200/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-5rem] left-1/3 h-44 w-44 rounded-full bg-sky-200/50 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
            AI akademie Matičního gymnázia
          </h1>

          <p className="max-w-2xl text-lg text-slate-700">
            Moderní vzdělávací prostor, kde studenti i učitelé rozvíjejí praktické
            dovednosti práce s umělou inteligencí.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/akademie-zaci"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-300 bg-white px-6 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              <ArrowRight className="h-4 w-4" />
              AI akademie MGO
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-extrabold text-indigo-700">{activeProjectCount}</p>
              <p className="text-xs text-slate-500">Rozpracované projekty</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-indigo-700">{eventsCount}</p>
              <p className="text-xs text-slate-500">AI akce a události</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-indigo-700">{engagedNamesCount}</p>
              <p className="text-xs text-slate-500">Zapojených žáků</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-indigo-700">2026</p>
              <p className="text-xs text-slate-500">Rok realizace</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="grid content-center gap-4">
            <div className="partner-logo-frame flex h-[150px] items-center justify-center rounded-3xl border border-indigo-100 bg-white p-4 shadow-[0_8px_24px_rgba(68,71,145,0.15)]">
              <img src={assetPath('ostrava-logo.png')} alt="Ostrava" className="partner-logo-ostrava" />
            </div>
            <div className="partner-logo-frame flex h-[150px] items-center justify-center rounded-3xl border border-indigo-100 bg-white p-4 shadow-[0_8px_24px_rgba(68,71,145,0.15)]">
              <img src={assetPath('msk-logo.png')} alt="Moravskoslezský kraj" className="partner-logo-msk" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
