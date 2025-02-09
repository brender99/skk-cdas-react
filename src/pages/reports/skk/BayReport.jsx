import { useState } from 'react'
import { FileBarChart } from 'lucide-react'
import ReportLayout from '../../../components/reports/ReportLayout'
import ReportFilter from '../../../components/reports/ReportFilter'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../../components/Table'

// Mock data
const mockBayReport = [
  {
    id: 1,
    order: 1,
    date: '2024-02-09',
    shift: 'เช้า',
    bay: '1',
    plateNumber: '1กก-1234',
    driverDp: 'DP001',
    floorBags: { tons: 10, bags: 200 },
    palletBags: { tons: 15, bags: 300 },
    slingBags: { tons: 20, bags: 400 },
    bigBag: { tons: 25, bags: 50 },
    cement: { tons: 30 },
    total: { tons: 100, bags: 950 },
    deliveryCount: 15,
    avgTime: '45 นาที',
    status: 'กำลังจ่ายสินค้า'
  },
  {
    id: 2,
    order: 2,
    date: '2024-02-09',
    shift: 'บ่าย',
    bay: '2',
    plateNumber: '2กก-5678',
    driverDp: 'DP002',
    floorBags: { tons: 12, bags: 240 },
    palletBags: { tons: 18, bags: 360 },
    slingBags: { tons: 22, bags: 440 },
    bigBag: { tons: 28, bags: 56 },
    cement: { tons: 35 },
    total: { tons: 115, bags: 1096 },
    deliveryCount: 18,
    avgTime: '40 นาที',
    status: 'รอคิว'
  }
]

export default function SKKBayReport() {
  const [data] = useState(mockBayReport)

  const handleSearch = (filters) => {
    console.log('Searching with filters:', filters)
  }

  const handleExportPDF = () => {
    console.log('Exporting PDF...')
  }

  const handleExportExcel = () => {
    console.log('Exporting Excel...')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <ReportLayout
      title="รายงานรางจ่าย"
      description="รายงานสรุปการจ่ายสินค้าในแต่ละรางจ่าย"
      icon={FileBarChart}
    >
      {/* Filter */}
      <ReportFilter 
        onSearch={handleSearch}
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
        onPrint={handlePrint}
      />

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Tr>
                <Th colSpan={17} className="text-center text-xl font-bold py-4">รายงานรางจ่าย</Th>
              </Tr>
              <Tr isHeader>
                <Th rowSpan={2} className="w-16 text-center align-middle border">ลำดับ</Th>
                <Th rowSpan={2} className="w-24 text-center align-middle border">วันที่</Th>
                <Th rowSpan={2} className="w-20 text-center align-middle border">กะ</Th>
                <Th rowSpan={2} className="w-16 text-center align-middle border">ราง</Th>
                <Th rowSpan={2} className="w-28 text-center align-middle border">ทะเบียนรถ</Th>
                <Th rowSpan={2} className="w-28 text-center align-middle border">หมายเลข DP.</Th>
                <Th colSpan={2} className="text-center border">เรียงพื้น</Th>
                <Th colSpan={2} className="text-center border">เรียงพาเลท</Th>
                <Th colSpan={2} className="text-center border">เรียงสลิง</Th>
                <Th colSpan={2} className="text-center border">บิ๊กแบ็ค</Th>
                <Th colSpan={1} className="text-center border">ปูนเม็ด</Th>
                <Th rowSpan={2} className="w-24 text-center align-middle border">เวลาเฉลี่ย</Th>
                <Th rowSpan={2} className="w-28 text-center align-middle border">สถานะ</Th>
              </Tr>
              <Tr isHeader>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr key={item.id}>
                  <Td className="text-center border">{item.order}</Td>
                  <Td className="text-center border">{item.date}</Td>
                  <Td className="text-center border">{item.shift}</Td>
                  <Td className="text-center border">{item.bay}</Td>
                  <Td className="text-center border">{item.plateNumber}</Td>
                  <Td className="text-center border">{item.driverDp}</Td>
                  <Td className="text-right border">{item.floorBags.tons.toLocaleString()}</Td>
                  <Td className="text-right border">{item.floorBags.bags.toLocaleString()}</Td>
                  <Td className="text-right border">{item.palletBags.tons.toLocaleString()}</Td>
                  <Td className="text-right border">{item.palletBags.bags.toLocaleString()}</Td>
                  <Td className="text-right border">{item.slingBags.tons.toLocaleString()}</Td>
                  <Td className="text-right border">{item.slingBags.bags.toLocaleString()}</Td>
                  <Td className="text-right border">{item.bigBag.tons.toLocaleString()}</Td>
                  <Td className="text-right border">{item.bigBag.bags.toLocaleString()}</Td>
                  <Td className="text-right border">{item.cement.tons.toLocaleString()}</Td>
                  <Td className="text-center border">{item.avgTime}</Td>
                  <Td className="text-center border">{item.status}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={6} className="text-center font-semibold border">รวมทั้งหมด</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.floorBags.tons, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.floorBags.bags, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.palletBags.tons, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.palletBags.bags, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.slingBags.tons, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.slingBags.bags, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.bigBag.tons, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.bigBag.bags, 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + item.cement.tons, 0).toLocaleString()}</Td>
                <Td className="text-center font-semibold border">-</Td>
                <Td className="border"></Td>
              </Tr>
            </Tfoot>
          </Table>
        </div>
      </div>
    </ReportLayout>
  )
}
