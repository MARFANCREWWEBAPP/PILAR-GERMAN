import { ReactNode } from 'react'

export function DataTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/25">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  )
}

export function DataTableHeader({ children }: { children: ReactNode }) {
  return <thead className="border-b border-white/10 bg-white/[0.045]">{children}</thead>
}

export function DataTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-white/[0.08]">{children}</tbody>
}

export function DataTableCell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <td className={`px-3 py-3 align-middle text-white/75 ${className}`}>{children}</td>
}

export function DataTableRow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <tr className={`transition hover:bg-white/[0.035] ${className}`}>{children}</tr>
}

export function DataTableHead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <th className={`whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-white/50 ${className}`}>{children}</th>
}
