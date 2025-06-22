import { useValues } from '@/context/Context';
import React from 'react';

export default function FiltersModal() {
    const { closeModal, users, boardLabels, filter, setFilter } = useValues();

    const handleCheckbox = (field, value) => {
        const current = filter[field];
        setFilter({
            ...filter,
            [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
        });
    };

    const issueTypes = ['task', 'bug', 'story', 'epic'];
    const statusTypes = ['open', 'in-progress', 'done', 'blocked'];

    return (
        <div className='w-full  '>
            <div className='space-y-6 max-h-[70vh] overflow-y-auto pr-2'>
                {/* Members */}
                <div>
                    <h3 className='text-gray-700 font-medium mb-1'>Members</h3>
                    <div className='space-y-2'>
                        {users.map(user => (
                            <label key={user.id} className='flex items-center gap-2'>
                                <input type='checkbox' checked={filter.members.includes(user.id)} onChange={() => handleCheckbox('members', user.id)} className='accent-blue-500' />
                                <div className='flex items-center gap-2'>
                                    <img src={user.avatar} alt={user.name} className='h-6 w-6 rounded-full' />
                                    <span className='text-sm'>{user.name}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Labels */}
                <div>
                    <h3 className='text-gray-700 font-medium mb-1'>Labels</h3>
                    <div className='flex flex-wrap gap-2'>
                        {boardLabels.map(label => (
                            <button key={label.id} onClick={() => handleCheckbox('labels', label.id)} className={`text-xs font-medium px-3 py-1 rounded-md transition ring-offset-2 focus:outline-none ${filter.labels.includes(label.id) ? 'ring-2 ring-blue-400' : 'hover:opacity-90'}`} style={{ backgroundColor: label.color }}>
                                {label.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Issue Types */}
                <div>
                    <h3 className='text-gray-700 font-medium mb-1'>Issue Types</h3>
                    <div className='flex flex-wrap gap-2'>
                        {issueTypes.map(type => (
                            <button key={type} onClick={() => handleCheckbox('types', type)} className={`px-3 py-1 text-sm rounded-lg shadow-inner transition ${filter.types.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div>
                    <h3 className='text-gray-700 font-medium mb-1'>Status</h3>
                    <div className='flex flex-wrap gap-2'>
                        {statusTypes.map(status => (
                            <button key={status} onClick={() => handleCheckbox('statuses', status)} className={`px-3 py-1 text-sm rounded-lg shadow-inner transition ${filter.statuses.includes(status) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                                {status
                                    .split('-')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className='mt-6 -mb-2 flex justify-end gap-3'>
                <button
                    onClick={() =>
                        setFilter({
                            members: [],
                            labels: [],
                            types: [],
                            statuses: [],
                        })
                    }
                    className='px-4 py-2 text-sm rounded bg-gray-100 text-gray-700 hover:bg-gray-200'>
                    Clear All
                </button>
                <button onClick={closeModal} className='px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600'>
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
