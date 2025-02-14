import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/api';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { LayoutDashboard, Timer, Truck, Scale, Package, CheckCircle2, CircleDollarSign } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'

const SMKDashboard = () => {
  const [selectedPlant, setSelectedPlant] = useState('KK1');

  const { data: apiData, isLoading, isError, error } = useQuery({
    queryKey: ['smkDashboard', selectedPlant],
    queryFn: async () => {
      const response = await axios.get(`${getApiBaseUrl()}/api-php/routes/dashboard.php`, {
        params: { 
          role: 'SMK',
          plant: selectedPlant
        }
      });
      return response.data;
    },
    refetchInterval: 30000,
    staleTime: 60000,
    cacheTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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

  // Transform hourly stats data for line chart
  const hourlyStatsData = useMemo(() => {
    if (!data?.summary?.hourly_stats) return [];
    const transformedData = data?.summary?.hourly_stats?.map(hour => {
      const hourData = {
        hour: `${hour.hour}:00`,
        'ปูนถุงมอร์ตาร์': parseInt(hour['11'] || 0),
        'ปูนผงมอร์ตาร์': parseInt(hour['15'] || 0)
      };
      return hourData;
    }) || [];
    return transformedData;
  }, [data]);

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-lg font-medium text-gray-700">กำลังโหลดข้อมูล...</div>
          <div className="text-sm text-gray-500">กรุณารอสักครู่</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <div className="text-lg font-medium text-gray-700">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
          <div className="text-sm text-gray-500">{error?.message || 'กรุณาลองใหม่อีกครั้ง'}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            โหลดข้อมูลใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`แดชบอร์ด SMK ${selectedPlant}`}
        description={`ข้อมูลวันที่ ${currentDate} เวลา ${currentTime}`}
        icon={LayoutDashboard}
      />

      {/* Plant Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedPlant('KK1')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedPlant === 'KK1'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          KK1
        </button>
        <button
          onClick={() => setSelectedPlant('KK2')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedPlant === 'KK2'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          KK2
        </button>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-[#4F46E5] rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-6xl font-bold mb-2">{data?.summary?.total || 0}</div>
              <div className="text-base">รถทั้งหมดวันนี้</div>
            </div>
            <div className="text-7xl">🚛</div>
          </div>
        </div>

        <div className="bg-[#F97316] rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-6xl font-bold mb-2">{data?.summary?.loading || 0}</div>
              <div className="text-base">รถในโรงงาน</div>
              <div className="text-sm mt-2">
                ร้อยละรถในโรงงาน {((data?.summary?.loading / data?.summary?.total) * 100 || 0).toFixed(1)}%
              </div>
            </div>
            <div className="text-7xl">🏭</div>
          </div>
        </div>

        <div className="bg-[#10B981] rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-6xl font-bold mb-2">{data?.summary?.time_stats?.avg?.toFixed(0) || 0} นาที</div>
              <div className="text-base">เวลาเฉลี่ย</div>
              <div className="text-sm mt-2">
                เฉลี่ย 1 คัน / {data?.summary?.time_stats?.avg?.toFixed(0) || 0} นาที
              </div>
            </div>
            <div className="text-7xl">⏱️</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - 3 Columns */}
      <div className="grid grid-cols-3 gap-6">
        {/* Status Cards - Left Column */}
        <div className="grid grid-cols-2 gap-4 h-[400px]">
          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-yellow-800">
                {data?.summary?.by_status?.find(s => s.status_desc === 'จองคิว')?.count || 0}
              </div>
              <Timer className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-base font-medium text-yellow-700">จองคิว</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-orange-800">
                {data?.summary?.by_status?.find(s => s.status_desc === 'เรียกคิว')?.count || 0}
              </div>
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-base font-medium text-orange-700">เรียกคิว</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-blue-800">
                {data?.summary?.by_status?.find(s => s.status_desc === 'ชั่งเบา')?.count || 0}
              </div>
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-base font-medium text-blue-700">ชั่งเบา</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-purple-800">
                {data?.summary?.by_status?.find(s => s.status_desc === 'กำลังรับสินค้า')?.count || 0}
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-base font-medium text-purple-700">กำลังรับสินค้า</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-green-800">
                {data?.summary?.by_status?.find(s => s.status_desc === 'รับสินค้าเสร็จ')?.count || 0}
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-base font-medium text-green-700">รับสินค้าเสร็จ</div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-indigo-800">
                {data?.summary?.by_status?.find(s => s.status_desc === 'ชั่งหนัก')?.count || 0}
              </div>
              <CircleDollarSign className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-base font-medium text-indigo-700">ชั่งหนัก</div>
          </div>
        </div>

        {/* Line Chart - Middle Column */}
        <div className="bg-white rounded-lg p-4 h-[400px]">
          <h2 className="text-lg font-medium mb-4">สถิติรถเข้ารับสินค้า รายชั่วโมง</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={hourlyStatsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hour"
                  interval={2}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ปูนถุงมอร์ตาร์"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                {selectedPlant === 'KK2' && (
                  <Line
                    type="monotone"
                    dataKey="ปูนผงมอร์ตาร์"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Right Column */}
        <div className="bg-white rounded-lg p-4 h-[400px]">
          <h2 className="text-lg font-medium mb-4">สัดส่วนประเภทสินค้า</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={productChartData}
                margin={{ top: 20, right: 40, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  barSize={80}
                  label={{
                    position: 'top',
                    fill: '#6B7280',
                    fontSize: 12,
                    fontWeight: 500
                  }}
                >
                  {productChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      index === 0 ? '#4F46E5' :
                      index === 1 ? '#F97316' :
                      index === 2 ? '#10B981' :
                      '#6366F1'
                    } />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
                <tr key={truck.card_no} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{truck.card_no}</td>
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
                  <td className="px-4 py-2">{truck.first_tare_date}</td>
                  <td className="px-4 py-2">{truck.gross_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SMKDashboard;
