import React, { useEffect, useState } from 'react';
import { CloseIcon } from './icons/Icons';

interface LogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogModal: React.FC<LogModalProps> = ({ isOpen, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            // Delay hiding to allow for exit animation
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!show) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center p-4 z-50" 
            role="dialog" 
            aria-modal="true"
        >
            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>
            <div 
                className={`bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                    <CloseIcon />
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">บันทึกเหตุการณ์ประจำวัน (สรุป)</h2>
                
                <div className="space-y-6 text-slate-700">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-blue-700">1. ภาพรวมการจัดกิจกรรม</h3>
                        <p>การจัดกิจกรรมในส่วนของเนื้อหา เช่น การบรรยาย, การดูดาว, การสอบ, และการใช้ห้องปฏิบัติการ สามารถดำเนินไปได้ตามกำหนดการที่วางไว้ และบรรลุวัตถุประสงค์หลักของค่าย</p>
                        <p className="mt-2">อย่างไรก็ตาม ตลอดระยะเวลาการจัดกิจกรรม ทีมงานได้เผชิญกับ <strong className="text-red-600">ปัญหาด้านอาคารสถานที่และระบบสาธารณูปโภค</strong> อย่างต่อเนื่อง ซึ่งส่งผลกระทบต่อสวัสดิการของผู้เข้าร่วม (นักเรียน) และการปฏิบัติงานของทีมงานอย่างมาก</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-green-700">2. ข้อดี / จุดแข็ง (Strengths)</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>การดำเนินงานด้านวิชาการ:</strong> ตารางกิจกรรมหลัก เช่น การบรรยายของวิทยากร, กิจกรรมดูดาว, การใช้แผนที่ดาว, และการสอบ ดำเนินไปได้อย่างราบรื่น</li>
                            <li><strong>การบันทึกปัญหา:</strong> จุดแข็งที่สุดของทีมงานครั้งนี้ คือ การบันทึกปัญหาอย่างละเอียด มีการระบุ วันที่, เวลา, หมายเลขห้อง, และลักษณะปัญหาอย่างชัดเจน ซึ่งเป็นข้อมูลชั้นดีที่ทำให้เราสามารถถอดบทเรียนได้</li>
                            <li><strong>ความทุ่มเทของทีมงาน:</strong> ทีมงานและวิทยากรมีความพยายามสูงในการแก้ไขปัญหาเฉพาะหน้า เพื่อให้กิจกรรมดำเนินต่อไปได้ แม้จะประสบปัญหาไฟดับหรือน้ำรั่ว</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-red-700">3. ปัญหาที่พบ / ข้อด้อย (Problems & Weaknesses)</h3>
                        <p>ปัญหาที่พบส่วนใหญ่เป็น <strong className="font-semibold">ปัญหาเชิงโครงสร้างพื้นฐานของสถานที่</strong> ซึ่งสามารถแบ่งเป็นหมวดหมู่หลักได้ดังนี้:</p>
                        <ul className="list-none space-y-3 mt-3">
                            <li><strong className="text-red-600">⚠️ 1. ปัญหาระบบประปาและสุขาภิบาล:</strong> น้ำรั่ว, ส้วมตัน, น้ำไม่ไหล, น้ำท่วมขัง</li>
                            <li><strong className="text-yellow-600">⚠️ 2. ปัญหาระบบไฟฟ้า:</strong> ไฟดับในห้องพักบ่อยครั้ง และไฟดับทั้งระบบ</li>
                            <li><strong className="text-yellow-600">⚠️ 3. ปัญหาเครื่องปรับอากาศ:</strong> แอร์ไม่เย็น, แอร์น้ำหยด</li>
                            <li><strong className="text-yellow-600">⚠️ 4. ปัญหาด้านสวัสดิการและสิ่งแวดล้อม:</strong> ยุงกัดหลังฝนตก, มีนักเรียนไม่สบาย (ปวดท้อง, ท้องเสีย)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogModal;