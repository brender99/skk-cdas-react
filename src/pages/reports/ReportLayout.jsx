import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { 
  Calendar, Download, FileText,
  FileSpreadsheet, Printer, Search
} from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'

export default function ReportLayout({ 
  title,
  description,
  icon: Icon,
  children,
  onFilter,
  onExport,
  filterComponent: FilterComponent
}) {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg">
        <PageHeader
          title={title}
          description={description}
          icon={Icon}
        >
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  />
                  <span className="text-gray-500">ถึง</span>
                  <input
                    type="date"
                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {FilterComponent && (
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                    ตัวกรอง
                  </button>
                )}
                <button
                  onClick={() => onExport?.('excel')}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  Excel
                </button>
                <button
                  onClick={() => onExport?.('pdf')}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <Printer className="h-5 w-5" />
                  พิมพ์
                </button>
              </div>
            </div>
            {showFilters && FilterComponent && (
              <div className="mt-4">
                <FilterComponent onFilter={onFilter} />
              </div>
            )}
          </div>
        </PageHeader>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6">
        {children}
      </div>
    </div>
  )
}
