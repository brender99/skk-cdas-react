import { useState } from 'react'
import ReportLayout from './ReportLayout'
import { Users } from 'lucide-react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../components/ui/Table'

// Mock data
const mockWorkerReport = [
  {
    id: 1,
    code: 'W001',
    name: 'นายสมชาย ใจดี',
    bay: 'BAY-01',
    shift: 'กะเช้า',
    totalWork: 120,
    totalAmount: 2400,
    date: '2024-02-07'
  },
  // ... more data
]

// Custom filter component
function WorkerReportFilter() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        กะ
      </label>
      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
        <option value="all">ทั้งหมด</option>
        <option value="morning">กะเช้า</option>
        <option value="afternoon">กะบ่าย</option>
        <option value="night">กะดึก</option>
      </select>
    </div>
  )
}

export default function WorkerReport() {
  const [data, setData] = useState(mockWorkerReport)

  const handleExportPDF = () => {
    // Implement PDF export
  }

  const handleExportExcel = () => {
    // Implement Excel export
  }

  const handlePrint = () => {
    window.print()
  }

  // Calculate totals
  const totalAmount = data.reduce((sum, row) => sum + row.totalWork, 0)
  const totalValue = data.reduce((sum, row) => sum + row.totalAmount, 0)

  return (
    <ReportLayout
      title="รายงานคนยก"
      description="รายงานสรุปการทำงานของคนยกปูนรายวัน"
      filterComponent={WorkerReportFilter}
      onExportPDF={handleExportPDF}
      onExportExcel={handleExportExcel}
      onPrint={handlePrint}
    >
      <Table>
        <Thead>
          <Tr isHeader>
            <Th>วันที่</Th>
            <Th>รหัส</Th>
            <Th>ชื่อ-นามสกุล</Th>
            <Th>จุดจ่าย</Th>
            <Th>กะ</Th>
            <Th align="right">จำนวนยก (ครั้ง)</Th>
            <Th align="right">จำนวนเงิน (บาท)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={row.id} isEven={index % 2 === 1}>
              <Td>{row.date}</Td>
              <Td>{row.code}</Td>
              <Td>{row.name}</Td>
              <Td>{row.bay}</Td>
              <Td>{row.shift}</Td>
              <Td align="right">{row.totalWork.toLocaleString()}</Td>
              <Td align="right">{row.totalAmount.toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={5} align="right">รวมทั้งหมด</Td>
            <Td align="right">{totalAmount.toLocaleString()}</Td>
            <Td align="right">{totalValue.toLocaleString()}</Td>
          </Tr>
        </Tfoot>
      </Table>
    </ReportLayout>
  )
}
