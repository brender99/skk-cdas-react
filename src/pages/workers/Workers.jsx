import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { 
  Users, Plus, Search, Edit, Trash,
  CheckCircle, XCircle
} from 'lucide-react'
import { Table, Thead, Tbody, Tr, Th, Td } from '../../components/ui/Table'
import { PageHeader } from '../../components/ui/PageHeader'

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
      <PageHeader
        title="จัดการพนักงาน"
        description="จัดการข้อมูลคนยกทั้งหมดในระบบ"
        icon={Users}
      >
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหารหัสคนยก หรือ ชื่อ-นามสกุล"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue="all"
          >
            <option value="all">สถานะทั้งหมด</option>
            <option value="active">ทำงาน</option>
            <option value="inactive">ไม่ทำงาน</option>
          </select>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            เพิ่มคนยก
          </button>
        </div>
      </PageHeader>

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
