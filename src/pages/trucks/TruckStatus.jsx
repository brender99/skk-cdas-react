// src/pages/trucks/TruckStatus.jsx
import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Table, Thead, Tbody, Tr, Th, Td, Tfoot } from '../../components/ui/Table'
import { Search, FileText, FileSpreadsheet } from 'lucide-react'
import { Truck } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'

// Mock data - replace with API calls later
const initialTrucks = [
  {
    id: 'T001',
    plateNumber: '1กก-1234',
    type: 'ปูนถุง',
    status: 'จองคิว',
    entryTime: '09:30',
    waitTime: '15 นาที',
    plant: 'Plant 1',
    boothdate: '2024-03-16T08:30:00',
    grossdate: '2024-03-16T09:00:00',
    weight: 10,
    quantity: 20,
    remark: 'Test remark'
  },
  {
    id: 'T002',
    plateNumber: '2ขข-5678',
    type: 'ปูนผง',
    status: 'ชั่งเบา',
    entryTime: '09:45',
    waitTime: '5 นาที',
    plant: 'Plant 1',
    boothdate: '2024-03-16T09:15:00',
    grossdate: '2024-03-16T09:30:00',
    weight: 15,
    quantity: 30,
    remark: 'Test remark 2'
  },
]

export default function TruckStatus() {
  const [filter, setFilter] = useState({
    dateRange: { start: '', end: '' },
    status: 'all',
    type: 'all',
    plant: 'all'
  })
  const userType = localStorage.getItem('userType') || 'skk'

  const statusColors = {
    'จองคิว': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'ชั่งเบา': 'bg-blue-100 text-blue-800 border-blue-200',
    'กำลังรับสินค้า': 'bg-purple-100 text-purple-800 border-purple-200',
    'รับสินค้าเสร็จ': 'bg-green-100 text-green-800 border-green-200',
    'ชั่งหนัก': 'bg-orange-100 text-orange-800 border-orange-200',
    'เรียกคิว': 'bg-red-100 text-red-800 border-red-200'
  }

  const handleFilter = (e) => {
    e.preventDefault()
    // Here you would typically make an API call with the filter values
    console.log('Applying filters:', filter)
  }

  const handleExport = (type) => {
    console.log(`Exporting as ${type}...`)
    // Implement export functionality
  }

  const totalWeight = initialTrucks.reduce((acc, truck) => acc + (truck.weight || 0), 0)
  const totalQuantity = initialTrucks.reduce((acc, truck) => acc + (truck.quantity || 0), 0)

  return (
    <div className="space-y-4">
      <PageHeader
        title="ข้อมูลรถ"
        description="แสดงข้อมูลรถทั้งหมดในระบบ"
        icon={Truck}
      />
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <form onSubmit={handleFilter} className="space-y-4">
          <div className="flex items-end gap-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">วันที่เริ่มต้น</label>
              <input
                type="date"
                value={filter.dateRange.start}
                onChange={(e) => setFilter(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">วันที่สิ้นสุด</label>
              <input
                type="date"
                value={filter.dateRange.end}
                onChange={(e) => setFilter(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">ประเภทปูน</label>
              <select
                value={filter.type}
                onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">ทั้งหมด</option>
                <option value="ปูนถุง">ปูนถุง</option>
                <option value="ปูนผง">ปูนผง</option>
                {userType === 'skk' && (
                  <>
                    <option value="บิ๊กแบ็ค">บิ๊กแบ็ค</option>
                    <option value="ปูนเม็ด">ปูนเม็ด</option>
                  </>
                )}
              </select>
            </div>

            {userType === 'smk' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">โรงงาน</label>
                <select
                  value={filter.plant}
                  onChange={(e) => setFilter(prev => ({ ...prev, plant: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">ทั้งหมด</option>
                  <option value="KK1">KK1</option>
                  <option value="KK2">KK2</option>
                </select>
              </div>
            )}

            <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
              <Search className="w-4 h-4" />
              ค้นหา
            </Button>

            <div className="flex gap-2 ml-auto">
              <Button
                type="button"
                onClick={() => handleExport('pdf')}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                PDF
              </Button>
              <Button
                type="button"
                onClick={() => handleExport('excel')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <Thead>
              <Tr>
                <Th className="text-center w-16">ลำดับ</Th>
                <Th className="text-center w-24">ทะเบียนรถ</Th>
                <Th className="text-center w-24">ประเภทรถ</Th>
                <Th className="text-center w-24">ประเภทปูน</Th>
                <Th className="text-center w-24">สถานะ</Th>
                <Th className="text-center w-32">เวลาเข้า</Th>
                <Th className="text-center w-32">เวลาออก</Th>
                <Th className="text-center w-24">น้ำหนัก (ตัน)</Th>
                <Th className="text-center w-24">จำนวน (ถุง)</Th>
                <Th className="text-center w-32">หมายเหตุ</Th>
              </Tr>
            </Thead>
            <Tbody>
              {initialTrucks.map((truck, index) => (
                <Tr key={truck.id} className="hover:bg-gray-50">
                  <Td className="text-center">{index + 1}</Td>
                  <Td className="text-center font-medium">{truck.plateNumber}</Td>
                  <Td className="text-center">{truck.type}</Td>
                  <Td className="text-center">{truck.type}</Td>
                  <Td className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${statusColors[truck.status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                      {truck.status}
                    </span>
                  </Td>
                  <Td className="text-center">{truck.boothdate}</Td>
                  <Td className="text-center">{truck.grossdate}</Td>
                  <Td className="text-center">{truck.weight || 0}</Td>
                  <Td className="text-center">{truck.quantity || 0}</Td>
                  <Td className="text-center">{truck.remark || ''}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr className="bg-gray-50 font-medium">
                <Td colSpan={7} className="text-right">รวม</Td>
                <Td className="text-center">{totalWeight}</Td>
                <Td className="text-center">{totalQuantity}</Td>
                <Td></Td>
              </Tr>
            </Tfoot>
          </Table>
        </div>
      </div>
    </div>
  )
}