
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from './icons/Icons';
import type { FinancialMetric } from '../types';


interface FinancialSummaryCardProps {
    metrics: FinancialMetric[];
    onSelect: () => void;
}

const getExpenseCategory = (name: string): string => {
    if (name.includes('วิทยากร')) return 'ค่าตอบแทนวิทยากร';
    if (name.includes('อาหาร') || name.includes('กันเลี้ยง')) return 'ค่าอาหารและเครื่องดื่ม';
    if (name.includes('โรงแรม') || name.includes('รถบัส')) return 'ค่าที่พักและการเดินทาง';
    if (name.includes('กระเป๋า') || name.includes('ป้าย') || name.includes('สายสื่อ') || name.includes('เสื้อ') || name.includes('เอกสาร') || name.includes('ถุง') || name.includes('ของที่ระลึก')) return 'วัสดุและอุปกรณ์';
    if (name.includes('ประสานงาน') || name.includes('เจ้าหน้าที่') || name.includes('ครู')) return 'ค่าบุคลากร';
    if (name.includes('ค่าอบรม')) return 'ค่าสถานที่/หลักสูตร';
    return 'อื่น ๆ';
};

const categoryColors: Record<string, string> = {
    'ค่าตอบแทนวิทยากร': 'bg-blue-500',
    'ค่าอาหารและเครื่องดื่ม': 'bg-green-500',
    'ค่าที่พักและการเดินทาง': 'bg-purple-500',
    'วัสดุและอุปกรณ์': 'bg-yellow-500',
    'ค่าบุคลากร': 'bg-indigo-500',
    'ค่าสถานที่/หลักสูตร': 'bg-pink-500',
    'อื่น ๆ': 'bg-slate-500',
};


const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({ metrics, onSelect }) => {
    const totalExpense = metrics.reduce((acc, metric) => acc + metric.amount, 0);
    const totalIncome = 576000.00; // From foundation
    const balance = totalIncome - totalExpense;

    const categorizedExpenses = metrics.reduce((acc, metric) => {
        const category = getExpenseCategory(metric.name);
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += metric.amount;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(categorizedExpenses)
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
        }))
        .sort((a, b) => b.amount - a.amount);

    return (
        <div 
            onClick={onSelect}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-slate-200/50"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onSelect()}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                        <ArrowDownIcon />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-slate-500">รายรับ (จากมูลนิธิ)</span>
                        <p className="text-3xl font-bold text-green-600">{totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <span className="text-sm text-slate-500">บาท</span>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                        <ArrowUpIcon />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-slate-500">รายจ่าย (รวม)</span>
                        <p className="text-3xl font-bold text-red-600">{totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <span className="text-sm text-slate-500">บาท</span>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <WalletIcon />
                    </div>
                    <div>
                        <span className="text-sm font-medium text-slate-500">คงเหลือ</span>
                        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <span className="text-sm text-slate-500">บาท</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-medium text-slate-500 mb-3">ภาพรวมสัดส่วนรายจ่าย</h4>
                <div className="w-full bg-slate-200 rounded-full h-4 flex overflow-hidden" aria-label="Expense breakdown by category">
                    {chartData.map(({ category, percentage }) => (
                        <div
                            key={category}
                            className={`${categoryColors[category] || 'bg-slate-500'}`}
                            style={{ width: `${percentage}%` }}
                            title={`${category}: ${percentage.toFixed(1)}%`}
                        ></div>
                    ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
                    {chartData.map(({ category }) => (
                        <div key={category} className="flex items-center gap-1.5">
                            <span className={`w-3 h-3 rounded-sm ${categoryColors[category] || 'bg-slate-500'}`}></span>
                            <span>{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinancialSummaryCard;