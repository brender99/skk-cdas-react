import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FileText, FileSpreadsheet, Printer } from 'lucide-react'
import { PageHeader } from '../ui/PageHeader'

export default function ReportLayout({ 
  title,
  description,
  icon: Icon,
  children,
  onFilter,
  onExport,
  filterComponent: FilterComponent
}) {
  const exportActions = (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onExport?.('excel')}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Excel
      </button>
      <button
        onClick={() => onExport?.('pdf')}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        <FileText className="h-4 w-4" />
        PDF
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        <Printer className="h-4 w-4" />
        พิมพ์
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        icon={Icon}
        actions={exportActions}
      >
        {FilterComponent && (
          <div className="mt-4">
            <FilterComponent onFilter={onFilter} onExport={onExport} />
          </div>
        )}
      </PageHeader>

      {/* Content */}
      <div className="bg-white rounded-lg p-6">
        {children}
      </div>
    </div>
  )
}
