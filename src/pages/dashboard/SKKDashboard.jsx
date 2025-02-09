import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SKKDashboard = () => {
  const { data: apiData, isLoading, isError, error } = useQuery({
    queryKey: ['skkDashboard'],
    queryFn: async () => {
      const response = await axios.get(`${getApiBaseUrl()}/api/routes/dashboard.php`, {
        params: { 
          role: 'SKK',
          plant: 'MAIN'
        }
      });
      return response.data;
    },
    refetchInterval: 30000,
    staleTime: 60000, // Consider data fresh for 1 minute
    cacheTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const data = apiData?.data;
  const currentTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('th-TH', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  // Transform product summary data for chart
  const productChartData = Object.entries(data?.summary?.by_product || {}).map(([key, value]) => ({
    name: value.name,
    value: value.count
  }));

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Error notification */}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-medium">ไม่สามารถโหลดข้อมูลล่าสุดได้</p>
          <p className="text-sm">กำลังแสดงข้อมูลล่าสุดที่มี {data ? '- อัพเดทล่าสุด: ' + data.lastUpdated : ''}</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">ภาพรวมการจ่ายสินค้า</h1>
        <div className="text-sm text-gray-500">
          ข้อมูลวันที่ {currentDate} เวลา {currentTime}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-[#4F46E5] rounded-lg p-6 text-white relative">
          <div className="flex flex-col">
            <div className="text-6xl font-bold mb-2">{data?.summary?.total || 0}</div>
            <div className="text-base">รถทั้งหมดวันนี้</div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10">🚛</div>
        </div>

        <div className="bg-[#F97316] rounded-lg p-6 text-white relative">
          <div className="flex flex-col">
            <div className="text-6xl font-bold mb-2">{data?.summary?.loading || 0}</div>
            <div className="text-base">รถในโรงงาน</div>
            <div className="text-sm mt-2">
              ร้อยละรถในโรงงาน {((data?.summary?.loading / data?.summary?.total) * 100 || 0).toFixed(1)}%
            </div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10">🏭</div>
        </div>

        <div className="bg-[#10B981] rounded-lg p-6 text-white relative">
          <div className="flex flex-col">
            <div className="text-6xl font-bold mb-2">{data?.summary?.time_stats?.avg?.toFixed(0) || 0} นาที</div>
            <div className="text-base">เวลาเฉลี่ย</div>
            <div className="text-sm mt-2">
              เฉลี่ย 1 คัน / {data?.summary?.time_stats?.avg?.toFixed(0) || 0} นาที
            </div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10">⏱️</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-yellow-800 mb-1">
              {data?.summary?.by_status?.find(s => s.status_desc === 'จองคิว')?.count || 0}
            </div>
            <div className="text-sm font-medium text-yellow-700">จองคิว</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-orange-800 mb-1">
              {data?.summary?.by_status?.find(s => s.status_desc === 'เรียกคิว')?.count || 0}
            </div>
            <div className="text-sm font-medium text-orange-700">เรียกคิว</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-blue-800 mb-1">
              {data?.summary?.by_status?.find(s => s.status_desc === 'ชั่งเบา')?.count || 0}
            </div>
            <div className="text-sm font-medium text-blue-700">ชั่งเบา</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-purple-800 mb-1">
              {data?.summary?.by_status?.find(s => s.status_desc === 'กำลังรับสินค้า')?.count || 0}
            </div>
            <div className="text-sm font-medium text-purple-700">กำลังรับสินค้า</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-green-800 mb-1">
              {data?.summary?.by_status?.find(s => s.status_desc === 'รับสินค้าเสร็จ')?.count || 0}
            </div>
            <div className="text-sm font-medium text-green-700">รับสินค้าเสร็จ</div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-indigo-800 mb-1">
              {data?.summary?.by_status?.find(s => s.status_desc === 'ชั่งหนัก')?.count || 0}
            </div>
            <div className="text-sm font-medium text-indigo-700">ชั่งหนัก</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">สัดส่วนประเภทสินค้า</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4F46E5" name="จำนวนรถ" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Trucks Table */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">ตารางล่าสุด</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase">
              <tr>
                <th className="px-4 py-2 text-left">เลขที่บัตร</th>
                <th className="px-4 py-2 text-left">ทะเบียน</th>
                <th className="px-4 py-2 text-left">จังหวัด</th>
                <th className="px-4 py-2 text-left">สถานะ</th>
                <th className="px-4 py-2 text-left">ประเภท</th>
                <th className="px-4 py-2 text-left">เวลาเข้า</th>
                <th className="px-4 py-2 text-left">เวลาชั่งเบา</th>
                <th className="px-4 py-2 text-left">เวลาชั่งหนัก</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data?.transports?.map((truck) => (
                <tr key={truck.booth_no} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{truck.booth_no}</td>
                  <td className="px-4 py-2">{truck.plate_no}</td>
                  <td className="px-4 py-2">{truck.province_name}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${truck.status === 'จองคิว' ? 'bg-yellow-100 text-yellow-800' :
                        truck.status === 'เรียกคิว' ? 'bg-orange-100 text-orange-800' :
                        truck.status === 'ชั่งเบา' ? 'bg-blue-100 text-blue-800' :
                        truck.status === 'กำลังรับสินค้า' ? 'bg-purple-100 text-purple-800' :
                        truck.status === 'รับสินค้าเสร็จ' ? 'bg-green-100 text-green-800' :
                        'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {truck.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{truck.product_type}</td>
                  <td className="px-4 py-2">{truck.booth_date}</td>
                  <td className="px-4 py-2">{truck.first_tare_date || '-'}</td>
                  <td className="px-4 py-2">{truck.gross_date || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SKKDashboard;
