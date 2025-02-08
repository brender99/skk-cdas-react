import { useState } from 'react'
import ReportLayout from './ReportLayout'
import { Package } from 'lucide-react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../components/ui/Table'

// Mock data
const mockStockReport = [
  {
    id: 1,
    stockNo: 'ST-01',
    cementType: 'ปูนถุง',
    currentAmount: 5000,
    incomingAmount: 1000,
    outgoingAmount: 800,
    remainingAmount: 5200,
    date: '2024-02-07'
  },
  // ... more data
]

// Custom filter component
function StockReportFilter() {
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

export default function StockReport() {
  const [data, setData] = useState(mockStockReport)

  return (
    <ReportLayout
      title="รายงานสต็อก"
      description="รายงานสรุปสถานะสต็อกสินค้า"
      filterComponent={StockReportFilter}
    >
      {/* Stock Summary Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-200">
        {['ปูนถุง', 'ปูนผง', 'บิ๊กแบ็ค', 'ปูนเม็ด'].map((type) => (
          <div
            key={type}
            className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{type}</h3>
              <div className="p-2 bg-primary-50 rounded-lg">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                5,200 ตัน
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                +2.5% จากเมื่อวาน
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stock Table */}
      <Table>
        <Thead>
          <Tr isHeader>
            <Th>วันที่</Th>
            <Th>คลังสินค้า</Th>
            <Th>ประเภทปูน</Th>
            <Th align="right">ยอดยกมา (ตัน)</Th>
            <Th align="right">รับเข้า (ตัน)</Th>
            <Th align="right">จ่ายออก (ตัน)</Th>
            <Th align="right">คงเหลือ (ตัน)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>{row.date}</Td>
              <Td>{row.stockNo}</Td>
              <Td>{row.cementType}</Td>
              <Td align="right">{row.currentAmount.toLocaleString()}</Td>
              <Td align="right" className="text-green-600">+{row.incomingAmount.toLocaleString()}</Td>
              <Td align="right" className="text-red-600">-{row.outgoingAmount.toLocaleString()}</Td>
              <Td align="right">{row.remainingAmount.toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>รวมทั้งหมด</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.currentAmount, 0).toLocaleString()}</Td>
            <Td align="right" className="text-green-600">+{data.reduce((sum, row) => sum + row.incomingAmount, 0).toLocaleString()}</Td>
            <Td align="right" className="text-red-600">-{data.reduce((sum, row) => sum + row.outgoingAmount, 0).toLocaleString()}</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.remainingAmount, 0).toLocaleString()}</Td>
          </Tr>
        </Tfoot>
      </Table>
    </ReportLayout>
  )
}
