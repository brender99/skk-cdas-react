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
    stockArea: 'Stock A',
    cementType: 'ปูนถุง',
    currentTons: 500,
    currentBags: 10000,
    incomingTons: 200,
    incomingBags: 4000,
    outgoingTons: 150,
    outgoingBags: 3000
  },
  {
    id: 2,
    date: '2025-02-09',
    stockArea: 'Stock B',
    cementType: 'บิ๊กแบ็ค',
    currentTons: 800,
    currentBags: 800,
    incomingTons: 300,
    incomingBags: 300,
    outgoingTons: 250,
    outgoingBags: 250
  }
]

export default function StockReport() {
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
      title="รายงานสต็อก"
      description="แสดงข้อมูลสถานะและการเคลื่อนไหวของสต็อก"
      icon={FileBarChart}
    >
      <div className="space-y-4">
        <ReportFilter onFilter={handleFilter} onExport={handleExport} />
        
        <Table>
          <Thead>
            <Tr>
              <Th>วันที่</Th>
              <Th>พื้นที่สต็อก</Th>
              <Th>ประเภทปูน</Th>
              <Th className="text-right">คงเหลือ (ตัน)</Th>
              <Th className="text-right">คงเหลือ (ถุง)</Th>
              <Th className="text-right">รับเข้า (ตัน)</Th>
              <Th className="text-right">รับเข้า (ถุง)</Th>
              <Th className="text-right">จ่ายออก (ตัน)</Th>
              <Th className="text-right">จ่ายออก (ถุง)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockData.map((row) => (
              <Tr key={row.id}>
                <Td>{row.date}</Td>
                <Td>{row.stockArea}</Td>
                <Td>{row.cementType}</Td>
                <Td className="text-right">{row.currentTons.toLocaleString()}</Td>
                <Td className="text-right">{row.currentBags.toLocaleString()}</Td>
                <Td className="text-right">{row.incomingTons.toLocaleString()}</Td>
                <Td className="text-right">{row.incomingBags.toLocaleString()}</Td>
                <Td className="text-right">{row.outgoingTons.toLocaleString()}</Td>
                <Td className="text-right">{row.outgoingBags.toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={3} className="text-right font-semibold">รวม</Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.currentTons, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.currentBags, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.incomingTons, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.incomingBags, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.outgoingTons, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.outgoingBags, 0).toLocaleString()}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </div>
    </ReportLayout>
  )
}
