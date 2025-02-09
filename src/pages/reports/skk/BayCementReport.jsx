import { useState } from 'react'
import { FileBarChart } from 'lucide-react'
import ReportLayout from '../../../components/reports/ReportLayout'
import ReportFilter from '../../../components/reports/ReportFilter'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../../components/Table'

// Mock data
const mockData = [
  {
    id: 1,
    date: '2025-02-09',
    bay: 'Bay 1',
    cementType: 'ปูนถุง',
    incomingTons: 200,
    outgoingTons: 150,
    remainingTons: 50
  },
  {
    id: 2,
    date: '2025-02-09',
    bay: 'Bay 2',
    cementType: 'บิ๊กแบ็ค',
    incomingTons: 300,
    outgoingTons: 250,
    remainingTons: 50
  }
]

export default function BayCementReport() {
  const handleFilter = (filters) => {
    console.log('Applying filters:', filters)
    // TODO: Implement filter logic
  }

  const handleExport = (type) => {
    console.log('Exporting as:', type)
    // TODO: Implement export logic
  }

  return (
    <ReportLayout
      title="รายงานการจ่ายปูนในรางจ่าย"
      description="แสดงข้อมูลการจ่ายปูนในแต่ละรางจ่าย"
      icon={FileBarChart}
    >
      <div className="space-y-4">
        <ReportFilter onFilter={handleFilter} onExport={handleExport} />
        
        <Table>
          <Thead>
            <Tr>
              <Th>วันที่</Th>
              <Th>รางจ่าย</Th>
              <Th>ประเภทปูน</Th>
              <Th className="text-right">ปูนเข้า (ตัน)</Th>
              <Th className="text-right">ปูนออก (ตัน)</Th>
              <Th className="text-right">ปูนคงเหลือ (ตัน)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockData.map((row) => (
              <Tr key={row.id}>
                <Td>{row.date}</Td>
                <Td>{row.bay}</Td>
                <Td>{row.cementType}</Td>
                <Td className="text-right">{row.incomingTons.toLocaleString()}</Td>
                <Td className="text-right">{row.outgoingTons.toLocaleString()}</Td>
                <Td className="text-right">{row.remainingTons.toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={3} className="text-right font-semibold">รวม</Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.incomingTons, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.outgoingTons, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.remainingTons, 0).toLocaleString()}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </div>
    </ReportLayout>
  )
}
