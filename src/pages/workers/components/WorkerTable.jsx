import { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from '../../../components/ui/Table'
import { formatThaiDate } from '../../../utils/dateUtils'

// Modal component for delete confirmation
function DeleteConfirmModal({ isOpen, onClose, onConfirm, worker }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="inline-block transform overflow-hidden rounded-lg bg-gray-900 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-white">
                  ยืนยันการลบข้อมูล
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    คุณต้องการลบข้อมูลพนักงาน{' '}
                    <span className="font-medium text-white">
                      {worker?.firstname} {worker?.lastname}
                    </span>{' '}
                    ใช่หรือไม่?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              ยืนยัน
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-base font-medium text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkerTable({ workers = [], onEdit, onDelete, loading = false }) {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, worker: null })

  const handleDelete = (worker) => {
    setDeleteModal({ isOpen: true, worker })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.worker) {
      onDelete(deleteModal.worker)
      setDeleteModal({ isOpen: false, worker: null })
    }
  }

  const handleCloseModal = () => {
    setDeleteModal({ isOpen: false, worker: null })
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div role="status">
            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  if (!Array.isArray(workers) || !workers.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500">ไม่พบข้อมูลพนักงาน</div>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <Thead>
            <Tr>
              <Th className="whitespace-nowrap">รหัสบัตร</Th>
              <Th className="whitespace-nowrap">รหัสพนักงาน</Th>
              <Th className="whitespace-nowrap">ชื่อ</Th>
              <Th className="whitespace-nowrap">นามสกุล</Th>
              <Th className="whitespace-nowrap">ประเภท</Th>
              <Th className="whitespace-nowrap">กลุ่มผู้ใช้</Th>
              <Th className="whitespace-nowrap">วันที่อัพเดท</Th>
              <Th className="whitespace-nowrap">จัดการ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workers.map((worker, index) => (
              <Tr key={worker.cardid || index} className="hover:bg-gray-50">
                <Td>{worker.cardid || ''}</Td>
                <Td>{worker.operid}</Td>
                <Td>{worker.firstname}</Td>
                <Td>{worker.lastname}</Td>
                <Td>{worker.type}</Td>
                <Td>{worker.ugroup || '-'}</Td>
                <Td>{formatThaiDate(worker.lastupdate, true) || ''}</Td>
                <Td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit?.(worker)}
                      className="rounded bg-blue-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(worker)}
                      className="rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
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

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        worker={deleteModal.worker}
      />
    </>
  )
}
