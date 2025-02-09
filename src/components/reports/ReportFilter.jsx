import { useState } from 'react'
import { Search } from 'lucide-react'

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
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-end gap-4">
          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">วันที่เริ่มต้น</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">วันที่สิ้นสุด</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Plant Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">โรงงาน</label>
            <select
              value={plant}
              onChange={(e) => setPlant(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">ทั้งหมด</option>
              <option value="KK1">KK1</option>
              <option value="KK2">KK2</option>
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="h-5 w-5" />
            ค้นหา
          </button>
        </div>
      </form>
    </div>
  )
}
