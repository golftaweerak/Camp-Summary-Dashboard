import React from 'react';
import { CutleryIcon, MegaphoneIcon, ClockIcon, ClipboardIcon, UserIcon } from './icons/Icons';

const FeedbackSection: React.FC = () => {
    const feedbackItems = [
        { icon: <CutleryIcon />, color: "yellow", title: "ด้านอาหาร", text: "ควรเพิ่มความหลากหลายของประเภทอาหารและปรับปรุงรสชาติ (คะแนนเฉลี่ย 4.08)" },
        { icon: <MegaphoneIcon />, color: "red", title: "ด้านกิจกรรม", text: "ต้องการให้มีกิจกรรมสันทนาการเพิ่มเติม (คะแนนเฉลี่ย 3.60)" },
        { icon: <ClockIcon />, color: "yellow", title: "ด้านพิธีเปิด", text: "ระยะเวลาและขั้นตอนในพิธีเปิดนานเกินไป (คะแนนเฉลี่ย 3.89) และควรมีป้ายบอกทางที่ชัดเจน" },
        { icon: <ClipboardIcon />, color: "yellow", title: "ภาพรวมโครงการ", text: "เนื้อหาข้อสอบทฤษฎีไม่ตรงกับที่เรียน (คะแนนเฉลี่ย 4.00) ควรปรับเนื้อหาให้ตรงกับข้อสอบ หรือเพิ่มเวลาสอนทฤษฎี" },
        { icon: <UserIcon />, color: "gray", title: "ด้านวิทยากร", text: "มีผู้ให้ความเห็นว่า \"สอนยากเกินไป เครียดมาก\"" },
    ];
    
    const colorClasses = {
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
        red: { bg: 'bg-red-100', text: 'text-red-800' },
        gray: { bg: 'bg-slate-100', text: 'text-slate-800' },
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <ul className="flex flex-col gap-5">
                {feedbackItems.map((item, index) => {
                    const colors = colorClasses[item.color as keyof typeof colorClasses];
                    return (
                        <li key={index} className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center`}>
                                {item.icon}
                            </div>
                            <div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                                    {item.title}
                                </span>
                                <p className="text-slate-600 mt-1">{item.text}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FeedbackSection;