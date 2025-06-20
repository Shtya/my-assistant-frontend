import { CircuitBoard, FolderKanban, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Dialog from '@/components/molecules/Dialog';
import Button from '@/components/atoms/Button';

export default function ShowBoards({ boards, setBoards, setColumns, setSelectedBoardId, selectedBoardId }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = board => {
    setColumns(board.columns);
    setSelectedBoardId(board._id);
    setShowDropdown(false);
  };

  const confirmDelete = board => {
    setDeleteTarget(board);
  };

  const closeDialog = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/boards/${deleteTarget._id}`, { method: 'DELETE' });
      const updated = await res.json();

      setBoards(prev => prev.filter(b => b._id !== deleteTarget._id));

      if (selectedBoardId === deleteTarget._id) {
        setColumns([]);
        setSelectedBoardId(null);
      }

      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete board:', err);
    }
    setLoading(false);
  };

  const selectedBoard = boards.find(b => b._id === selectedBoardId);

  return (
    <div className='relative flex items-center gap-[10px]'>
      <div className=' text-text-base font-medium capitalize text-base '>Boards</div>

      {/* Dropdown container on click instead of hover */}
      <div className='relative'>
        <button
          onClick={() => setShowDropdown(prev => !prev)}
          className='bg-background-soft text-text-base border border-border/50 px-2 py-2 rounded w-[150px] flex justify-between items-center'
        >
          <span className='truncate w-full text-left text-sm'>
            {selectedBoard?.title || 'Select Board'}
          </span>
          <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        <div
          className={`absolute left-0 top-full mt-1 w-48 border border-border rounded shadow-md overflow-auto transition-all duration-300 z-10 
            ${showDropdown ? 'max-h-[181px] opacity-100 bg-background-soft' : 'max-h-0 opacity-0 bg-background-soft'}`}
        >
          {boards
            ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(board => (
              <div
                key={board._id}
                onClick={() => handleSelect(board)}
                className={`cursor-pointer px-2 py-2 text-sm text-text-base hover:bg-background-muted hover:pl-[15px] duration-300 
                  ${board._id === selectedBoardId ? 'bg-background-subtle font-semibold' : ''} flex items-center justify-between`}
              >
                <div className='flex items-center gap-2'>
                  {/* <img src='/clipboard.png' className='w-[20px]' alt='board icon' /> */}
                  <CircuitBoard size={20} className="text-text-base" />
                  <span className='truncate'>{board.title}</span>
                </div>
                <Trash2
                  size={14}
                  className='text-red-400 hover:scale-110 duration-200 cursor-pointer'
                  onClick={e => {
                    e.stopPropagation();
                    confirmDelete(board);
                  }}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Dialog for deleting board */}
      <Dialog title='Delete board' open={!!deleteTarget} onClose={closeDialog}>
        <h2 className='text-lg font-semibold mb-4'>
          Are you sure you want to delete <strong>{deleteTarget?.title}</strong>?
        </h2>
        <div className='flex justify-end gap-2'>
          <Button onClick={handleDelete} loading={loading} label='Delete' color='red' />
          <Button onClick={closeDialog} label='Cancel' color='gray' />
        </div>
      </Dialog>
    </div>
  );
}
