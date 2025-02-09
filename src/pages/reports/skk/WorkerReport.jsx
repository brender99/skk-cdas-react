import { useState } from 'react'
import { Users } from 'lucide-react'
import ReportLayout from '../../../components/reports/ReportLayout'
import ReportFilter from '../../../components/reports/ReportFilter'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../../components/Table'

// Mock data
const mockWorkerReport = [
  {
    id: 1,
    order: 1,
    bay: '1',
    arrivalTime: '08:00',
    departureTime: '09:30',
    plateNumber: '1กก-1234',
    driverDp: 'DP001',
    floorStack: { tons: 10, bags: 200 },
    palletStack: { tons: 15, bags: 300 },
    slingStack: { tons: 20, bags: 400 },
    bigBag: { tons: 25, bags: 50 },
    cement: { tons: 30 },
    total: { tons: 100, bags: 950 },
    product: 'ปูนถุง',
    worker1: 'นายสมชาย',
    worker2: 'นายสมศักดิ์'
  },
  {
    id: 2,
    order: 2,
    bay: '2',
    arrivalTime: '09:00',
    departureTime: '10:30',
    plateNumber: '2กก-5678',
    driverDp: 'DP002',
    floorStack: { tons: 12, bags: 240 },
    palletStack: { tons: 18, bags: 360 },
    slingStack: { tons: 22, bags: 440 },
    bigBag: { tons: 28, bags: 56 },
    cement: { tons: 35 },
    total: { tons: 115, bags: 1096 },
    product: 'ปูนถุง',
    worker1: 'นายสมหมาย',
    worker2: 'นายสมพร'
  }
]

export default function SKKWorkerReport() {
  const [data] = useState(mockWorkerReport)

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
      title="รายงานคนยก"
      description="รายงานการทำงานของคนยก"
      icon={Users}
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
                <Th colSpan={21} className="text-center text-xl font-bold py-4">รายงานคนยก</Th>
              </Tr>
              <Tr>
                <Th rowSpan={2} className="w-16 text-center align-middle border">ลำดับ</Th>
                <Th rowSpan={2} className="w-16 text-center align-middle border">ราง</Th>
                <Th rowSpan={2} className="w-24 text-center align-middle border">เวลาเข้าราง</Th>
                <Th rowSpan={2} className="w-24 text-center align-middle border">เวลาออกราง</Th>
                <Th rowSpan={2} className="w-28 text-center align-middle border">ทะเบียนรถ</Th>
                <Th rowSpan={2} className="w-28 text-center align-middle border">หมายเลข DP.</Th>
                <Th colSpan={2} className="text-center border">เรียงพื้น</Th>
                <Th colSpan={2} className="text-center border">เรียงพาเลท</Th>
                <Th colSpan={2} className="text-center border">เรียงพีล็สลิง</Th>
                <Th colSpan={2} className="text-center border">บิ๊กแบ็ค</Th>
                <Th colSpan={1} className="text-center border">ปูนเม็ด</Th>
                <Th colSpan={2} className="text-center border">น้ำหนักรวม</Th>
                <Th rowSpan={2} className="w-24 text-center align-middle border">สินค้า</Th>
                <Th rowSpan={2} className="w-32 text-center align-middle border">คนยก1</Th>
                <Th rowSpan={2} className="w-32 text-center align-middle border">คนยก2</Th>
              </Tr>
              <Tr>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr key={item.id}>
                  <Td className="text-center border">{item.order}</Td>
                  <Td className="text-center border">{item.bay}</Td>
                  <Td className="text-center border">{item.arrivalTime}</Td>
                  <Td className="text-center border">{item.departureTime}</Td>
                  <Td className="text-center border">{item.plateNumber}</Td>
                  <Td className="text-center border">{item.driverDp}</Td>
                  <Td className="text-right border">{item.floorStack?.tons?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.floorStack?.bags?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.palletStack?.tons?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.palletStack?.bags?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.slingStack?.tons?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.slingStack?.bags?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.bigBag?.tons?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.bigBag?.bags?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.cement?.tons?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.total?.tons?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.total?.bags?.toLocaleString() || 0}</Td>
                  <Td className="text-center border">{item.product}</Td>
                  <Td className="text-center border">{item.worker1}</Td>
                  <Td className="text-center border">{item.worker2}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={6} className="text-center font-semibold border">รวมทั้งหมด</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.floorStack?.tons || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.floorStack?.bags || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.palletStack?.tons || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.palletStack?.bags || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.slingStack?.tons || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.slingStack?.bags || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.bigBag?.tons || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.bigBag?.bags || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.cement?.tons || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.total?.tons || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.total?.bags || 0), 0).toLocaleString()}</Td>
                <Td colSpan={3} className="border"></Td>
              </Tr>
            </Tfoot>
          </Table>
        </div>
      </div>
    </ReportLayout>
  )
}
