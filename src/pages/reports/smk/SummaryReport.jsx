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
    plant: 'KK1',
    cementType: 'ปูนถุงมอร์ต้าร์',
    tons: 250,
    bags: 5000,
    deliveryCount: 15,
    avgTime: '00:42:30'
  },
  {
    id: 2,
    date: '2025-02-09',
    plant: 'KK2',
    cementType: 'ปูนผงมอร์ต้า',
    tons: 300,
    bags: 0,
    deliveryCount: 12,
    avgTime: '00:38:45'
  }
]

export default function SummaryReport() {
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
      title="รายงานการจ่าย Summary"
      description="แสดงข้อมูลสรุปการจ่ายปูนแต่ละประเภท"
      icon={FileBarChart}
    >
      <div className="space-y-4">
        <ReportFilter onFilter={handleFilter} onExport={handleExport} />
        
        <Table>
          <Thead>
            <Tr>
              <Th>วันที่</Th>
              <Th>โรงงาน</Th>
              <Th>ประเภทปูน</Th>
              <Th className="text-right">จำนวน (ตัน)</Th>
              <Th className="text-right">จำนวน (ถุง)</Th>
              <Th className="text-right">จำนวนเที่ยว</Th>
              <Th className="text-right">เวลาเฉลี่ย</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockData.map((row) => (
              <Tr key={row.id}>
                <Td>{row.date}</Td>
                <Td>{row.plant}</Td>
                <Td>{row.cementType}</Td>
                <Td className="text-right">{row.tons.toLocaleString()}</Td>
                <Td className="text-right">{row.bags.toLocaleString()}</Td>
                <Td className="text-right">{row.deliveryCount.toLocaleString()}</Td>
                <Td className="text-right">{row.avgTime}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={3} className="text-right font-semibold">รวม</Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.tons, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.bags, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {mockData.reduce((sum, row) => sum + row.deliveryCount, 0).toLocaleString()}
              </Td>
              <Td className="text-right font-semibold">
                {/* Calculate average time */}
                00:40:38
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </div>
    </ReportLayout>
  )
}
