import { useState } from 'react'
import ReportLayout from './ReportLayout'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../components/ui/Table'

// Mock data
const mockBayReport = [
  {
    id: 1,
    bayNo: 'BAY-01',
    cementType: 'ปูนถุง',
    totalTrucks: 45,
    totalAmount: 1250,
    workingTime: '08:00-16:00',
    status: 'active',
    date: '2024-02-07'
  },
  // ... more data
]

// Custom filter component
function BayReportFilter() {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          รางจ่าย
        </label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">ทั้งหมด</option>
          <option value="BAY-01">BAY-01</option>
          <option value="BAY-02">BAY-02</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          ประเภทปูน
        </label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">ทั้งหมด</option>
          <option value="bag">ปูนถุง</option>
          <option value="bulk">ปูนผง</option>
          <option value="bigbag">บิ๊กแบ็ค</option>
          <option value="clinker">ปูนเม็ด</option>
        </select>
      </div>
    </>
  )
}

export default function BayReport() {
  const [data, setData] = useState(mockBayReport)

  return (
    <ReportLayout
      title="รายงานรางจ่าย"
      description="รายงานสรุปการจ่ายปูนแต่ละรางจ่าย"
      filterComponent={BayReportFilter}
    >
      <Table>
        <Thead>
          <Tr>
            <Th>วันที่</Th>
            <Th>รางจ่าย</Th>
            <Th>ประเภทปูน</Th>
            <Th align="right">จำนวนรถ (คัน)</Th>
            <Th align="right">ปริมาณ (ตัน)</Th>
            <Th>เวลาทำงาน</Th>
            <Th>สถานะ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={row.id} isEven={index % 2 === 1}>
              <Td>{row.date}</Td>
              <Td>{row.bayNo}</Td>
              <Td>{row.cementType}</Td>
              <Td align="right">{row.totalTrucks.toLocaleString()}</Td>
              <Td align="right">{row.totalAmount.toLocaleString()}</Td>
              <Td>{row.workingTime}</Td>
              <Td>
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${row.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                  }
                `}>
                  {row.status === 'active' ? 'ทำงาน' : 'ปิดงาน'}
                </span>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>รวมทั้งหมด</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.totalTrucks, 0).toLocaleString()}</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.totalAmount, 0).toLocaleString()}</Td>
            <Td colSpan={2}></Td>
          </Tr>
        </Tfoot>
      </Table>
    </ReportLayout>
  )
}
