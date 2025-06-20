// components/ColumnsView.jsx
import { useState } from 'react';
import { Pencil, Trash2, Plus, Send, X, Delete, Check, CheckIcon } from 'lucide-react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Dialog from '@/components/molecules/Dialog';

export function AddColumn({placeholder ,  setBoards, boards, setSelectedBoardId, cn, selectedBoardId, setColumns, columns }) {
    const [showInput, setShowInput] = useState(false);
    const [loading, setloading] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState('');

    const handleAddColumn = async () => {
        if (!newColumnTitle.trim()) return;
        await addColumn(newColumnTitle.trim());
        setNewColumnTitle('');
        setShowInput(false);
    };

    const addColumn = async () => {
        if (!newColumnTitle.trim()) return;
        setloading(true);
        const res = await fetch(`/api/boards/${selectedBoardId}/columns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newColumnTitle }),
        });
        const newColumn = await res.json();
        setNewColumnTitle('');
        const index = boards?.findIndex(e => e._id === newColumn._id);

        if (index !== -1) {
            const updatedBoards = [...boards];
            updatedBoards[index] = {
                ...updatedBoards[index],
                columns: newColumn.columns,
            };
            setColumns(newColumn.columns);
            setBoards(updatedBoards);
        }
        setloading(false);
    };

    return showInput ? (
        <div className={` ${cn} flex items-center  gap-[10px]  `}>
            <Input cn='h-[35px] text-sm' value={newColumnTitle} onChange={setNewColumnTitle} onEnter={handleAddColumn} placeholder='Enter list title...' autoFocus />
            <div className='flex  items-center gap-2'>
                <Button cn='w-[30px] !h-[35px] ' onClick={handleAddColumn} loading={loading} color='green' Icon={<Send />} />
                <Button
                    cn='w-[30px] !h-[35px] '
                    onClick={() => {
                        setNewColumnTitle('');
                        setShowInput(false);
                    }}
                    color='red'
                    Icon={<X />}
                />
            </div>
        </div>
    ) : (
        <button onClick={() => setShowInput(true)} className={`${cn} flex items-center gap-[10px]  `}>
            <Plus size={16} /> {placeholder || "Add another list"}
        </button>
    );
}

export function DeleteColumn({ id, setColumns, selectedBoardId }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const res = await fetch(`/api/boards/${selectedBoardId}/columns/${id}`, {
            method: 'DELETE',
        });
        const result = await res.json();
        setColumns(result?.columns?.filter(e => e._id != id));
        setOpen(false);
        setLoading(false);
    };

    return (
        <>
            <Trash2 size={16} onClick={() => setOpen(true)} className='hover:scale-110 duration-300 cursor-pointer text-red-400' />

            <Dialog title='Delete column' open={open} onClose={() => setOpen(false)}>
                <h2 className='text-lg font-semibold mb-4'>Are you sure you want to delete this column?</h2>
                <div className='flex justify-end gap-2'>
                    <Button onClick={handleDelete} loading={loading} label='Delete' color='red' />
                    <Button onClick={() => setOpen(false)} label='Cancel' color='gray' />
                </div>
            </Dialog>
        </>
    );
}

export function EditColumn({ id, title, setColumns, selectedBoardId }) {
    const [editingColumnId, setEditingColumnId] = useState(null);
    const [newColumnTitle, setNewColumnTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async columnId => {
        if (!newColumnTitle.trim()) return;
        setLoading(true);
        const res = await fetch(`/api/boards/${selectedBoardId}/columns/${columnId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newColumnTitle }),
        });
        const result = await res.json();
        setColumns(result.columns);
        setEditingColumnId(null);
        setNewColumnTitle('');
        setLoading(false);
    };

    return (
        <div className='flex min-h-[34px] justify-between w-full items-center '>
            {editingColumnId === id ? (
                <Input cn='h-[30px]  text-sm' value={newColumnTitle} onChange={setNewColumnTitle} onEnter={() => handleUpdate(id)} autoFocus />
            ) : (
                <h2
                    className=' w-fit  text-sm font-semibold cursor-pointer'
                    onDoubleClick={() => {
                        setEditingColumnId(id);
                        setNewColumnTitle(title);
                    }}>
                    {title}
                </h2>
            )}
            <div className='flex items-center gap-1 mx-[5px] '>
                {editingColumnId === id ? (
                    <>
                        <Button cn='w-[25px] h-[25px] !p-[5px] ' onClick={() => handleUpdate(id)} color='green' loading={loading} Icon={<Check className=' ' size={20} />} />
                        <Button
                            cn='w-[25px] h-[25px] !p-[5px] flex-none max-w-full '
                            onClick={() => {
                                setEditingColumnId(null);
                                setNewColumnTitle('');
                            }}
                            color='red'
                            Icon={<X size={20} />}
                        />
                    </>
                ) : (
                    <div>
                        <Pencil
                            size={16}
                            onClick={() => {
                                setEditingColumnId(id);
                                setNewColumnTitle(title);
                            }}
                            className=' hover:scale-110 duration-300  cursor-pointer'
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
