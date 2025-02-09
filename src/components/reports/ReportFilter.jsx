import { useState } from 'react'
import { Search, FileText, FileSpreadsheet } from 'lucide-react'

export default function ReportFilter({ onFilter, onExport }) {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [plant, setPlant] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter?.({
      dateRange,
      plant
    })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700">วันที่เริ่มต้น</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700">วันที่สิ้นสุด</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
          </div>
          {/* Plant Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700">โรงงาน</label>
            <select
              value={plant}
              onChange={(e) => setPlant(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            >
              <option value="">ทั้งหมด</option>
              <option value="KK1">KK1</option>
              <option value="KK2">KK2</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700"
            >
              <Search className="w-4 h-4" />
              ค้นหา
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onExport?.('pdf')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <FileText className="w-4 h-4" />
              PDF
            </button>
            <button
              type="button"
              onClick={() => onExport?.('excel')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
