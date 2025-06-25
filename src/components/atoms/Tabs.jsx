import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab, width = '800px' }) => {
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div
            className="p-4 mb-6 rounded-lg bg-gray-100/50 mx-auto backdrop-blur-sm"
            style={{ maxWidth: width, width: '100%' }}
        >
            <div className="flex flex-wrap gap-3 justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`border border-border/50 relative whitespace-nowrap px-5 py-2.5 rounded-xl font-medium transition-all duration-200 
                            ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-white/80 hover:text-gray-900 shadow-sm bg-white/50 backdrop-blur-sm'
                            } cursor-pointer`}
                    >
                        <span className="capitalize text-sm tracking-wide">
                            {tab?.icon} {tab.name}
                        </span>
                        {activeTab === tab.id && (
                            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-white/80 rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
