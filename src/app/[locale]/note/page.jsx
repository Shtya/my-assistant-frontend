/* 

  show the name of the card by default form the first text on the card and when he click on it 
  conver to input can change it 



  and also insdie the text Editor make button to add checklsit but dont' insde the reachtext maek it out side but when click on it show something to add the check list adn inject it insdie the reachtext and when he clck on it insdie the reachtext and change on it and add it again to hte reachtext

*/

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextEditor from '@/components/atoms/TextEditor';
import SelectorWithAdd from '@/components/atoms/SelectorWithAdd';
import Dialog from '@/components/molecules/Dialog';
import { Pencil, Trash2 } from 'lucide-react';

export default function NotesPage() {
    const [editingTitleId, setEditingTitleId] = useState(null);
    const [categories, setCategories] = useState(['All', 'Work', 'Personal', 'Ideas']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [notes, setNotes] = useState([
        { id: 1, category: 'Work', content: '<p>Finish the project report</p>' },
        { id: 2, category: 'Personal', content: '<p>Buy groceries</p>' },
        { id: 3, category: 'Ideas', content: '<p>Start a blog about tech</p>' },
    ]);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [editorContent, setEditorContent] = useState('');
    const [todayDate, setTodayDate] = useState(new Date());

    

    const extractTitle = html => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const text = temp.textContent || temp.innerText || '';
        return text.split('\n')[0].slice(0, 50); // First line, max 50 chars
    };

    const newNote = {
        id: Date.now(),
        category: selectedCategory === 'All' ? 'Uncategorized' : selectedCategory,
        content: editorContent,
        title: extractTitle(editorContent),
    };

    useEffect(() => {
        setTodayDate(new Date());
    }, []);

    const formatDate = date => {
        const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
        const dayNum = date.getDate();
        const monthName = date.toLocaleDateString(undefined, { month: 'long' });
        const year = date.getFullYear();
        const getSuffix = n => {
            if (n > 3 && n < 21) return 'th';
            switch (n % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        };
        return `${dayName} ${dayNum}${getSuffix(dayNum)} ${monthName} ${year}`;
    };

    const filteredNotes = selectedCategory === 'All' ? notes : notes.filter(note => note.category === selectedCategory);

    const handleAddNote = () => {
        setEditingNote(null);
        setEditorContent('');
        setShowAddEditModal(true);
    };

    const handleEditNote = note => {
        setEditingNote(note);
        setEditorContent(note.content);
        setShowAddEditModal(true);
    };

    const handleSaveNote = () => {
        if (!editorContent.trim()) {
            alert('Note content cannot be empty');
            return;
        }
        if (editingNote) {
            setNotes(notes.map(n => (n.id === editingNote.id ? { ...n, content: editorContent, category: editingNote.category } : n)));
        } else {
            const newNote = {
                id: Date.now(),
                category: selectedCategory === 'All' ? 'Uncategorized' : selectedCategory,
                content: editorContent,
            };
            setNotes([newNote, ...notes]);
            if (selectedCategory === 'All' && !categories.includes('Uncategorized')) {
                setCategories(['Uncategorized', ...categories]);
            }
        }
        setShowAddEditModal(false);
    };

    const handleDeleteNote = note => {
        setNoteToDelete(note);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setNotes(notes.filter(n => n.id !== noteToDelete.id));
        setNoteToDelete(null);
        setShowDeleteConfirm(false);
    };

    return (
        <main className='min-h-screen bg-gray-50 p-6'>
            <header className='flex justify-between items-center mb-6'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>{formatDate(todayDate)}</h1>
                    <p className='text-gray-500'>Your personal categorized notes</p>
                </div>
                <button onClick={handleAddNote} className='bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 text-3xl flex items-center justify-center shadow-lg' aria-label='Add Note'>
                    +
                </button>
            </header>
            <nav className='mb-6 flex space-x-3 overflow-x-auto'>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full font-semibold transition ${selectedCategory === cat ? 'bg-blue-600 text-white shadow' : 'bg-white border border-gray-300 hover:bg-gray-200'}`}>
                        {cat}
                    </button>
                ))}
            </nav>

            <section className='note-container grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <AnimatePresence>
                    {filteredNotes.length === 0 ? (
                        <motion.div key='no-notes' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='col-span-full text-center text-gray-400 italic mt-12'>
                            No notes found for this category.
                        </motion.div>
                    ) : (
                        filteredNotes.map((note, i) => (
                            <motion.div key={note.id} layout initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.05 } }} exit={{ opacity: 0, scale: 0.9, y: -20 }} className='bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col justify-between group cursor-pointer relative' onClick={() => handleEditNote(note)}>
                                <div onClick={e => e.stopPropagation()} className='mb-2'>
                                    {editingTitleId === note.id ? (
                                        <input
                                            type='text'
                                            className='text-lg font-semibold w-full border rounded px-2 py-1 mb-1'
                                            value={note.title || extractTitle(note.content)}
                                            onChange={e => setNotes(prev => prev.map(n => (n.id === note.id ? { ...n, title: e.target.value } : n)))}
                                            onBlur={() => setEditingTitleId(null)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') setEditingTitleId(null);
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        <h3
                                            className='text-lg font-semibold text-gray-800 cursor-text hover:underline'
                                            onClick={e => {
                                                e.stopPropagation(); // prevent opening the card
                                                setEditingTitleId(note.id);
                                            }}>
                                            {note.title || extractTitle(note.content)}
                                        </h3>
                                    )}
                                </div>

                                <div
                                    className='absolute top-4 right-2 flex space-x-2 transition-opacity'
                                    onClick={e => e.stopPropagation()} // Prevent card click
                                >
                                    {/* <button onClick={() => handleEditNote(note)} className='text-gray-600 hover:text-blue-600' title='Edit'>
                                        <Pencil size={18} />
                                    </button> */}
                                    <button onClick={() => handleDeleteNote(note)} className='text-gray-600 hover:text-red-600' title='Delete'>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </section>

            <Dialog width='900px' height='800px' title={editingNote ? 'Edit Note' : 'Add New Note'} open={showAddEditModal} onClose={() => setShowAddEditModal(false)}>
                <div className='flex flex-col space-y-4'>
                    <SelectorWithAdd
                        cn='max-w-md w-full'
                        categories={categories}
                        selected={editingNote ? editingNote.category : selectedCategory}
                        onChange={newCategory => {
                            if (editingNote) {
                                setEditingNote({ ...editingNote, category: newCategory });
                            } else {
                                setSelectedCategory(newCategory);
                            }
                        }}
                    />

                    {/* TODO: Checklist inject button */}
                    <div className='flex justify-end'>
                        <button onClick={() => setEditorContent(prev => prev + '<div class="checklist-item"><input type="checkbox" /> <span>Checklist item</span></div>')} className='text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded'>
                            ➕ Add Checklist Item
                        </button>
                    </div>

                    <TextEditor value={editorContent} onChange={setEditorContent} />

                    <div className='flex justify-end space-x-4 pt-4'>
                        <button onClick={() => setShowAddEditModal(false)} className='px-4 py-2 border rounded hover:bg-gray-100'>
                            Cancel
                        </button>
                        <button onClick={handleSaveNote} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
                            Save
                        </button>
                    </div>
                </div>
            </Dialog>
            <Dialog width='500px' height='auto' title='Delete Note' open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                <p>Are you sure you want to delete this note?</p>
                <div className='flex justify-end space-x-4 pt-4'>
                    <button onClick={() => setShowDeleteConfirm(false)} className='px-4 py-2 border rounded hover:bg-gray-100'>
                        Cancel
                    </button>
                    <button onClick={confirmDelete} className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>
                        Delete
                    </button>
                </div>
            </Dialog>
        </main>
    );
}
