// src/pages/trucks/TruckStatus.jsx
import { useState, useEffect } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Table, Thead, Tbody, Tr, Th, Td } from '../../components/ui/Table'

// Mock data - replace with API calls later
const initialTrucks = [
  {
    id: 'T001',
    plateNumber: '1กก-1234',
    type: 'ปูนถุง',
    status: 'จองคิว',
    entryTime: '09:30',
    waitTime: '15 นาที',
    plant: 'Plant 1'
  },
  {
    id: 'T002',
    plateNumber: '2ขข-5678',
    type: 'ปูนผง',
    status: 'ชั่งเบา',
    entryTime: '09:45',
    waitTime: '5 นาที',
    plant: 'Plant 1'
  },
  // Add more mock data as needed
]

export default function TruckStatus() {
  const [trucks, setTrucks] = useState(initialTrucks)
  const [filter, setFilter] = useState({
    status: 'all',
    type: 'all',
    plant: 'all'
  })
  const userType = localStorage.getItem('userType') || 'skk'

  const statusColors = {
    'จองคิว': 'bg-yellow-100 text-yellow-800',
    'ชั่งเบา': 'bg-blue-100 text-blue-800',
    'กำลังรับสินค้า': 'bg-purple-100 text-purple-800',
    'รับสินค้าเสร็จ': 'bg-green-100 text-green-800',
    'ชั่งหนัก': 'bg-orange-100 text-orange-800',
    'เรียกคิว': 'bg-red-100 text-red-800'
  }

  // Filter trucks based on current filter settings
  const filteredTrucks = trucks.filter(truck => {
    return (
      (filter.status === 'all' || truck.status === filter.status) &&
      (filter.type === 'all' || truck.type === filter.type) &&
      (filter.plant === 'all' || truck.plant === filter.plant)
    )
  })

  const [selectedTruck, setSelectedTruck] = useState(null)

  const handleShowDetails = (truck) => {
    setSelectedTruck(truck)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card title="ตัวกรอง">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">สถานะ</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filter.status}
              onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">ทั้งหมด</option>
              <option value="จองคิว">จองคิว</option>
              <option value="ชั่งเบา">ชั่งเบา</option>
              <option value="กำลังรับสินค้า">กำลังรับสินค้า</option>
              <option value="รับสินค้าเสร็จ">รับสินค้าเสร็จ</option>
              <option value="ชั่งหนัก">ชั่งหนัก</option>
              <option value="เรียกคิว">เรียกคิว</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ประเภทปูน</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filter.type}
              onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Plant</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filter.plant}
                onChange={(e) => setFilter(prev => ({ ...prev, plant: e.target.value }))}
              >
                <option value="all">ทั้งหมด</option>
                <option value="Plant 1">Plant 1</option>
                <option value="Plant 2">Plant 2</option>
              </select>
            </div>
          )}
        </div>
      </Card>

      {/* Truck List */}
      <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
        <Table>
          <Thead>
            <Tr isHeader>
              <Th>ทะเบียนรถ</Th>
              <Th>ประเภทปูน</Th>
              <Th>สถานะ</Th>
              <Th>เวลาเข้า</Th>
              <Th>เวลารอ</Th>
              {userType === 'smk' && (
                <Th>Plant</Th>
              )}
              <Th>การดำเนินการ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTrucks.map((truck, index) => (
              <Tr key={truck.id} isEven={index % 2 === 1}>
                <Td>{truck.plateNumber}</Td>
                <Td>{truck.type}</Td>
                <Td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[truck.status]}`}>
                    {truck.status}
                  </span>
                </Td>
                <Td>{truck.entryTime}</Td>
                <Td>{truck.waitTime}</Td>
                {userType === 'smk' && (
                  <Td>{truck.plant}</Td>
                )}
                <Td>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleShowDetails(truck)}
                    >
                      ดูรายละเอียด
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {selectedTruck && (
        <Card title="รายละเอียดรถ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ทะเบียนรถ</label>
              <p className="mt-1 text-sm text-gray-500">{selectedTruck.plateNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ประเภทปูน</label>
              <p className="mt-1 text-sm text-gray-500">{selectedTruck.type}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">สถานะ</label>
              <p className="mt-1 text-sm text-gray-500">{selectedTruck.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">เวลาเข้า</label>
              <p className="mt-1 text-sm text-gray-500">{selectedTruck.entryTime}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">เวลารอ</label>
              <p className="mt-1 text-sm text-gray-500">{selectedTruck.waitTime}</p>
            </div>
            {userType === 'smk' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Plant</label>
                <p className="mt-1 text-sm text-gray-500">{selectedTruck.plant}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}