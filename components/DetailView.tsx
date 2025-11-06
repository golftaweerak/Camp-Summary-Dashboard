
import React, { useState } from 'react';
import type { DashboardItem, FinancialMetric, Metric } from '../types';
import { ArrowLeftIcon } from './icons/Icons';
import StatCard from './StatCard';
import FinancialSummaryCard from './FinancialSummaryCard';

interface DetailViewProps {
    item: DashboardItem | 'financial';
    financialData: FinancialMetric[];
    onBack: () => void;
}

const getScoreBarColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-500';
    if (score >= 4.0) return 'bg-yellow-500';
    return 'bg-red-500';
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="inline-flex items-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-full border border-slate-200 shadow-sm cursor-pointer transition-all duration-300 ease-in-out mb-6 hover:bg-slate-50 hover:shadow-md hover:border-slate-300"
        aria-label="Go back to dashboard"
    >
        <ArrowLeftIcon />
        ย้อนกลับ
    </button>
);

const MetricList: React.FC<{ metrics: Metric[] }> = ({ metrics }) => {
    const sortedMetrics = [...metrics].sort((a, b) => b.score - a.score);
    return (
        <ul className="divide-y divide-slate-100">
            {sortedMetrics.map((metric, index) => {
                const barWidth = (metric.score / 5) * 100;
                const barColor = getScoreBarColor(metric.score);
                return (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-4 transition-colors hover:bg-slate-50/50">
                        <span className="text-slate-600 mb-1 sm:mb-0">{metric.name}</span>
                        <div className="flex items-center space-x-3 w-full sm:w-auto">
                            <span className="font-bold text-slate-800 text-lg w-12">{metric.score.toFixed(2)}</span>
                            <div className="w-full sm:w-32 bg-slate-200 rounded-full h-2.5" role="progressbar" aria-valuenow={metric.score} aria-valuemin={0} aria-valuemax={5}>
                                <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${barWidth}%` }}></div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

const ExpenseChart: React.FC<{ metrics: FinancialMetric[] }> = ({ metrics }) => {
    const [tooltip, setTooltip] = useState<{
        content: React.ReactNode;
        x: number;
        y: number;
    } | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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

    const categorizedExpenses = metrics.reduce((acc, metric) => {
        const category = getExpenseCategory(metric.name);
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += metric.amount;
        return acc;
    }, {} as Record<string, number>);

    const totalExpense = Object.values(categorizedExpenses).reduce((sum, amount) => sum + amount, 0);

    const chartData = Object.entries(categorizedExpenses)
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
        }))
        .sort((a, b) => b.amount - a.amount);

    const handleMouseMove = (e: React.MouseEvent, category: string, amount: number, percentage: number) => {
        setTooltip({
            content: (
                <div className="text-center">
                    <strong className="font-bold">{category}</strong>
                    <div className="mt-1">
                        {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท 
                        <span className="text-slate-300"> ({percentage.toFixed(1)}%)</span>
                    </div>
                </div>
            ),
            x: e.clientX,
            y: e.clientY,
        });
        setHoveredCategory(category);
    };

    const handleMouseLeave = () => {
        setTooltip(null);
        setHoveredCategory(null);
    };

    return (
        <div className="space-y-4" onMouseLeave={handleMouseLeave}>
            {tooltip && (
                <div
                    role="tooltip"
                    className="fixed z-10 p-2 px-3 text-xs font-medium text-white bg-slate-900/90 backdrop-blur-sm rounded-md shadow-lg pointer-events-none whitespace-nowrap"
                    style={{ top: tooltip.y + 15, left: tooltip.x, transform: 'translateX(-50%)' }}
                >
                    {tooltip.content}
                </div>
            )}
            {chartData.map(({ category, amount, percentage }) => (
                <div 
                    key={category}
                    className="rounded-lg transition-colors -m-2 p-2 hover:bg-slate-50"
                    onMouseMove={(e) => handleMouseMove(e, category, amount, percentage)}
                    aria-label={`Category: ${category}, Amount: ${amount.toFixed(2)}, Percentage: ${percentage.toFixed(1)}%`}
                >
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">{category}</span>
                        <span className="text-sm font-semibold text-slate-500">
                            {amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} บาท ({percentage.toFixed(1)}%)
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${category} expense bar`}>
                        <div
                            className={`${categoryColors[category] || 'bg-slate-500'} h-3 rounded-full transition-all duration-300 ease-in-out`}
                            style={{ 
                                width: `${percentage}%`,
                                filter: hoveredCategory === category ? 'brightness(1.15)' : 'brightness(1)'
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const FinancialDetailList: React.FC<{ metrics: FinancialMetric[] }> = ({ metrics }) => {
    const totalExpense = metrics.reduce((acc, metric) => acc + metric.amount, 0);
    const totalIncome = 576000.00;
    const balance = totalIncome - totalExpense;

    return (
        <div>
            <ul className="divide-y divide-slate-100">
                {metrics.map((metric, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-4 transition-colors hover:bg-slate-50/50">
                        <span className="text-slate-600 mb-1 sm:mb-0">{metric.name}</span>
                        <span className="font-bold text-slate-800 text-lg">
                            {metric.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                        </span>
                    </li>
                ))}
            </ul>
            <div className="p-4 bg-slate-50 border-t-2 border-slate-200 space-y-2">
                 <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-600">รายรับรวม</span>
                    <span className="font-bold text-green-600 text-lg">
                        {totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-600">รายจ่ายรวม</span>
                    <span className="font-bold text-red-600 text-lg">
                        {totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                    </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-800">คงเหลือ</span>
                    <span className={`font-bold text-xl ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                    </span>
                </div>
            </div>
        </div>
    );
};

const DetailView: React.FC<DetailViewProps> = ({ item, financialData, onBack }) => {
    const isFinancial = item === 'financial';
    const dataItem = isFinancial ? null : item;

    return (
        <div className="max-w-4xl mx-auto">
            <BackButton onClick={onBack} />
            <div className="grid grid-cols-1 gap-6">
                {dataItem && <StatCard item={dataItem} onSelect={() => {}} />}
                {isFinancial && <FinancialSummaryCard metrics={financialData} onSelect={() => {}} />}
                
                {isFinancial && (
                     <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b border-slate-200">
                           <h3 className="text-xl font-semibold text-slate-700">
                               ภาพรวมสัดส่วนรายจ่าย
                           </h3>
                       </div>
                       <div className="p-4 sm:p-6">
                           <ExpenseChart metrics={financialData} />
                       </div>
                   </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-xl font-semibold text-slate-700">
                            {isFinancial ? 'รายละเอียดรายจ่าย' : `${dataItem?.title} (N=${dataItem?.n})`}
                        </h3>
                    </div>
                    {isFinancial ? <FinancialDetailList metrics={financialData} /> : <MetricList metrics={dataItem?.metrics ?? []} />}
                </div>
            </div>
        </div>
    );
};

export default DetailView;
