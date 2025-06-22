import { useValues } from '@/context/Context'
import React from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl';

export default function AIAssistantModal() {
	const t = useTranslations('AI');

	const {
		aiQuery, setAiQuery,
		isAiProcessing, setIsAiProcessing,
		aiResponse, setAiResponse,
		closeModal,
		riskItems,
		predictions,
		cards,
		boards
	} = useValues();

const handleAiQuery = () => {
	setIsAiProcessing(true);
	setTimeout(() => {
		let response = '';
		const query = aiQuery.toLowerCase();

		if (
			query.includes('risk') || query.includes('problem') ||
			query.includes('مخاطر') || query.includes('مشاكل') || query.includes('مشكلة')
		) {
			response = t('risks_found', { count: riskItems.length }) + '\n' +
				riskItems.map(r => `- ${r.title} (${r.riskType}, ${r.severity})`).join('\n');
		} else if (
			query.includes('predict') || query.includes('delay') ||
			query.includes('تأخير') || query.includes('توقع') || query.includes('تأخيرات')
		) {
			const delayed = predictions.filter(p => p.prediction !== 'On Track').length;
			response = t('delays_found', { total: predictions.length, delayed }) + '\n' +
				predictions
					.filter(p => p.prediction !== 'On Track')
					.map(p => `- ${p.title} (${p.prediction}, ${p.confidence} confidence)`)
					.join('\n');
		} else if (
			query.includes('time') || query.includes('hours') ||
			query.includes('وقت') || query.includes('ساعات') || query.includes('الزمن') || query.includes('المدة')
		) {
			const totalEstimated = cards.reduce((sum, c) => sum + (c.estimate_time || 0), 0);
			const totalSpent = cards.reduce((sum, c) => sum + (c.time_spent || 0), 0);
			response = t('time_report', {
				estimated: totalEstimated,
				spent: totalSpent,
				completion: Math.round((totalSpent / totalEstimated) * 100)
			});
		} else if (
			query.includes('board') || query.includes('show me') ||
			query.includes('لوحة') || query.includes('عرض') || query.includes('أظهر لي')
		) {
			response = t('boards_found', { count: boards.length }) + '\n' +
				boards.map(b => `- ${b.title} (${b.visibility})`).join('\n');
		} else {
			response = t('help_response');
		}

		setAiResponse(response);
		setIsAiProcessing(false);
	}, 1000);
};


	const suggestions = [
		t('suggest_risks'),
		t('suggest_time'),
		t('suggest_delays'),
		t('suggest_boards'),
	];

	return (
		<div className='bg-white w-full flex flex-col space-y-4'>

			{/* Help Box */}
			<div className='bg-blue-50 p-4 rounded-lg text-sm text-gray-700'>
				<p className='mb-2 font-semibold'>{t('help_title')}</p>
				<ul className='list-disc list-inside space-y-1'>
					<li>{t('help_risks')}</li>
					<li>{t('help_delays')}</li>
					<li>{t('help_time')}</li>
					<li>{t('help_boards')}</li>
				</ul>
				<p className='mt-3 text-xs italic text-gray-600'>{t('help_example')}</p>
			</div>

			{/* Suggestions */}
			<div className='flex flex-wrap gap-2 text-xs'>
				{suggestions.map((s, i) => (
					<button
						key={i}
						className='bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full border text-gray-700 transition'
						onClick={() => setAiQuery(s)}
					>
						{s}
					</button>
				))}
			</div>

			{/* AI Response */}
			{aiResponse && (
				<div className='bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm text-gray-800 border border-gray-200'>
					{aiResponse}
				</div>
			)}

			{/* Input */}
			<div className='flex'>
				<input
					type='text'
					placeholder={t('input_placeholder')}
					value={aiQuery}
					onChange={e => setAiQuery(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && !isAiProcessing && handleAiQuery()}
					className='flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
					disabled={isAiProcessing}
				/>
				<button
					onClick={handleAiQuery}
					disabled={isAiProcessing || !aiQuery}
					className={`px-4 py-2 rounded-r-lg text-sm font-medium transition ${isAiProcessing || !aiQuery
						? 'bg-gray-300 text-gray-600 cursor-not-allowed'
						: 'bg-blue-600 text-white hover:bg-blue-700'
						}`}
				>
					{isAiProcessing ? <Loader2 className='animate-spin h-4 w-4' /> : t('ask_button')}
				</button>
			</div>
		</div>
	);
}
