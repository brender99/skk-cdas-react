import { useState } from 'react'
import ReportLayout from './ReportLayout'
import { Ticket } from 'lucide-react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../components/ui/Table'

// Mock data
const mockCouponReport = [
  {
    id: 1,
    couponNo: 'CP001',
    truckNo: 'ทะเบียน กข-1234',
    driver: 'นายสมชาย ใจดี',
    cementType: 'ปูนถุง',
    amount: 12.5,
    issueTime: '08:30',
    status: 'used',
    usedTime: '09:15',
    date: '2024-02-07'
  },
  // ... more data
]

// Custom filter component
function CouponReportFilter() {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          สถานะคูปอง
        </label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">ทั้งหมด</option>
          <option value="used">ใช้แล้ว</option>
          <option value="unused">ยังไม่ใช้</option>
          <option value="expired">หมดอายุ</option>
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

export default function CouponReport() {
  const [data, setData] = useState(mockCouponReport)

  return (
    <ReportLayout
      title="รายงานการจ่ายคูปอง"
      description="รายงานสรุปการจ่ายและใช้งานคูปอง"
      filterComponent={CouponReportFilter}
    >
      {/* Coupon Summary Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200">
        {[
          { label: 'คูปองทั้งหมด', value: 150, color: 'primary' },
          { label: 'ใช้แล้ว', value: 120, color: 'green' },
          { label: 'ยังไม่ใช้', value: 30, color: 'yellow' }
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{card.label}</h3>
              <div className={`p-2 bg-${card.color}-50 rounded-lg`}>
                <Ticket className={`w-6 h-6 text-${card.color}-600`} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {card.value.toLocaleString()} ใบ
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Table */}
      <Table>
        <Thead>
          <Tr isHeader>
            <Th>วันที่</Th>
            <Th>เลขที่คูปอง</Th>
            <Th>ทะเบียนรถ</Th>
            <Th>คนขับ</Th>
            <Th>ประเภทปูน</Th>
            <Th align="right">ปริมาณ (ตัน)</Th>
            <Th>เวลาออก</Th>
            <Th>สถานะ</Th>
            <Th>เวลาใช้งาน</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={row.id} isEven={index % 2 === 1}>
              <Td>{row.date}</Td>
              <Td>{row.couponNo}</Td>
              <Td>{row.truckNo}</Td>
              <Td>{row.driver}</Td>
              <Td>{row.cementType}</Td>
              <Td align="right">{row.amount.toLocaleString()}</Td>
              <Td>{row.issueTime}</Td>
              <Td>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  row.status === 'used'
                    ? 'bg-green-100 text-green-800'
                    : row.status === 'unused'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {row.status === 'used' ? 'ใช้แล้ว'
                    : row.status === 'unused' ? 'ยังไม่ใช้'
                    : 'หมดอายุ'
                  }
                </span>
              </Td>
              <Td>{row.usedTime || '-'}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={7}>รวมทั้งหมด</Td>
            <Td align="right">{data.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}</Td>
            <Td></Td>
          </Tr>
        </Tfoot>
      </Table>
    </ReportLayout>
  )
}
