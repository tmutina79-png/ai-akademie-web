import { X } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { grantProjects } from '../data/grantProjects'
import { assetPath } from '../utils/assetPath'

const PROTECTED_GRANT_ID = 'mat-aia-2026'
const PROTECTED_GRANT_PASSWORD = 'mgo2026'

const finalReportPdfPath = assetPath('pdf/zaverecna_zprava_maticni_ai_akademie_opravena.pdf')

export function GrantFinalReportPdfPage() {
  const { grantProjectId } = useParams()
  const [enteredPassword, setEnteredPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)

  const selectedProject = grantProjects.find((project) => project.id === grantProjectId)

  if (!selectedProject) {
    return <Navigate to="/dotacni-projekty" replace />
  }

  const isProtectedPage = grantProjectId === PROTECTED_GRANT_ID

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (enteredPassword === PROTECTED_GRANT_PASSWORD) {
      setIsAuthorized(true)
      setPasswordError('')
      return
    }

    setPasswordError('Neplatné heslo. Zkuste to prosím znovu.')
  }

  if (isProtectedPage && !isAuthorized) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/70 px-4">
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        >
          <p className="text-sm font-semibold text-slate-900">Přístup chráněn heslem</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Zpráva: přístup do chráněné zóny pro vedení a garanty Matičního gymnázia.
          </p>

          <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="grant-report-password-input">
            Heslo
          </label>
          <input
            id="grant-report-password-input"
            type="password"
            value={enteredPassword}
            onChange={(event) => {
              setEnteredPassword(event.target.value)
              if (passwordError) setPasswordError('')
            }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            placeholder="Zadejte heslo"
            autoFocus
          />

          {passwordError ? <p className="mt-2 text-xs font-semibold text-rose-600">{passwordError}</p> : null}

          <div className="mt-4 flex justify-end gap-2">
            <a
              href={`#/dotacni-projekty/${selectedProject.id}`}
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Zpět
            </a>
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
            >
              Potvrdit heslo
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="relative">
      <a
        href={`#/dotacni-projekty/${selectedProject.id}`}
        className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-sm transition hover:bg-slate-100"
        aria-label="Zavřít závěrečnou zprávu"
      >
        <X className="h-4 w-4" />
      </a>

      <iframe
        title="Závěrečná zpráva ve formátu PDF"
        src={finalReportPdfPath}
        className="h-[82vh] w-full rounded-xl border border-slate-200 bg-white"
      />
    </div>
  )
}
