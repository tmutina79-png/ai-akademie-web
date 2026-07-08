import { LogIn } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

export function LoginPage() {
  return (
    <div className="teams-shell">
      <PageHeader
        title="Přihlášení"
        subtitle="Místo pro budoucí přihlášení studentů a učitelů do jednotlivých sekcí."
        badge="Přístup do portálu"
        icon={LogIn}
      />

      <p className="text-center text-lg font-bold text-red-600 md:text-xl">
        Přístupy se připravují.
      </p>

      <section className="teams-grid md:grid-cols-2">
        <article className="teams-card">
          <h2 className="teams-title text-lg">Přihlášení pro žáky</h2>
          <p className="teams-subtitle mt-2 text-sm">
            Přístup k akademii, zadáním a studijním materiálům.
          </p>
        </article>
        <article className="teams-card">
          <h2 className="teams-title text-lg">Přihlášení pro učitele</h2>
          <p className="teams-subtitle mt-2 text-sm">
            Přístup k metodikám, plánům lekcí a správě obsahu.
          </p>
        </article>
      </section>
    </div>
  )
}
