import type { DashboardItem, FinancialMetric } from './types';

export const DASHBOARD_DATA: DashboardItem[] = [
    {
        id: "project-overview",
        title: "ภาพรวมโครงการ",
        n: 15,
        average: 4.59,
        colorClass: "text-green-600",
        icon: "Clipboard",
        metrics: [
            { name: "ได้รับความรู้เพิ่มเติมฯ", score: 4.87 },
            { name: "บรรลุวัตถุประสงค์ฯ", score: 4.87 },
            { name: "วิทยากรโดยรวมมีคุณภาพ", score: 4.80 },
            { name: "โดยภาพรวมคุ้มค่า", score: 4.80 },
            { name: "ได้แลกเปลี่ยนความรู้", score: 4.67 },
            { name: "ได้รับความรู้/ทักษะใหม่", score: 4.60 },
            { name: "เนื้อหาน่าสนใจ", score: 4.60 },
            { name: "เนื้อหาเป็นประโยชน์", score: 4.53 },
            { name: "เวลาอบรมเหมาะสม", score: 4.20 },
            { name: "เนื้อหาตรงกับที่ใช้สอบ", score: 4.00 },
        ]
    },
    {
        id: "lecturers",
        title: "ด้านวิทยากร",
        n: 15,
        average: 4.58,
        colorClass: "text-green-600",
        icon: "User",
        metrics: [
            { name: "การใช้เวลาตามที่กำหนด", score: 4.73 },
            { name: "การเชื่อมโยงเนื้อหา", score: 4.60 },
            { name: "การถ่ายทอดความรู้ชัดเจน", score: 4.53 },
            { name: "ความสามารถในการอธิบาย", score: 4.53 },
            { name: "ความครบถ้วนของเนื้อหา", score: 4.53 },
            { name: "การตอบข้อซักถาม", score: 4.53 },
        ]
    },
    {
        id: "knowledge",
        title: "ด้านความรู้ฯ",
        n: 15,
        average: 4.55,
        colorClass: "text-green-600",
        icon: "BookOpen",
        metrics: [
            { name: "ความเข้าใจภาคทฤษฎี", score: 4.67 },
            { name: "ความมั่นใจในการนำไปใช้", score: 4.67 },
            { name: "ความเข้าใจกิจกรรมดาราศาสตร์", score: 4.60 },
            { name: "การประยุกต์ใช้ปฏิบัติ", score: 4.47 },
            { name: "การนำไปใช้สอบค่ายต่อไป", score: 4.33 },
        ]
    },
    {
        id: "food",
        title: "ด้านอาหาร",
        n: 12,
        average: 4.43,
        colorClass: "text-yellow-600",
        icon: "Cutlery",
        metrics: [
            { name: "ปริมาณอาหาร", score: 4.75 },
            { name: "ความสะอาดสถานที่", score: 4.67 },
            { name: "ความสะอาดอาหาร", score: 4.58 },
            { name: "คุณภาพอาหาร", score: 4.42 },
            { name: "ความสะอาดภาชนะ", score: 4.42 },
            { name: "รสชาติอาหาร", score: 4.08 },
            { name: "ประเภทอาหาร", score: 4.08 },
        ]
    },
    {
        id: "location",
        title: "ด้านสถานที่",
        n: 5,
        average: 4.25,
        colorClass: "text-yellow-600",
        icon: "MapPin",
        metrics: [
            { name: "ความเหมาะสมห้องเรียน", score: 4.60 },
            { name: "ความพร้อมอุปกรณ์โสตฯ", score: 4.40 },
            { name: "พื้นที่การใช้งาน", score: 4.40 },
            { name: "สถานที่พักผ่อน", score: 4.40 },
            { name: "ความสะอาดโดยรวม", score: 4.20 },
            { name: "ความเหมาะสมห้องพัก", score: 4.00 },
            { name: "อุปกรณ์อำนวยความสะดวก", score: 4.00 },
            { name: "ระยะเวลาอบรม", score: 4.00 },
        ]
    },
    {
        id: "opening-ceremony",
        title: "ด้านพิธีเปิด",
        n: 19,
        average: 4.17,
        colorClass: "text-yellow-600",
        icon: "Sparkles",
        metrics: [
            { name: "สถานที่จัดกิจกรรม", score: 4.37 },
            { name: "การต้อนรับ/ลงทะเบียน", score: 4.37 },
            { name: "การประสานงาน/สื่อสาร", score: 4.26 },
            { name: "การเดินทาง", score: 3.95 },
            { name: "ระยะเวลา/ขั้นตอน", score: 3.89 },
        ]
    },
    {
        id: "activities",
        title: "ด้านกิจกรรม",
        n: 5,
        average: 4.00,
        colorClass: "text-yellow-600",
        icon: "Megaphone",
        metrics: [
            { name: "การเปิด-ปิดค่าย", score: 4.20 },
            { name: "การดูแลของครู", score: 4.20 },
            { name: "การลงทะเบียน/ต้อนรับ", score: 4.00 },
            { name: "กิจกรรมทัศนศึกษา", score: 4.00 },
            { name: "ความเหมาะสมของเวลา", score: 4.00 },
            { name: "กิจกรรมสันทนาการ", score: 3.60 },
        ]
    }
];

export const FINANCIAL_METRICS: FinancialMetric[] = [
    { name: "บจ.1 ค่ากระเป๋า", amount: 3000.00 },
    { name: "บจ.2 ค่าป้ายไวนิล", amount: 2500.00 },
    { name: "บจ.3 ค่าอาหารว่าง", amount: 1750.00 },
    { name: "บจ.4 ค่าสายสื่อ", amount: 350.00 },
    { name: "บจ.5 ค่าเสื้อ", amount: 22310.00 },
    { name: "บจ.6 ค่าเอกสาร", amount: 500.00 },
    { name: "บจ.7 ค่าอาหารว่าง", amount: 1750.00 },
    { name: "บจ.8 ค่าตอบแทนวิทยากร 3.5 ชม.", amount: 3500.00 },
    { name: "บจ.9 ค่าตอบแทนวิทยากร 7 ชม.", amount: 7000.00 },
    { name: "บจ.10 ค่าตอบแทนวิทยากร 3.5 ชม.", amount: 3500.00 },
    { name: "บจ.11 ค่าตอบแทนวิทยากร 7 ชม.", amount: 7000.00 },
    { name: "บจ.12 ค่าตอบแทนวิทยากร 21 ชม.", amount: 21000.00 },
    { name: "บจ.13 ค่าตอบแทนวิทยากร 7 ชม.", amount: 7000.00 },
    { name: "บจ.14 ค่าถุงพลาสติก", amount: 80.00 },
    { name: "บจ.15 ค่าตอบแทนวิทยากร 7 ชม.", amount: 7000.00 },
    { name: "บจ.16 ค่าตอบแทนวิทยากร 7 ชม.", amount: 7000.00 },
    { name: "บจ.17 ค่ารถบัสและค่าทัศนศึกษา", amount: 6845.00 },
    { name: "บจ.18 ค่าของที่ระลึกวันปิดค่าย", amount: 1620.00 },
    { name: "บจ.19 ค่าเวรนอนครู (30 คน x 1500)", amount: 45000.00 },
    { name: "บจ.20 ค่าโรงแรม", amount: 370440.00 },
    { name: "บจ.21 ค่ากันเลี้ยง", amount: 3090.00 },
    { name: "บจ.22 ค่าอาหารว่าง", amount: 2275.00 },
    { name: "บจ.23 ค่าผู้ประสานงาน", amount: 3000.00 },
    { name: "บจ.24 ค่าเจ้าหน้าที่การเงิน", amount: 3000.00 }
];