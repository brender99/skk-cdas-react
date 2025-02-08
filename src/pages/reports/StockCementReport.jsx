import { useState } from 'react'
import ReportLayout from './ReportLayout'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../components/ui/Table'

// Mock data
const mockStockCementReport = [
  {
    id: 1,
    stockNo: 'ST-01',
    cementType: 'ปูนถุง',
    truckNo: 'ทะเบียน กข-1234',
    driver: 'นายสมชาย ใจดี',
    amount: 12.5,
    startTime: '08:30',
    endTime: '09:15',
    totalTime: 45,
    date: '2024-02-07'
  },
  // ... more data
]

// Custom filter component
function StockCementReportFilter() {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          คลังสินค้า
        </label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">ทั้งหมด</option>
          <option value="ST-01">ST-01</option>
          <option value="ST-02">ST-02</option>
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

export default function StockCementReport() {
  const [data, setData] = useState(mockStockCementReport)

  return (
    <ReportLayout
      title="รายงานการจ่ายปูนในสต็อก"
      description="รายงานสรุปการจ่ายปูนในแต่ละคลังสินค้าแบบละเอียด"
      filterComponent={StockCementReportFilter}
    >
      <Table>
        <Thead>
          <Tr isHeader>
            <Th>วันที่</Th>
            <Th>คลังสินค้า</Th>
            <Th>ประเภทปูน</Th>
            <Th>ทะเบียนรถ</Th>
            <Th>คนขับ</Th>
            <Th align="right">ปริมาณ (ตัน)</Th>
            <Th>เวลาเริ่ม</Th>
            <Th>เวลาเสร็จ</Th>
            <Th align="right">เวลารวม (นาที)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={row.id} isEven={index % 2 === 1}>
              <Td>{row.date}</Td>
              <Td>{row.stockNo}</Td>
              <Td>{row.cementType}</Td>
              <Td>{row.truckNo}</Td>
              <Td>{row.driver}</Td>
              <Td align="right">{row.amount.toLocaleString()}</Td>
              <Td>{row.startTime}</Td>
              <Td>{row.endTime}</Td>
              <Td align="right">{row.totalTime}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={5}>รวมทั้งหมด</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}</Td>
            <Td colSpan={2}></Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.totalTime, 0)}</Td>
          </Tr>
        </Tfoot>
      </Table>
    </ReportLayout>
  )
}
