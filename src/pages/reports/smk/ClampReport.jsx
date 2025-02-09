import { useState } from 'react'
import { Truck } from 'lucide-react'
import ReportLayout from '../../../components/reports/ReportLayout'
import ReportFilter from '../../../components/reports/ReportFilter'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '../../../components/Table'

// Mock data
const mockClampReport = [
  {
    id: 1,
    order: 1,
    bay: '1',
    arrivalTime: '08:00',
    departureTime: '09:30',
    plateNumber: '1กก-1234',
    driverDp: 'DP001',
    clamp: { tons: 25, bags: 500 },
    product: 'ปูนถุง',
    driver: 'นายขับ สมใจ'
  },
  {
    id: 2,
    order: 2,
    bay: '2',
    arrivalTime: '09:00',
    departureTime: '10:30',
    plateNumber: '2กก-5678',
    driverDp: 'DP002',
    clamp: { tons: 28, bags: 560 },
    product: 'ปูนถุง',
    driver: 'นายขับ มาดี'
  }
]

export default function SMKClampReport() {
  const [data] = useState(mockClampReport)

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
      title="รายงานรถ Clamp"
      description="รายงานการทำงานของรถ Clamp"
      icon={Truck}
    >
      {/* Filter */}
      <ReportFilter 
        onSearch={handleSearch}
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
        onPrint={handlePrint}
        showPlant={true}
      />

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Tr>
                <Th colSpan={10} className="text-center text-xl font-bold py-4">รายงานรถ Clamp</Th>
              </Tr>
              <Tr isHeader>
                <Th className="w-16 text-center border">ลำดับ</Th>
                <Th className="w-16 text-center border">ราง</Th>
                <Th className="w-24 text-center border">เวลาเข้าราง</Th>
                <Th className="w-24 text-center border">เวลาออกราง</Th>
                <Th className="w-28 text-center border">ทะเบียนรถ</Th>
                <Th className="w-28 text-center border">หมายเลข DP.</Th>
                <Th className="w-20 text-center border">ตัน</Th>
                <Th className="w-20 text-center border">ถุง</Th>
                <Th className="w-24 text-center border">สินค้า</Th>
                <Th className="w-32 text-center border">คนขับ</Th>
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
                  <Td className="text-right border">{item.clamp?.tons?.toLocaleString() || 0}</Td>
                  <Td className="text-right border">{item.clamp?.bags?.toLocaleString() || 0}</Td>
                  <Td className="text-center border">{item.product}</Td>
                  <Td className="text-center border">{item.driver}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={6} className="text-center font-semibold border">รวมทั้งหมด</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.clamp?.tons || 0), 0).toLocaleString()}</Td>
                <Td className="text-right font-semibold border">{data.reduce((sum, item) => sum + (item.clamp?.bags || 0), 0).toLocaleString()}</Td>
                <Td colSpan={2} className="border"></Td>
              </Tr>
            </Tfoot>
          </Table>
        </div>
      </div>
    </ReportLayout>
  )
}
