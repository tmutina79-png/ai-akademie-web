import { FolderKanban } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { StudentProjectsSection } from '../components/projects/StudentProjectsSection'
import { PageHeader } from '../components/ui/PageHeader'
import { projects } from '../data/projects'

function isPreparingProject(status: string) {
  return status.toLowerCase().includes('připravuje') || status.toLowerCase().includes('pripravuje')
}

export function ProjectsPage() {
  const [searchParams] = useSearchParams()
  const selectedProjectId = searchParams.get('projekt') ?? undefined
  const preparingProjects = projects.filter((project) => isPreparingProject(project.status))
  const activeProjects = projects.filter((project) => !isPreparingProject(project.status))

  return (
    <div className="teams-shell">
      <PageHeader
        title="Projekty"
        subtitle="Přehled projektů, které vznikají v AI akademii díky spolupráci žáků a učitelů."
        badge="Žáci a učitelé"
        icon={FolderKanban}
      />

      <StudentProjectsSection selectedProjectId={selectedProjectId} projectItems={activeProjects} />

      {preparingProjects.length ? (
        <section className="teams-panel">
          <div className="teams-panel-head">
            <h2 className="teams-title text-xl md:text-2xl">Projekty, které se připravují</h2>
            <span className="teams-pill">Připravujeme</span>
          </div>
          <p className="teams-subtitle mt-2 max-w-4xl text-sm md:text-base">
            Přehled projektů, které jsou ve fázi přípravy a budou postupně zařazeny do aktivních realizací.
          </p>
        </section>
      ) : null}

      {preparingProjects.length ? (
        <StudentProjectsSection selectedProjectId={selectedProjectId} projectItems={preparingProjects} />
      ) : null}
    </div>
  )
}
