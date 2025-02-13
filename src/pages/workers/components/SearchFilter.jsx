import { Search, Plus } from 'lucide-react'

export default function SearchFilter({ 
  search = '', 
  setSearch,
  typeFilter = '',
  setTypeFilter,
  showPlantFilter = false,
  plantFilter = '',
  setPlantFilter,
  onAdd
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">ค้นหาและกรองข้อมูล</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5 mr-2" />
            เพิ่มพนักงาน
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* ช่องค้นหา */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหารหัสบัตร, รหัสพนักงาน หรือ ชื่อ-นามสกุล"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-4">
          {/* ตัวกรองประเภท */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[150px]"
          >
            <option value="">ประเภททั้งหมด</option>
            <option value="BAG">BAG</option>
            <option value="STAFF">STAFF</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>

          {/* ตัวกรองโรงงาน (เฉพาะ SMK) */}
          {showPlantFilter && (
            <select
              value={plantFilter}
              onChange={(e) => setPlantFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[150px]"
            >
              <option value="">โรงงานทั้งหมด</option>
              <option value="KK1">KK1</option>
              <option value="KK2">KK2</option>
            </select>
          )}
        </div>
      </div>
    </div>
  )
}
