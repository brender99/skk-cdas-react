import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { 
  Calendar, Download, FileText,
  FileSpreadsheet, Printer, Search
} from 'lucide-react'

export default function ReportLayout({ 
  title,
  description,
  children,
  onExportPDF,
  onExportExcel,
  onPrint,
  filterComponent: FilterComponent
}) {
  const { user } = useAuth()
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })

  return (
    <div className="space-y-4 -mx-2">
      {/* Header */}
      <div className="px-2">
        <h1 className="text-2xl font-semibold text-navy-900 mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-navy-600">{description}</p>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-navy-200 shadow-sm p-4 mx-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700">
              วันที่เริ่มต้น
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-white border border-navy-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700">
              วันที่สิ้นสุด
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-white border border-navy-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Plant Selector for SMK */}
          {user.role === 'SMK' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-navy-700">
                โรงงาน
              </label>
              <select className="w-full px-4 py-2 bg-white border border-navy-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="all">ทั้งหมด</option>
                <option value="KK1">KK1</option>
                <option value="KK2">KK2</option>
              </select>
            </div>
          )}

          {/* Custom Filter Component */}
          {FilterComponent && <FilterComponent />}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-navy-200">
          <button
            onClick={() => {/* handle refresh */}}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Search size={18} />
            ค้นหา
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportPDF}
              className="px-4 py-2 text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50 transition-colors flex items-center gap-2"
            >
              <FileText size={18} />
              PDF
            </button>
            <button
              onClick={onExportExcel}
              className="px-4 py-2 text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50 transition-colors flex items-center gap-2"
            >
              <FileSpreadsheet size={18} />
              Excel
            </button>
            <button
              onClick={onPrint}
              className="px-4 py-2 text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50 transition-colors flex items-center gap-2"
            >
              <Printer size={18} />
              พิมพ์
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg border border-navy-200 shadow-sm overflow-hidden mx-2">
        {children}
      </div>
    </div>
  )
}
