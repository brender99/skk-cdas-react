import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const reportTypes = {
  skk: [
    { id: 'worker', name: 'รายงานคนยก' },
    { id: 'delivery', name: 'รายงานรางจ่าย' },
    { id: 'stock', name: 'รายงานสต็อก' },
    { id: 'cement_bay', name: 'รายงานการจ่ายปูนในรางจ่าย' },
    { id: 'cement_stock', name: 'รายงานการจ่ายปูนในสต็อก' },
    { id: 'coupon', name: 'รายงานการจ่ายคูปอง' }
  ],
  smk: [
    { id: 'worker', name: 'รายงานคนยก' },
    { id: 'clamp', name: 'รายงานรถ Clamp' },
    { id: 'delivery_summary', name: 'รายงานการจ่าย Summary' }
  ]
}

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState(null)
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })
  const [selectedPlant, setSelectedPlant] = useState('all')
  const userType = localStorage.getItem('userType') || 'skk'

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log('Generating report:', {
      type: selectedReport,
      dateRange,
      plant: selectedPlant
    })
  }

  const handleExport = (format) => {
    // TODO: Implement export functionality
    console.log('Exporting as:', format)
  }

  return (
    <div className="p-6 space-y-6">
      <Card title="เลือกรายงาน">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ประเภทรายงาน</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="">เลือกรายงาน</option>
              {reportTypes[userType].map((report) => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">วันที่เริ่มต้น</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">วันที่สิ้นสุด</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>

          {userType === 'smk' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Plant</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
              >
                <option value="all">ทั้งหมด</option>
                <option value="plant1">Plant 1</option>
                <option value="plant2">Plant 2</option>
              </select>
            </div>
          )}
        </div>

        <div className="mt-4 flex space-x-2">
          <Button onClick={handleGenerateReport}>
            สร้างรายงาน
          </Button>
        </div>
      </Card>

      {/* Report Preview */}
      <Card title="ตัวอย่างรายงาน">
        <div className="min-h-[400px] flex items-center justify-center text-gray-500">
          {selectedReport ? (
            <div className="space-y-4">
              <p>ตัวอย่างรายงานจะแสดงที่นี่</p>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => handleExport('pdf')}
                >
                  Export PDF
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleExport('excel')}
                >
                  Export Excel
                </Button>
              </div>
            </div>
          ) : (
            <p>กรุณาเลือกประเภทรายงาน</p>
          )}
        </div>
      </Card>
    </div>
  )
}
