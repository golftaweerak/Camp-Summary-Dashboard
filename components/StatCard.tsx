import React from 'react';
import type { DashboardItem } from '../types';
import * as Icons from './icons/Icons';

interface StatCardProps {
    item: DashboardItem;
    onSelect: () => void;
}

const getScoreTextColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
};

const StatCard: React.FC<StatCardProps> = ({ item, onSelect }) => {
    const IconComponent = Icons[item.icon as keyof typeof Icons] || Icons.ClipboardIcon;

    return (
        <div 
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-slate-200/50"
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onSelect()}
        >
            <div className="flex justify-between items-start">
                 <div>
                    <h3 className="font-semibold text-slate-500">{item.title}</h3>
                    <p className={`text-4xl font-bold ${getScoreTextColor(item.average)}`}>
                        {item.average.toFixed(2)}
                    </p>
                </div>
                <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                    <IconComponent />
                </div>
            </div>
            <p className="text-sm text-slate-400 mt-2">N = {item.n} คน</p>
        </div>
    );
};

export default StatCard;