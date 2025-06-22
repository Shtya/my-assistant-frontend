'use client';

import { useValues } from '@/context/Context';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function BoardSettingsModal() {
	const t = useTranslations('BoardSettings');
	const { closeModal  , currentBoard , currentBoardId, setCurrentBoardId,  inviteEmail, setInviteEmail, users, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, notificationsData, setNotificationsData , getBoardMembers  } = useValues();


	// Invite member to board
	const inviteToBoard = (boardId, email) => {
		const user = users.find(u => u.email === email);
		if (!user) return alert(t('user_not_found'));

		if (boardMembers.some(bm => bm.board_id === boardId && bm.user_id === user.id)) {
			return alert(t('user_already_member'));
		}

		setBoardMembers([...boardMembers, { board_id: boardId, user_id: user.id, role: 'member' }]);

		const newNotification = {
			id: Math.max(...notificationsData.map(n => n.id), 0) + 1,
			user_id: user.id,
			card_id: null,
			board_id: boardId,
			message: t('added_to_board', { board: boards.find(b => b.id === boardId)?.title }),
			read: false,
			timestamp: new Date().toISOString(),
		};
		setNotificationsData([...notificationsData, newNotification]);
		setInviteEmail('');
	};

	return (
		<div className='space-y-6'>
			{/* Board Title */}
			<div>
				<h3 className='font-medium mb-2'>{t('board_title')}</h3>
				<input
					type='text'
					value={currentBoard?.title || ''}
					onChange={e => {
						setBoards(boards.map(b => b.id === currentBoardId ? { ...b, title: e.target.value } : b));
					}}
					className='w-full p-2 border rounded-lg'
				/>
			</div>

			{/* Visibility */}
			<div>
				<h3 className='font-medium mb-2'>{t('visibility')}</h3>
				{['public', 'team', 'private'].map(type => (
					<label key={type} className='flex items-center space-x-2 mb-2'>
						<input
							type='radio'
							name='board-visibility'
							value={type}
							checked={currentBoard?.visibility === type}
							onChange={() => {
								setBoards(boards.map(b => b.id === currentBoardId ? { ...b, visibility: type } : b));
							}}
						/>
						<div>
							<span className='font-medium capitalize'>{t(`${type}_label`)}</span>
							<p className='text-xs text-gray-500'>{t(`${type}_desc`)}</p>
						</div>
					</label>
				))}
			</div>

			{/* Members */}
			<div>
				<h3 className='font-medium mb-2'>{t('members')}</h3>
				<div className='space-y-2 mb-3'>
					{getBoardMembers(currentBoardId).map(member => (
						<div key={member.id} className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'>
							<div className='flex items-center'>
								<img src={member.avatar} alt={member.name} className='h-8 w-8 rounded-full mr-2' />
								<div>
									<p className='font-medium'>{member.name}</p>
									<p className='text-xs text-gray-500'>
										{boardMembers.find(bm => bm.board_id === currentBoardId && bm.user_id === member.id)?.role}
									</p>
								</div>
							</div>
							{boardMembers.find(bm => bm.board_id === currentBoardId && bm.user_id === member.id)?.role !== 'admin' && (
								<button
									className='text-red-500 hover:text-red-700'
									onClick={() => {
										setBoardMembers(boardMembers.filter(bm => !(bm.board_id === currentBoardId && bm.user_id === member.id)));
									}}
								>
									{t('remove')}
								</button>
							)}
						</div>
					))}
				</div>
				<div className='flex'>
					<input
						type='email'
						placeholder={t('invite_by_email')}
						value={inviteEmail}
						onChange={e => setInviteEmail(e.target.value)}
						className='flex-1 p-2 border rounded-l-lg'
					/>
					<button
						className='px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600'
						onClick={() => inviteToBoard(currentBoardId, inviteEmail)}
					>
						{t('invite')}
					</button>
				</div>
			</div>

			{/* Danger Zone */}
			<div>
				<h3 className='font-medium mb-2'>{t('danger_zone')}</h3>
				<div className='p-3 border border-red-200 bg-red-50 rounded-lg'>
					<h4 className='font-medium text-red-800 mb-1'>{t('delete_title')}</h4>
					<p className='text-sm text-red-600 mb-2'>{t('delete_warning')}</p>
					<button
						className='px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600'
						onClick={() => {
							if (confirm(t('delete_confirm'))) {
								setBoards(boards.filter(b => b.id !== currentBoardId));
								setBoardMembers(boardMembers.filter(bm => bm.board_id !== currentBoardId));
								setLists(lists.filter(l => l.board_id !== currentBoardId));
								setCurrentBoardId(boards.find(b => b.id !== currentBoardId)?.id || null);
								closeModal();
							}
						}}
					>
						{t('delete_board')}
					</button>
				</div>
			</div>
		</div>
	);
}
