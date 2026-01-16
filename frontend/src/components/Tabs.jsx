import { RotateCcw, CalendarDays, Radio } from 'lucide-react';

const Tabs = ({ activeTab, onTabChange, counts = { upcoming: 0, live: 0, recent: 0 } }) => {
    const tabs = [
        { id: 'upcoming', label: 'Upcoming', icon: <CalendarDays size={16} />, count: counts.upcoming },
        { id: 'live', label: 'Live', icon: <Radio size={16} />, count: counts.live },
        { id: 'recent', label: 'Recent', icon: <RotateCcw size={16} />, count: counts.recent }
    ];

    return (
        <div className="flex border-b border-white/10 mb-4">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${activeTab === tab.id
                        ? 'text-orange-500 border-orange-500'
                        : 'text-gray-400 border-transparent hover:text-white'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <span>{tab.icon}</span>
                        {tab.label}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default Tabs;
