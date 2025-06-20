// components/TimetableSkeleton.jsx
import React from 'react';
const TimetableSkeleton = () => {
	return (
		<div className='animate-pulse space-y-2'>
			<div className='h-10 skeleton-box rounded'></div>
			<div className='grid grid-cols-8 gap-1'>
				{[...Array(8)].map((_, i) => (
					<div key={i} className='h-8 skeleton-box rounded'></div>
				))}
				{[...Array(56)].map((_, i) => (
					<div key={i} className='h-16 skeleton-box rounded'></div>
				))}
			</div>
		</div>
	);
};

export default TimetableSkeleton;