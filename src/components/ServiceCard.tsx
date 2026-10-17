type ServiceCardProps = {
  name: string
  price: number
  durationMin: number
}

export function ServiceCard({ name, price, durationMin }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{name}</h2>
      <div className="mt-3 flex justify-between text-sm text-slate-600">
        <span>{durationMin} دقيقة</span>
        <span className="font-semibold text-teal-700">{price} ج.م</span>
      </div>
    </article>
  )
}
