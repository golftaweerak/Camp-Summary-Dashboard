
import React, { useState } from 'react';
import { DASHBOARD_DATA, FINANCIAL_METRICS } from './constants';
import type { DashboardItem } from './types';
import Dashboard from './components/Dashboard';
import DetailView from './components/DetailView';
import LogModal from './components/LogModal';

const App: React.FC = () => {
    const [activeDetail, setActiveDetail] = useState<DashboardItem | 'financial' | null>(null);
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);

    const handleSelectDetail = (item: DashboardItem | 'financial') => {
        setActiveDetail(item);
        window.scrollTo(0, 0);
    };

    const handleGoBack = () => {
        setActiveDetail(null);
        window.scrollTo(0, 0);
    };

    return (
        <div className="p-4 sm:p-8 min-h-screen">
            {activeDetail === null ? (
                <Dashboard
                    dashboardData={DASHBOARD_DATA}
                    onSelectDetail={handleSelectDetail}
                    onShowLog={() => setIsLogModalOpen(true)}
                />
            ) : (
                <DetailView
                    item={activeDetail}
                    financialData={FINANCIAL_METRICS}
                    onBack={handleGoBack}
                />
            )}
            <LogModal
                isOpen={isLogModalOpen}
                onClose={() => setIsLogModalOpen(false)}
            />
        </div>
    );
};

export default App;
