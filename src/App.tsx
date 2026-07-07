import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { EventPlannerPage } from './pages/EventPlannerPage'
import { GalleryEventDetailPage } from './pages/GalleryEventDetailPage'
import { GalleryPage } from './pages/GalleryPage'
import { GrantProjectsPage } from './pages/GrantProjectsPage'
import { GrantProjectDetailPage } from './pages/GrantProjectDetailPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NewsDetailPage } from './pages/NewsDetailPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { StudentAcademyPage } from './pages/StudentAcademyPage'
import { StudentAcademyPlanPage } from './pages/StudentAcademyPlanPage'
import { TeacherAcademyPage } from './pages/TeacherAcademyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projekty" element={<ProjectsPage />} />
          <Route path="/projekty/:projectId" element={<ProjectDetailPage />} />
          <Route path="/akademie-zaci" element={<StudentAcademyPage />} />
          <Route path="/akademie/codingclub" element={<StudentAcademyPage initialModel="model2" />} />
          <Route path="/akademie/codingclub/tematicky-plan" element={<StudentAcademyPlanPage />} />
          <Route path="/akademie-zaci/tematicky-plan" element={<Navigate to="/akademie/codingclub/tematicky-plan" replace />} />
          <Route path="/akademie-ucitele" element={<TeacherAcademyPage />} />
          <Route path="/planovac-akci" element={<EventPlannerPage />} />
          <Route path="/fotogalerie" element={<GalleryPage />} />
          <Route path="/fotogalerie/udalost/:eventTag" element={<GalleryEventDetailPage />} />
          <Route path="/novinky/:newsId" element={<NewsDetailPage />} />
          <Route path="/dotacni-projekty" element={<GrantProjectsPage />} />
          <Route path="/dotacni-projekty/:grantProjectId" element={<GrantProjectDetailPage />} />
          <Route path="/prihlaseni" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
