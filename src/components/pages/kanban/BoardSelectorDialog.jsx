import Dialog from '@/components/molecules/Dialog';
import Modal2 from '@/components/molecules/Modal2';
import React, { useState } from 'react';

const BoardSelectorDialog = ({ userBoards, currentBoardId, activeModal, setActiveModal, setCurrentBoardId, onCreateBoardClick }) => {
  const closeModal = () => setActiveModal(null);

  const visibilityStyles = {
    public: 'bg-blue-100 text-blue-800',
    team: 'bg-green-100 text-green-800',
    private: 'bg-gray-100 text-gray-800',
  };

  return (
    <Modal2 title={<h2 className='text-xl font-bold text-gray-800'>Your Boards</h2>} width='400px' open={activeModal === 'board-selector'  } onClose={closeModal} cn='bg-white rounded-xl shadow-lg p-4'>
      {/* قائمة اللوحات */}
      {userBoards.length > 0 ? (
        <div className=' ltr:pr-2 rtl:pl-2 space-y-2 mb-4 max-h-80 overflow-y-auto'>
          {userBoards.map(board => {
            const isActive = currentBoardId === board.id;
            const isMember = board?.members?.length > 1;

            return (
              <div
                key={board.id}
                className={`p-3 border rounded-lg cursor-pointer transition hover:bg-gray-50 ${isActive ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
                onClick={() => {
                  setCurrentBoardId(board.id);
                  closeModal();
                }}>
                <div className='flex justify-between items-center mb-1'>
                  <h3 className='font-semibold text-gray-700 truncate'>{board.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${visibilityStyles[board.visibility] || 'bg-gray-100 text-gray-800'}`}>{board.visibility}</span>
                </div>
                <p className='text-sm text-gray-500 flex items-center gap-2'>
                  {isMember ? `${board.members.length} members` : <span className='text-xs italic opacity-70'>No members yet •</span>}
                  <span>
                    <span className='text-xs text-primary font-medium'>({board.lists.length})</span> lists
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='text-center text-gray-500 py-10'>
          <p>No boards found.</p>
        </div>
      )}

      {/* زر إنشاء لوحة جديدة */}
      <button className='w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition' onClick={onCreateBoardClick}>
        Create New Board
      </button>
    </Modal2>
  );
};

export default BoardSelectorDialog;
