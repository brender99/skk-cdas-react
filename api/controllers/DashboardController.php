<?php
require_once '../config/database.php';

class DashboardController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getDashboardData($role = 'SKK', $plant = null) {
        try {
            // Get basic stats (total and loading)
            $basicStats = $this->getBasicStats($role, $plant);
            
            // Get time statistics
            $timeStats = $this->getTimeStats($role, $plant);
            
            // Get status summary
            $statusSummary = $this->getStatusSummary($role, $plant);
            
            // Get product summary with role and plant
            $productSummary = $this->getProductSummary($role, $plant);
            
            // Get latest transports
            $latestTransports = $this->getLatestTransports($role, $plant);

            return [
                'success' => true,
                'data' => [
                    'summary' => [
                        'total' => intval($basicStats['TOTAL']),
                        'loading' => intval($basicStats['LOADING']),
                        'time_stats' => [
                            'avg' => floatval($timeStats['avg']),
                            'min' => floatval($timeStats['min']),
                            'max' => floatval($timeStats['max'])
                        ],
                        'by_status' => $statusSummary,
                        'by_product' => $productSummary
                    ],
                    'transports' => $latestTransports
                ]
            ];
        } catch (Exception $e) {
            error_log("Error in getDashboardData: " . $e->getMessage());
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    private function getBasicStats($role = 'SKK', $plant = null) {
        try {
            // กำหนด allowed product types ตาม role และ plant
            $allowedTypes = [];
            if ($role === 'SKK') {
                $allowedTypes = ['01', '02', '03', '09'];
            } else if ($role === 'SMK') {
                if ($plant === 'KK1') {
                    $allowedTypes = ['11'];
                } else if ($plant === 'KK2') {
                    $allowedTypes = ['11', '15'];
                }
            }

            // ถ้าไม่มี allowed types ให้ return 0
            if (empty($allowedTypes)) {
                return ['TOTAL' => 0, 'LOADING' => 0];
            }

            $query = "
                SELECT 
                    COUNT(*) as TOTAL,
                    SUM(CASE 
                        WHEN STATUS IN (2,3,4) THEN 1 
                        ELSE 0 
                    END) as LOADING
                FROM CDAS.TRANSPORT 
                WHERE TRUNC(BOOTHDATE) = TRUNC(SYSDATE)
                AND PRODUCTTYPE IN (" . implode(',', array_map(function($type) { 
                    return "'$type'"; 
                }, $allowedTypes)) . ")";
            
            $stmt = oci_parse($this->conn, $query);
            if (!$stmt) {
                throw new Exception("Failed to parse basic stats query");
            }
            
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                throw new Exception("Failed to execute basic stats query: " . $e['message']);
            }
            
            $result = oci_fetch_assoc($stmt);
            if (!$result) {
                return ['TOTAL' => 0, 'LOADING' => 0];
            }
            
            return $result;
        } catch (Exception $e) {
            error_log("Error in getBasicStats: " . $e->getMessage());
            throw $e;
        }
    }

    private function getTimeStats($role = 'SKK', $plant = null) {
        try {
            // กำหนด allowed product types ตาม role และ plant
            $allowedTypes = [];
            if ($role === 'SKK') {
                $allowedTypes = ['01', '02', '03', '09'];
            } else if ($role === 'SMK') {
                if ($plant === 'KK1') {
                    $allowedTypes = ['11'];
                } else if ($plant === 'KK2') {
                    $allowedTypes = ['11', '15'];
                }
            }

            // ถ้าไม่มี allowed types ให้ return 0
            if (empty($allowedTypes)) {
                return ['avg' => 0, 'min' => 0, 'max' => 0];
            }

            $query = "
                SELECT 
                    ROUND(AVG((CAST(GROSSDATE AS DATE) - CAST(FIRSTTAREDATE AS DATE)) * 24 * 60), 2) as avg_time,
                    ROUND(MIN((CAST(GROSSDATE AS DATE) - CAST(FIRSTTAREDATE AS DATE)) * 24 * 60), 2) as min_time,
                    ROUND(MAX((CAST(GROSSDATE AS DATE) - CAST(FIRSTTAREDATE AS DATE)) * 24 * 60), 2) as max_time
                FROM CDAS.TRANSPORT
                WHERE TRUNC(BOOTHDATE) = TRUNC(SYSDATE)
                AND STATUS = 5
                AND FIRSTTAREDATE IS NOT NULL
                AND GROSSDATE IS NOT NULL
                AND PRODUCTTYPE IN (" . implode(',', array_map(function($type) { 
                    return "'$type'"; 
                }, $allowedTypes)) . ")";
            
            $stmt = oci_parse($this->conn, $query);
            if (!$stmt) {
                throw new Exception("Failed to parse time stats query");
            }
            
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                throw new Exception("Failed to execute time stats query: " . $e['message']);
            }
            
            $result = oci_fetch_assoc($stmt);
            if (!$result) {
                return ['avg' => 0, 'min' => 0, 'max' => 0];
            }
            
            return [
                'avg' => floatval($result['AVG_TIME']),
                'min' => floatval($result['MIN_TIME']),
                'max' => floatval($result['MAX_TIME'])
            ];
        } catch (Exception $e) {
            error_log("Error in getTimeStats: " . $e->getMessage());
            throw $e;
        }
    }

    private function getStatusSummary($role = 'SKK', $plant = null) {
        try {
            // กำหนด allowed product types ตาม role และ plant
            $allowedTypes = [];
            if ($role === 'SKK') {
                $allowedTypes = ['01', '02', '03', '09'];
            } else if ($role === 'SMK') {
                if ($plant === 'KK1') {
                    $allowedTypes = ['11'];
                } else if ($plant === 'KK2') {
                    $allowedTypes = ['11', '15'];
                }
            }

            // ถ้าไม่มี allowed types ให้ return array ว่าง
            if (empty($allowedTypes)) {
                return [];
            }

            $query = "
                SELECT 
                    A.STATUS,
                    S.STATUSDESC,
                    COUNT(*) as COUNT
                FROM CDAS.TRANSPORT A
                INNER JOIN CDAS.TRUCKSTATUS S ON A.STATUS = S.TRUCKSTATUS
                WHERE TRUNC(A.BOOTHDATE) = TRUNC(SYSDATE)
                AND A.PRODUCTTYPE IN (" . implode(',', array_map(function($type) { 
                    return "'$type'"; 
                }, $allowedTypes)) . ")
                GROUP BY A.STATUS, S.STATUSDESC
                ORDER BY A.STATUS";
            
            $stmt = oci_parse($this->conn, $query);
            if (!$stmt) {
                throw new Exception("Failed to parse status summary query");
            }
            
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                throw new Exception("Failed to execute status summary query: " . $e['message']);
            }
            
            $statusSummary = [];
            while ($row = oci_fetch_assoc($stmt)) {
                $statusSummary[] = [
                    'status' => $row['STATUS'],
                    'status_desc' => $row['STATUSDESC'],
                    'count' => intval($row['COUNT'])
                ];
            }
            
            return $statusSummary;
        } catch (Exception $e) {
            error_log("Error in getStatusSummary: " . $e->getMessage());
            throw $e;
        }
    }

    private function getProductSummary($role = 'SKK', $plant = null) {
        try {
            // กำหนดค่าเริ่มต้นสำหรับทุกประเภทสินค้า
            $allProductTypes = [
                '01' => ['name' => 'ปูนถุง', 'count' => 0],
                '02' => ['name' => 'ปูนผง', 'count' => 0],
                '03' => ['name' => 'บิ๊กแบ็ค', 'count' => 0],
                '09' => ['name' => 'ปูนเม็ด', 'count' => 0],
                '11' => ['name' => 'ปูนถุงมอร์ตาร์', 'count' => 0],
                '15' => ['name' => 'ปูนผงมอร์ตาร์', 'count' => 0]
            ];

            // กรองประเภทสินค้าตาม role และ plant
            $allowedTypes = [];
            if ($role === 'SKK') {
                // SKK: ปูนถุง, ปูนผง, บิ๊กแบ็ค, ปูนเม็ด
                $allowedTypes = ['01', '02', '03', '09'];
            } else if ($role === 'SMK') {
                if ($plant === 'KK1') {
                    // KK1: ปูนถุงเท่านั้น (ใช้ปูนถุงมอร์ตาร์)
                    $allowedTypes = ['11'];
                } else if ($plant === 'KK2') {
                    // KK2: ปูนถุงและปูนผง (มอร์ตาร์)
                    $allowedTypes = ['11', '15'];
                }
            }

            // ถ้าไม่มี allowed types ให้ return array ว่าง
            if (empty($allowedTypes)) {
                return [];
            }

            // สร้าง array ใหม่เฉพาะประเภทที่อนุญาต
            $productTypes = array_intersect_key(
                $allProductTypes, 
                array_flip($allowedTypes)
            );

            // Get counts from database
            $query = "
                SELECT 
                    PRODUCTTYPE,
                    COUNT(*) as COUNT
                FROM CDAS.TRANSPORT 
                WHERE TRUNC(BOOTHDATE) = TRUNC(SYSDATE)
                AND PRODUCTTYPE IN (" . implode(',', array_map(function($type) { 
                    return "'$type'"; 
                }, $allowedTypes)) . ")
                GROUP BY PRODUCTTYPE";
            
            $stmt = oci_parse($this->conn, $query);
            if (!$stmt) {
                throw new Exception("Failed to parse product summary query");
            }
            
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                throw new Exception("Failed to execute product summary query: " . $e['message']);
            }
            
            // Update counts in product types array
            while ($row = oci_fetch_assoc($stmt)) {
                $prodType = $row['PRODUCTTYPE'];
                if (isset($productTypes[$prodType])) {
                    $productTypes[$prodType]['count'] = intval($row['COUNT']);
                }
            }
            
            return $productTypes;
        } catch (Exception $e) {
            error_log("Error in getProductSummary: " . $e->getMessage());
            throw $e;
        }
    }

    private function getLatestTransports($role = 'SKK', $plant = null, $limit = 20) {
        try {
            // กำหนด allowed product types ตาม role และ plant
            $allowedTypes = [];
            if ($role === 'SKK') {
                $allowedTypes = ['01', '02', '03', '09'];
            } else if ($role === 'SMK') {
                if ($plant === 'KK1') {
                    $allowedTypes = ['11'];
                } else if ($plant === 'KK2') {
                    $allowedTypes = ['11', '15'];
                }
            }

            // ถ้าไม่มี allowed types ให้ return array ว่าง
            if (empty($allowedTypes)) {
                return [];
            }

            $query = "
                SELECT 
                    A.CARDNO,
                    A.TRANSPORTNO as PLATENO,
                    REPLACE(P.PROVINCEDESC, 'กรุงเทพฯ', 'กรุงเทพมหานคร') AS PROVINCE_NAME,
                    PT.PRODUCTTYPEDESC AS PRODUCT_TYPE,
                    S.STATUSDESC AS STATUS,
                    TO_CHAR(A.BOOTHDATE, 'DDMMRRRRHH24MISS') AS BOOTHDATE,
                    TO_CHAR(A.FIRSTTAREDATE, 'DDMMRRRRHH24MISS') AS FIRSTTAREDATE,
                    TO_CHAR(A.GROSSDATE, 'DDMMRRRRHH24MISS') AS GROSSDATE
                FROM CDAS.TRANSPORT A
                INNER JOIN CDAS.TRUCKSTATUS S ON A.STATUS = S.TRUCKSTATUS
                INNER JOIN CDAS.PRODUCTTYPE PT ON A.PRODUCTTYPE = PT.PRODUCTTYPE
                INNER JOIN CDAS.PROVINCE P ON SUBSTR(A.TRANSPORTNO, 0, 2) = P.PROVINCENO
                WHERE TRUNC(A.BOOTHDATE) = TRUNC(SYSDATE)
                AND A.PRODUCTTYPE IN (" . implode(',', array_map(function($type) { 
                    return "'$type'"; 
                }, $allowedTypes)) . ")
                ORDER BY A.BOOTHDATE DESC";

            if ($limit > 0) {
                // Oracle syntax for LIMIT
                $query = "SELECT * FROM ($query) WHERE ROWNUM <= :limit";
            }
            
            $stmt = oci_parse($this->conn, $query);
            if (!$stmt) {
                throw new Exception("Failed to parse latest transports query");
            }

            if ($limit > 0) {
                oci_bind_by_name($stmt, ":limit", $limit);
            }
            
            if (!oci_execute($stmt)) {
                $e = oci_error($stmt);
                throw new Exception("Failed to execute latest transports query: " . $e['message']);
            }
            
            $transports = [];
            while ($row = oci_fetch_assoc($stmt)) {
                $transports[] = [
                    'booth_no' => $row['CARDNO'],
                    'plate_no' => $row['PLATENO'],
                    'province_name' => $row['PROVINCE_NAME'],
                    'product_type' => $row['PRODUCT_TYPE'],
                    'status' => $row['STATUS'],
                    'booth_date' => $row['BOOTHDATE'],
                    'first_tare_date' => $row['FIRSTTAREDATE'],
                    'gross_date' => $row['GROSSDATE']
                ];
            }
            
            return $transports;
        } catch (Exception $e) {
            error_log("Error in getLatestTransports: " . $e->getMessage());
            throw $e;
        }
    }
}
?>