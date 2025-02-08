import { useState } from 'react'
import ReportLayout from './ReportLayout'
import { Package, Truck, Timer, TrendingUp } from 'lucide-react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../components/ui/Table'

// Mock data
const mockSummaryReport = {
  overview: {
    totalAmount: 2500,
    totalTrucks: 150,
    avgWaitTime: 45,
    efficiency: 85
  },
  byPlant: [
    {
      id: 1,
      plant: 'KK1',
      cementType: 'ปูนถุง',
      totalTrucks: 80,
      totalAmount: 1200,
      avgWaitTime: 40,
      avgLoadTime: 25,
      date: '2024-02-07'
    },
    {
      id: 2,
      plant: 'KK2',
      cementType: 'ปูนถุง',
      totalTrucks: 45,
      totalAmount: 800,
      avgWaitTime: 35,
      avgLoadTime: 30,
      date: '2024-02-07'
    },
    {
      id: 3,
      plant: 'KK2',
      cementType: 'ปูนผง',
      totalTrucks: 25,
      totalAmount: 500,
      avgWaitTime: 50,
      avgLoadTime: 35,
      date: '2024-02-07'
    }
  ]
}

// Custom filter component
function SummaryReportFilter() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        ประเภทปูน
      </label>
      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
        <option value="all">ทั้งหมด</option>
        <option value="bag">ปูนถุง</option>
        <option value="bulk">ปูนผง</option>
      </select>
    </div>
  )
}

export default function SummaryReport() {
  const [data, setData] = useState(mockSummaryReport)

  return (
    <ReportLayout
      title="รายงาน Summary"
      description="รายงานสรุปภาพรวมการจ่ายปูนทั้งหมด"
      filterComponent={SummaryReportFilter}
    >
      {/* Overview Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-200">
        {[
          {
            label: 'ปริมาณรวม',
            value: `${data.overview.totalAmount.toLocaleString()} ตัน`,
            icon: Package,
            color: 'primary'
          },
          {
            label: 'จำนวนรถ',
            value: `${data.overview.totalTrucks.toLocaleString()} คัน`,
            icon: Truck,
            color: 'green'
          },
          {
            label: 'เวลารอเฉลี่ย',
            value: `${data.overview.avgWaitTime} นาที`,
            icon: Timer,
            color: 'yellow'
          },
          {
            label: 'ประสิทธิภาพ',
            value: `${data.overview.efficiency}%`,
            icon: TrendingUp,
            color: 'blue'
          }
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{card.label}</h3>
              <div className={`p-2 bg-${card.color}-50 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Table */}
      <Table>
        <Thead>
          <Tr isHeader>
            <Th>วันที่</Th>
            <Th>โรงงาน</Th>
            <Th>ประเภทปูน</Th>
            <Th align="right">จำนวนรถ (คัน)</Th>
            <Th align="right">ปริมาณ (ตัน)</Th>
            <Th align="right">เวลารอเฉลี่ย (นาที)</Th>
            <Th align="right">เวลาจ่ายเฉลี่ย (นาที)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.byPlant.map((row, index) => (
            <Tr key={row.id} isEven={index % 2 === 1}>
              <Td>{row.date}</Td>
              <Td>{row.plant}</Td>
              <Td>{row.cementType}</Td>
              <Td align="right">{row.totalTrucks.toLocaleString()}</Td>
              <Td align="right">{row.totalAmount.toLocaleString()}</Td>
              <Td align="right">{row.avgWaitTime}</Td>
              <Td align="right">{row.avgLoadTime}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>รวมทั้งหมด</Td>
            <Td align="right">{data.byPlant.reduce((sum, row) => sum + row.totalTrucks, 0).toLocaleString()}</Td>
            <Td align="right">{data.byPlant.reduce((sum, row) => sum + row.totalAmount, 0).toLocaleString()}</Td>
            <Td align="right">{Math.round(data.byPlant.reduce((sum, row) => sum + row.avgWaitTime, 0) / data.byPlant.length)}</Td>
            <Td align="right">{Math.round(data.byPlant.reduce((sum, row) => sum + row.avgLoadTime, 0) / data.byPlant.length)}</Td>
          </Tr>
        </Tfoot>
      </Table>
    </ReportLayout>
  )
}
