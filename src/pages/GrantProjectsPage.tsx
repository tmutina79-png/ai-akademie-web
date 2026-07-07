import { Landmark } from 'lucide-react'
import { GrantTimeline } from '../components/projects/GrantTimeline'
import { PageHeader } from '../components/ui/PageHeader'

export function GrantProjectsPage() {
  return (
    <div className="teams-shell">
      <PageHeader
        title="Dotační projekty"
        subtitle="Přehled projektů Matičního gymnázia Ostrava realizovaných s finanční podporou statutárního města Ostravy a Moravskoslezského kraje."
        badge="Grantové milníky"
        icon={Landmark}
      />

      <GrantTimeline />
    </div>
  )
}
