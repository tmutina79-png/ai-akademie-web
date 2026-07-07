import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <div className="pointer-events-none absolute left-[-10rem] top-[-8rem] h-64 w-64 rounded-full bg-indigo-100/90 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[8rem] h-72 w-72 rounded-full bg-violet-100/80 blur-3xl" />

      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-8 pt-10 md:px-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
