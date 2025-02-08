import { useState } from 'react'
import ReportLayout from './ReportLayout'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../components/ui/Table'
import { Truck } from 'lucide-react'

// Mock data
const mockClampReport = [
  {
    id: 1,
    clampNo: 'CL-001',
    driver: 'นายสมชาย ใจดี',
    plant: 'KK1',
    totalTrips: 25,
    totalAmount: 125,
    workingTime: '08:00-16:00',
    status: 'active',
    date: '2024-02-07'
  },
  // ... more data
]

// Custom filter component
function ClampReportFilter() {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          รถ Clamp
        </label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">ทั้งหมด</option>
          <option value="CL-001">CL-001</option>
          <option value="CL-002">CL-002</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          สถานะ
        </label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">ทั้งหมด</option>
          <option value="active">ทำงาน</option>
          <option value="inactive">ไม่ทำงาน</option>
        </select>
      </div>
    </>
  )
}

export default function ClampReport() {
  const [data, setData] = useState(mockClampReport)

  return (
    <ReportLayout
      title="รายงานรถ Clamp"
      description="รายงานสรุปการทำงานของรถ Clamp"
      filterComponent={ClampReportFilter}
    >
      {/* Clamp Summary Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200">
        {[
          { label: 'รถ Clamp ทั้งหมด', value: '5 คัน' },
          { label: 'จำนวนเที่ยววันนี้', value: '125 เที่ยว' },
          { label: 'ปริมาณรวมวันนี้', value: '625 ตัน' }
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{card.label}</h3>
              <div className="p-2 bg-primary-50 rounded-lg">
                <Truck className="w-6 h-6 text-primary-600" />
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

      {/* Clamp Table */}
      <Table>
        <Thead>
          <Tr isHeader>
            <Th>วันที่</Th>
            <Th>รถ Clamp</Th>
            <Th>คนขับ</Th>
            <Th>โรงงาน</Th>
            <Th align="right">จำนวนเที่ยว</Th>
            <Th align="right">ปริมาณรวม (ตัน)</Th>
            <Th>เวลาทำงาน</Th>
            <Th>สถานะ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={row.id} isEven={index % 2 === 1}>
              <Td>{row.date}</Td>
              <Td>{row.clampNo}</Td>
              <Td>{row.driver}</Td>
              <Td>{row.plant}</Td>
              <Td align="right">{row.totalTrips.toLocaleString()}</Td>
              <Td align="right">{row.totalAmount.toLocaleString()}</Td>
              <Td>{row.workingTime}</Td>
              <Td>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                  ${row.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  }`}
                >
                  {row.status === 'active' ? 'ทำงาน' : 'ไม่ทำงาน'}
                </span>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={4}>รวมทั้งหมด</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.totalTrips, 0).toLocaleString()}</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.totalAmount, 0).toLocaleString()}</Td>
            <Td colSpan={2}></Td>
          </Tr>
        </Tfoot>
      </Table>
    </ReportLayout>
  )
}
