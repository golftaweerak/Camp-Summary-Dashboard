import React from 'react';
import type { DashboardItem } from '../types';
import StatCard from './StatCard';
import FinancialSummaryCard from './FinancialSummaryCard';
import FeedbackSection from './FeedbackSection';
import { FINANCIAL_METRICS } from '../constants';

interface DashboardProps {
    dashboardData: DashboardItem[];
    onSelectDetail: (item: DashboardItem | 'financial') => void;
    onShowLog: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboardData, onSelectDetail, onShowLog }) => {
    return (
        <div id="mainView" className="max-w-7xl mx-auto">
            <header className="mb-10">
                <div className="flex items-center gap-4 sm:gap-6">
                    <img 
                        src="https://drive.google.com/thumbnail?id=1l_ValvpBYBbMBlyqApeWcgzYnPUPtAY9" 
                        alt="ตราสัญลักษณ์โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี" 
                        className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
                    />
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800">สรุปผลการดำเนินงาน</h1>
                        <p className="mt-2 text-lg sm:text-xl text-slate-600">ค่าย 1 สอวน.วิชาดาราศาสตร์ ศูนย์โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={onShowLog}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out"
                    >
                        อ่านสรุปบันทึกเหตุการณ์
                    </button>
                </div>
            </header>

            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-700">ภาพรวมความพึงพอใจในด้านต่าง ๆ (Overall Average)</h2>
                <p className="mt-4 text-lg sm:text-xl text-slate-600"> (คะแนนเต็ม 5) </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {dashboardData.map(item => (
                        <StatCard key={item.id} item={item} onSelect={() => onSelectDetail(item)} />
                    ))}
                </div>
            </section>

            <section className="mb-10">
                 <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-700">สรุปด้านงบประมาณ (Financial Summary)</h2>
                 <FinancialSummaryCard metrics={FINANCIAL_METRICS} onSelect={() => onSelectDetail('financial')} />
            </section>

            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-700">ข้อเสนอแนะสำคัญ (Key Feedback)</h2>
                <FeedbackSection />
            </section>
        </div>
    );
};

export default Dashboard;