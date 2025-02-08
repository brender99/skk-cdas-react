import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { 
  Users, Plus, Search, Edit, Trash,
  CheckCircle, XCircle
} from 'lucide-react'
import { Table, Thead, Tbody, Tr, Th, Td } from '../../components/ui/Table'

// Mock data
const mockWorkers = [
  { 
    id: 1, 
    code: 'W001',
    name: 'นายสมชาย ใจดี',
    position: 'คนยกปูน',
    status: 'active',
    bay: 'BAY-01',
    shiftType: 'กะเช้า',
    startDate: '2024-01-01'
  },
  // ... more workers
]

export default function Workers() {
  const { user } = useAuth()
  const [workers, setWorkers] = useState(mockWorkers)
  const [search, setSearch] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          จัดการคนยก
        </h1>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus size={18} />
          เพิ่มคนยก
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาด้วยรหัส หรือ ชื่อ-นามสกุล"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
          {user.role === 'SMK' && (
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">ทั้งหมด</option>
              <option value="KK1">KK1</option>
              <option value="KK2">KK2</option>
            </select>
          )}
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option value="">สถานะทั้งหมด</option>
            <option value="active">ทำงาน</option>
            <option value="inactive">ไม่ทำงาน</option>
          </select>
        </div>
      </div>

      {/* Workers Table */}
      <div className="bg-white rounded-lg border border-navy-200 shadow-sm overflow-hidden">
        <Table>
          <Thead>
            <Tr isHeader>
              <Th>รหัสคนยก</Th>
              <Th>ชื่อ-นามสกุล</Th>
              <Th>เบอร์โทรศัพท์</Th>
              <Th>สถานะ</Th>
              <Th>จัดการ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workers.map((worker, index) => (
              <Tr key={worker.id} isEven={index % 2 === 1}>
                <Td>{worker.code}</Td>
                <Td>{worker.name}</Td>
                <Td>{worker.phone}</Td>
                <Td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    worker.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {worker.status === 'active' ? 'ทำงาน' : 'พัก'}
                  </span>
                </Td>
                <Td>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedWorker(worker)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => {/* handle delete */}}
                      className="text-red-600 hover:text-red-900"
                    >
                      ลบ
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  )
}
