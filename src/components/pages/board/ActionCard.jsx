// components/AddCard.jsx
import { useState } from 'react';
import { Check, Pencil, Plus, Send, Trash2, X } from 'lucide-react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Dialog from '@/components/molecules/Dialog';

export function AddCard({ cn, columnId, selectedBoardId, setColumns }) {
    const [showInput, setShowInput] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddCard = async () => {
        if (!newCardTitle.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/boards/${selectedBoardId}/columns/${columnId}/cards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newCardTitle.trim() }),
            });
            const updated = await res.json();
            setColumns(updated?.columns);
            setNewCardTitle('');
            setShowInput(false);
        } catch (error) {
            console.error('Failed to add card:', error);
        }
        setLoading(false);
    };

    return showInput ? (
        <div className={`${cn} flex items-center gap-[10px]`}>
            <Input value={newCardTitle} onChange={setNewCardTitle} onEnter={handleAddCard} placeholder='Enter card title...' autoFocus cn='h-[35px] text-sm' />
            <div className='flex items-center gap-2'>
                <Button cn='w-[25px] !h-[25px] !px-1 ' onClick={handleAddCard} loading={loading} color='green' Icon={<Check />} />
                <Button
                    cn='w-[25px] !h-[25px] !px-1'
                    onClick={() => {
                        setNewCardTitle('');
                        setShowInput(false);
                    }}
                    color='red'
                    Icon={<X />}
                />
            </div>
        </div>
    ) : (
        <button onClick={() => setShowInput(true)} className={`${cn} w-full duration-300 h-[40px] hover:bg-bg-2-hover flex items-center gap-[10px] text-sm text-gray-300`}>
            <Plus size={16} /> Add a card
        </button>
    );
}

export function EditCard({ card, selectedBoardId, column, setColumns }) {
    const [editingCardId, setEditingCardId] = useState(null);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateCard = async () => {
        if (!newCardTitle.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/boards/${selectedBoardId}/columns/${column._id}/cards/${card._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newCardTitle.trim() }),
            });
            const updated = await res.json();
			console.log(updated)
            setColumns?.(updated?.columns); 
            setEditingCardId(null);
        } catch (error) {
            console.error('Failed to update card:', error);
        }
        setLoading(false);
    };

    return (
        <div className='flex items-center justify-between w-full'>
            {editingCardId === card._id ? (
                <div className='flex items-center gap-1 mr-1 w-full'>
                    <Input
                        value={newCardTitle}
                        onChange={setNewCardTitle}
                        onEnter={handleUpdateCard}
						cn='w-full flex-1 h-[25px] text-xs !py-0 '
                        autoFocus
                    />
                    <Button
                        cn='!w-[25px] !h-[25px] !px-1'
                        onClick={handleUpdateCard}
                        loading={loading}
                        color='blue'
                        Icon={<Check size={14} />}
                    />
                    <Button
                        cn='!w-[25px] !h-[25px] !px-1'
                        onClick={() => setEditingCardId(null)}
                        color='red'
                        Icon={<X size={14} />}
                    />
                </div>
            ) : (
                <div className='flex items-center justify-between w-full'>
                    <span
                        className='flex-1 cursor-text'
                        onDoubleClick={() => {
                            setEditingCardId(card._id);
                            setNewCardTitle(card.title);
                        }}
                    >
                        {card.title}
                    </span>
                    <Pencil
                        size={14}
                        onClick={() => {
                            setEditingCardId(card._id);
                            setNewCardTitle(card.title);
                        }}
                        className='cursor-pointer mx-1'
                    />
                </div>
            )}
        </div>
    );
}
export function DeleteCard({ card, selectedBoardId, column, setColumns }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/boards/${selectedBoardId}/columns/${column._id}/cards/${card._id}`, {
                method: 'DELETE',
            });
            const updated = await res.json();
            setColumns(updated?.columns); // تحديث الأعمدة بالكامل بعد الحذف
            setOpen(false);
        } catch (error) {
            console.error('Failed to delete card:', error);
        }
        setLoading(false);
    };

    return (
        <>
            <Trash2
                size={16}
                onClick={() => setOpen(true)}
                className='hover:scale-110 duration-300 cursor-pointer text-red-400'
            />

            <Dialog title='Delete card' open={open} onClose={() => setOpen(false)}>
                <h2 className='text-lg font-semibold mb-4'>Are you sure you want to delete this card?</h2>
                <div className='flex justify-end gap-2'>
                    <Button onClick={handleDelete} loading={loading} label='Delete' color='red' />
                    <Button onClick={() => setOpen(false)} label='Cancel' color='gray' />
                </div>
            </Dialog>
        </>
    );
}
