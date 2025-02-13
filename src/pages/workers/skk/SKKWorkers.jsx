import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWorkers, addWorker, updateWorker, deleteWorker } from '../../../services/workerService'
import { useAuth } from '../../../context/AuthContext'
import WorkerTable from '../components/WorkerTable'
import { PageHeader } from '../../../components/ui/PageHeader'
import { LayoutDashboard, Plus } from 'lucide-react'
import WorkerModal from '../components/WorkerModal'
import WorkerForm from '../components/WorkerForm'
import { toast } from 'react-hot-toast'

export default function SKKWorkers() {
  const { user } = useAuth()
  const [searchText, setSearchText] = useState('')
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const queryClient = useQueryClient()

  // Queries
  const { data: apiData, isLoading, isError, error } = useQuery({
    queryKey: ['skkWorkers'],
    queryFn: async () => {
      const response = await getWorkers('SKK', 'MAIN')
      if (!response.status) {
        throw new Error(response.message || 'API Error')
      }
      return response
    },
    refetchInterval: 30000,
    staleTime: 60000,
    cacheTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  // Mutations
  const addMutation = useMutation({
    mutationFn: (data) => addWorker({ ...data, company: 'SKK' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['skkWorkers'])
      setIsAddModalOpen(false)
      toast.success('เพิ่มพนักงานสำเร็จ')
    },
    onError: (error) => {
      toast.error(error.message || 'เกิดข้อผิดพลาดในการเพิ่มพนักงาน')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ cardId, data }) => updateWorker(cardId, { ...data, company: 'SKK' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['skkWorkers'])
      setIsEditModalOpen(false)
      setSelectedWorker(null)
      toast.success('แก้ไขข้อมูลสำเร็จ')
    },
    onError: (error) => {
      toast.error(error.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (cardId) => deleteWorker(cardId, 'SKK'),
    onSuccess: () => {
      queryClient.invalidateQueries(['skkWorkers'])
      toast.success('ลบข้อมูลสำเร็จ')
    },
    onError: (error) => {
      toast.error(error.message || 'เกิดข้อผิดพลาดในการลบข้อมูล')
    },
  })

  // Handlers
  const handleAdd = (data) => {
    addMutation.mutate(data)
  }

  const handleEdit = (data) => {
    updateMutation.mutate({
      cardId: selectedWorker.cardid,
      data: data,
    })
  }

  const handleDelete = async (worker) => {
    deleteMutation.mutate(worker.operid)
  }

  const workers = apiData?.data || []
  const filteredWorkers = workers.filter(worker => {
    const searchLower = searchText.toLowerCase()
    return (
      worker.cardid?.toLowerCase().includes(searchLower) ||
      worker.operid?.toLowerCase().includes(searchLower) ||
      worker.firstname?.toLowerCase().includes(searchLower) ||
      worker.lastname?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="p-4">
      <PageHeader
        title="จัดการพนักงาน SKK"
        description="ระบบจัดการข้อมูลพนักงาน SKK"
        icon={LayoutDashboard}
      />

      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="ค้นหาพนักงาน..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-[300px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              เพิ่มพนักงาน
            </button>
          </div>
        </div>

        <div className="p-6">
          <WorkerTable 
            workers={filteredWorkers} 
            loading={isLoading}
            onEdit={(worker) => {
              setSelectedWorker(worker)
              setIsEditModalOpen(true)
            }}
            onDelete={handleDelete}
            showPlant={false}
          />

          {isError && (
            <div className="text-red-500 mt-4">
              {error?.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล'}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <WorkerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="เพิ่มพนักงาน"
      >
        <WorkerForm onSubmit={handleAdd} />
      </WorkerModal>

      {/* Edit Modal */}
      <WorkerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedWorker(null)
        }}
        title="แก้ไขข้อมูลพนักงาน"
      >
        <WorkerForm
          onSubmit={handleEdit}
          defaultValues={selectedWorker}
          isEdit
        />
      </WorkerModal>
    </div>
  )
}
