'use client';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star, Plus, X, Save, Upload, Download, ChevronDown, ChevronUp, Check, Filter } from 'lucide-react';
import Input2 from '@/components/atoms/Input2';
import Button from '@/components/atoms/Button';
import SelectDefault from '@/components/atoms/SelectDefault';
import TextEditor from '@/components/atoms/TextEditor';
import qs_progrmming from '@/data/qs-progrmming';
import Tabs from '@/components/atoms/Tabs';

const KnowledgeBase = () => {
    const t = useTranslations('KnowledgeBase');
    const [activeTab, setActiveTab] = useState('All');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        id: '',
        category: 'JavaScript',
        question: '',
        answer: '',
        tags: [],
        dateAdded: new Date().toISOString().split('T')[0],
        recap: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [importData, setImportData] = useState('');
    const [activeTagsFilter, setActiveTagsFilter] = useState([]);
    const [readStatusFilter, setReadStatusFilter] = useState('all');
    const [readCards, setReadCards] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        question: '',
        answer: '',
        recap: '',
        tags: [],
        category: '',
    });

    // Load questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/api/questions');
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data);
                } else {
                    setQuestions(qs_progrmming);
                }
            } catch (error) {
                console.error('Failed to fetch questions:', error);
                setQuestions(qs_progrmming);
            }
        };
        fetchQuestions();
    }, []);

    // Load read cards from localStorage
    useEffect(() => {
        const savedReadCards = localStorage.getItem('knowledgeBaseReadCards');
        setReadCards(savedReadCards ? JSON.parse(savedReadCards) : []);
    }, []);

    // Save read cards to localStorage
    useEffect(() => {
        localStorage.setItem('knowledgeBaseReadCards', JSON.stringify(readCards));
    }, [readCards]);

    const categories = useMemo(() => {
        const foundCategories = [...new Set(questions.map(q => q.category))];
        return foundCategories.map(cat => {
            return { id: cat, name: cat, count: questions.filter(q => q.category === cat).length };
        });
    }, [questions]);

    const allTags = useMemo(() => {
        const tagSet = new Set();
        questions.forEach(q => {
            q.tags?.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet);
    }, [questions]);

    const tagsWithCount = useMemo(() => {
        return allTags.map(tag => {
            const count = questions.filter(q => q.tags?.includes(tag)).length;
            return { id: tag, name: tag, count };
        });
    }, [allTags, questions]);

    const defaultTags = [
        { id: 'Important', name: t('tags.important'), icon: '' },
        { id: 'Need Review', name: t('tags.needReview'), icon: '' },
    ];

    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewQuestion(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const addQuestion = async () => {
        if (!newQuestion.question || !newQuestion.answer) return;

        const questionToAdd = {
            ...newQuestion,
            id: `q-${Date.now()}`,
            answer: editorContent || newQuestion.answer,
        };

        try {
            const response = await fetch('/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'add',
                    question: questionToAdd,
                }),
            });

            if (response.ok) {
                setQuestions(prev => [...prev, questionToAdd]);
                setNewQuestion({
                    id: '',
                    category: 'JavaScript',
                    question: '',
                    answer: '',
                    tags: [],
                    dateAdded: new Date().toISOString().split('T')[0],
                    recap: '',
                });
                setEditorContent('');
                setIsAdding(false);
            }
        } catch (error) {
            console.error('Failed to add question:', error);
        }
    };

    const deleteQuestion = async id => {
        try {
            const response = await fetch('/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'delete',
                    id,
                }),
            });

            if (response.ok) {
                setQuestions(prev => prev.filter(q => q.id !== id));
                setReadCards(prev => prev.filter(cardId => cardId !== id));
            }
        } catch (error) {
            console.error('Failed to delete question:', error);
        }
    };

    const toggleQuestion = id => {
        const newExpanded = { [id]: !expandedQuestions[id] };
        setExpandedQuestions(newExpanded);

        if (!expandedQuestions[id] && !readCards.includes(id)) {
            setReadCards(prev => [...prev, id]);
        }
    };

    const toggleReadStatus = (id, e) => {
        e.stopPropagation();
        setReadCards(prev => (prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]));
    };

    const toggleTagFilter = tag => {
        setActiveTagsFilter(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    };

    const startEditing = question => {
        setEditingId(question.id);
        setEditFormData({
            question: question.question,
            answer: question.answer,
            recap: question.recap || '',
            tags: [...question.tags] || [],
            category: question.category,
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    const saveEdit = async id => {
        try {
            const response = await fetch('/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'edit',
                    question: {
                        ...editFormData,
                        id,
                        dateAdded: new Date().toISOString().split('T')[0],
                    },
                }),
            });

            if (response.ok) {
                setQuestions(prev =>
                    prev.map(q =>
                        q.id === id
                            ? {
                                  ...q,
                                  ...editFormData,
                                  dateAdded: new Date().toISOString().split('T')[0],
                              }
                            : q,
                    ),
                );
                setEditingId(null);
            }
        } catch (error) {
            console.error('Failed to save edit:', error);
        }
    };

    const handleEditChange = e => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || q.answer.toLowerCase().includes(searchTerm.toLowerCase()) || (q.recap && q.recap.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = activeTab === 'All' || q.category === activeTab;

            const matchesTags = activeTagsFilter.length === 0 || activeTagsFilter.every(tag => q.tags?.includes(tag));

            const matchesReadStatus = readStatusFilter === 'all' || (readStatusFilter === 'read' && readCards.includes(q.id)) || (readStatusFilter === 'unread' && !readCards.includes(q.id));

            return matchesSearch && matchesCategory && matchesTags && matchesReadStatus;
        });
    }, [questions, searchTerm, activeTab, activeTagsFilter, readStatusFilter, readCards]);

    const exportData = () => {
        const dataStr = JSON.stringify(questions, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `knowledge-base-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleImportData = async () => {
        try {
            const parsedData = JSON.parse(importData);
            if (Array.isArray(parsedData)) {
                const response = await fetch('/api/questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parsedData),
                });

                if (response.ok) {
                    setQuestions(parsedData);
                    setImportData('');
                    alert(t('alerts.importSuccess'));
                }
            } else {
                alert(t('alerts.invalidFormat'));
            }
        } catch (e) {
            alert(`${t('alerts.importError')}: ${e.message}`);
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
        },
    };

    const tagVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className={`min-h-screen text-text-base transition-colors duration-200`}>
            <div className='px-4 !py-12'>
                {/* Controls */}
                <div className='flex flex-wrap justify-between items-center mb-6 gap-4'>
                    <div className='flex gap-2'>
                        <h1 className='text-3xl font-bold'>{t('title')}</h1>
                    </div>

                    <div className='flex gap-2'>
                        <Button onClick={() => setIsAdding(!isAdding)} label={isAdding ? t('actions.cancel') : t('actions.addQuestion')} icon={isAdding ? <X size={16} /> : <Plus size={16} />} color={isAdding ? 'red' : 'primary'} cn='!h-[40px] !px-[12px]' />
                        <Button onClick={exportData} label={t('actions.export')} icon={<Download size={16} />} color='success' cn='!h-[40px] !px-[12px]' />
                        <Button onClick={() => setImportData(importData ? '' : '[]')} label={t('actions.import')} icon={<Upload size={16} />} color='secondary' cn='!h-[40px] !px-[12px]' />
                    </div>
                </div>

                {/* Import Data Input */}
                {importData !== '' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className='mb-4 overflow-hidden'>
                        <Input2 type='textarea' value={importData} onChange={e => setImportData(e.target.value)} placeholder={t('placeholders.importData')} rows={5} cn='w-full' />
                        <div className='flex justify-end mt-2 gap-2'>
                            <Button onClick={() => setImportData('')} label={t('actions.cancel')} color='gray' cn='!h-[40px] !px-[12px]' />
                            <Button onClick={handleImportData} label={t('actions.confirmImport')} color='blue' cn='!h-[40px] !px-[12px]' />
                        </div>
                    </motion.div>
                )}

                {/* Add Question Form */}
                <div className='card2'>
                    <AnimatePresence>
                        {isAdding && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className='mb-8 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 overflow-hidden'>
                                <h2 className='text-xl font-semibold mb-4'>{t('addQuestion.title')}</h2>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                    <div>
                                        <label className='block mb-2 font-medium'>{t('addQuestion.questionLabel')}</label>
                                        <Input2 type='text' name='question' value={newQuestion.question} onChange={handleInputChange} placeholder={t('addQuestion.questionPlaceholder')} cn='w-full' />
                                    </div>

                                    <div>
                                        <label className='block mb-2 font-medium'>{t('addQuestion.categoryLabel')}</label>
                                        <SelectDefault
                                            value={newQuestion.category}
                                            onChange={value => setNewQuestion(prev => ({ ...prev, category: value }))}
                                            options={categories.map(cat => ({
                                                value: cat.id,
                                                label: (
                                                    <div className='flex items-center'>
                                                        {cat.name} ({cat.count})
                                                    </div>
                                                ),
                                            }))}
                                        />
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <label className='block mb-2 font-medium'>{t('addQuestion.answerLabel')}</label>
                                    <TextEditor value={editorContent} onChange={setEditorContent} />
                                </div>

                                <div className='mb-4'>
                                    <label className='block mb-2 font-medium'>{t('addQuestion.recapLabel')}</label>
                                    <Input2 type='textarea' name='recap' value={newQuestion.recap} onChange={handleInputChange} placeholder={t('addQuestion.recapPlaceholder')} rows={3} cn='w-full' />
                                </div>

                                <div className='flex justify-end'>
                                    <Button onClick={addQuestion} label={t('addQuestion.saveButton')} icon={<Save size={16} />} color='green' disabled={!newQuestion.question || (!editorContent && !newQuestion.answer)} cn='!h-[40px] !px-[12px]' />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Search and Filters */}
                    <div className='mb-6'>
                        <div className='flex flex-col md:flex-row gap-4 mb-4'>
                            <div className='relative flex-grow'>
                                <Input2 type='text' placeholder={t('search.placeholder')} value={searchTerm} onChange={e => setSearchTerm(e)} cn='w-full pl-10' />
                            </div>

                            <div className='flex gap-2'>
                                <SelectDefault
                                    value={readStatusFilter}
                                    onChange={setReadStatusFilter}
                                    options={[
                                        { value: 'all', label: t('filters.all') },
                                        { value: 'read', label: t('filters.read') },
                                        { value: 'unread', label: t('filters.unread') },
                                    ]}
                                    cn='min-w-[120px]'
                                />

                                <div className='relative group'>
                                    <Button label={t('filters.tags')} icon={<Filter size={16} />} color={activeTagsFilter.length > 0 ? 'primary' : 'gray'} cn='!h-[40px] !px-[12px]' />
                                    <div className='absolute right-0 mt-1 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-10 hidden group-hover:block'>
                                        <div className='max-h-60 overflow-y-auto'>
                                            {tagsWithCount.map(tag => (
                                                <div key={tag.id} className={`flex items-center justify-between p-2 rounded cursor-pointer ${activeTagsFilter.includes(tag.id) ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`} onClick={() => toggleTagFilter(tag.id)}>
                                                    <span>{tag.name}</span>
                                                    <span className='text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full'>{tag.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {activeTagsFilter.length > 0 && (
                                            <div className='text-sm text-blue-600 dark:text-blue-400 mt-2 p-2 cursor-pointer hover:underline' onClick={() => setActiveTagsFilter([])}>
                                                {t('filters.clearFilters')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active filters display */}
                        <AnimatePresence>
                            {(activeTagsFilter.length > 0 || readStatusFilter !== 'all') && (
                                <motion.div initial='hidden' animate='visible' exit='hidden' variants={filterVariants} className='flex flex-wrap gap-2 mb-4'>
                                    {activeTagsFilter.map(tag => (
                                        <motion.div key={tag} variants={tagVariants} className='flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm cursor-pointer' onClick={() => toggleTagFilter(tag)}>
                                            {tag}
                                            <X size={14} className='ml-1' />
                                        </motion.div>
                                    ))}
                                    {readStatusFilter !== 'all' && (
                                        <motion.div variants={tagVariants} className='flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm cursor-pointer' onClick={() => setReadStatusFilter('all')}>
                                            {readStatusFilter === 'read' ? t('filters.read') : t('filters.unread')}
                                            <X size={14} className='ml-1' />
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Tabs
                            tabs={[
                                {
                                    id: 'All',
                                    name: `${t('categories.all')} (${questions.length})`,
                                },
                                ...categories.map(cat => ({
                                    id: cat.id,
                                    name: `${cat.name} (${cat.count})`,
                                })),
                            ]}
                            width='1300px'
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>

                    {/* Questions List */}
                    <div className='space-y-4'>
                        {filteredQuestions.length === 0 ? (
                            <div className='text-center py-8 text-gray-500 dark:text-gray-400'>{activeTab !== 'All' ? t('emptyState.filtered', { category: activeTab }) : t('emptyState.default')}</div>
                        ) : (
                            <AnimatePresence>
                                {filteredQuestions.map(q => (
                                    <div key={q.id} className={`rounded-lg shadow-md overflow-hidden transition-all duration-200 border-l-4 ${readCards.includes(q.id) ? 'border-green-500' : 'border-transparent'} ${expandedQuestions[q.id] ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800 hover:shadow-lg'}`}>
                                        {editingId === q.id ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                                    <div>
                                                        <label className='block mb-2 font-medium'>Question</label>
                                                        <Input2 type='text' name='question' value={editFormData.question} onChange={handleEditChange} cn='w-full' />
                                                    </div>
                                                    <div>
                                                        <label className='block mb-2 font-medium'>Category</label>
                                                        <SelectDefault
                                                            value={editFormData.category}
                                                            onChange={value => setEditFormData(prev => ({ ...prev, category: value }))}
                                                            options={categories.map(cat => ({
                                                                value: cat.id,
                                                                label: cat.name,
                                                            }))}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='mb-4'>
                                                    <label className='block mb-2 font-medium'>Answer</label>
                                                    <TextEditor value={editFormData.answer} onChange={content => setEditFormData(prev => ({ ...prev, answer: content }))} />
                                                </div>

                                                <div className='mb-4'>
                                                    <label className='block mb-2 font-medium'>Recap</label>
                                                    <Input2 type='textarea' name='recap' value={editFormData.recap} onChange={handleEditChange} rows={3} cn='w-full' />
                                                </div>

                                                <div className='flex justify-end gap-2'>
                                                    <Button onClick={cancelEditing} label={t('actions.cancel')} color='gray' cn='!h-[40px] !px-[12px]' />
                                                    <Button onClick={() => saveEdit(q.id)} label={t('actions.save')} color='green' cn='!h-[40px] !px-[12px]' />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <>
                                                <div className='p-4 cursor-pointer flex justify-between items-start' onClick={() => toggleQuestion(q.id)}>
                                                    <div className='flex items-start gap-3 w-full'>
                                                        <div className={`mt-1 flex-shrink-0 w-5 h-5 border rounded flex items-center justify-center ${readCards.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`} onClick={e => toggleReadStatus(q.id, e)}>
                                                            {readCards.includes(q.id) && <Check size={14} />}
                                                        </div>

                                                        <div className='flex-grow'>
                                                            <h3 className='font-medium flex items-center'>
                                                                {q.tags?.includes('Important') && <Star className='mr-2 text-yellow-500' size={16} />}
                                                                {q.question}
                                                            </h3>
                                                            <div className='flex flex-wrap gap-2 mt-1'>
                                                                <span className='text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full'>{categories.find(c => c.id === q.category)?.name || q.category}</span>
                                                                {q.tags?.map(tag => (
                                                                    <span key={tag} className='text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center'>
                                                                        {defaultTags.find(t => t.id === tag)?.icon}
                                                                        {defaultTags.find(t => t.id === tag)?.name || tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex-shrink-0 ml-2 flex gap-2'>{expandedQuestions[q.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                                                </div>

                                                {expandedQuestions[q.id] && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className='px-4 pb-4 pt-0 border-t dark:border-gray-700 overflow-hidden'>
                                                        <div
                                                            onDoubleClick={e => {
                                                                e.stopPropagation();
                                                                startEditing(q);
                                                            }}
                                                            className='prose dark:prose-invert max-w-none p-4 bg-gray-100 dark:bg-gray-700 rounded-md'
                                                            dangerouslySetInnerHTML={{ __html: q.answer }}
                                                        />

                                                        {q.recap && (
                                                            <div className='mt-4'>
                                                                <div className='flex items-center justify-between mb-2'>
                                                                    <h4 className='font-medium'>{t('recap.title')}</h4>
                                                                </div>
                                                                <div className='p-4 bg-yellow-50 dark:bg-yellow-900 rounded-md'>{q.recap}</div>
                                                            </div>
                                                        )}

                                                        <div className='flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400'>
                                                            <span>{t('question.addedOn', { date: q.dateAdded })}</span>
                                                            <div className='flex gap-2'>
                                                                <Button
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        startEditing(q);
                                                                    }}
                                                                    label={t('actions.edit')}
                                                                    color='blue'
                                                                    variant='text'
                                                                    cn='!h-[30px] !px-[8px]'
                                                                />
                                                                <Button
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        deleteQuestion(q.id);
                                                                    }}
                                                                    label={t('actions.delete')}
                                                                    color='red'
                                                                    variant='text'
                                                                    cn='!h-[30px] !px-[8px]'
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBase;
