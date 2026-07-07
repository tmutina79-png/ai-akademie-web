export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <p>AI akademie ve spolupráci s Matičním gymnáziem Ostrava</p>
        <p>© {new Date().getFullYear()} Všechna práva vyhrazena</p>
      </div>
    </footer>
  )
}
