export function BrandMark() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
      <img
        src="/mgo-logo.jpeg"
        alt="Logo Matičního gymnázia Ostrava"
        className="h-8 w-8 rounded object-cover md:h-9 md:w-9"
      />
      <div className="leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 md:text-[11px]">
          AI akademie
        </p>
        <p className="font-bold text-slate-800 text-xs md:text-sm whitespace-nowrap">
          Matiční gymnázium Ostrava
        </p>
      </div>
    </div>
  )
}
