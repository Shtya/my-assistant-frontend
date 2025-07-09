'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TextEditor from '@/components/atoms/TextEditor';
import { Check, ChevronDown, Edit, Import, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FiEye, FiEyeOff, FiList, FiTarget } from 'react-icons/fi';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, y: -20 },
};

const expandVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: { height: 0, opacity: 0 },
};

export default function TechnicalCMS() {
  const t = useTranslations('TechnicalCMS');
  const router = useRouter();

  // State for UI
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeTab') || 'faq';
    }
    return 'faq';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    difficulty: '',
    readStatus: '',
  });

  // State for data
  const [faqs, setFaqs] = useState([]);
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form states
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: '',
    isRead: false,
  });
  const [problemForm, setProblemForm] = useState({
    title: '',
    solution: '',
    difficulty: 'easy',
    category: '',
    isRead: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // UI states
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const [expandedProblemId, setExpandedProblemId] = useState(null);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [showProblemForm, setShowProblemForm] = useState(false);
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // Save active tab to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [faqRes, problemRes] = await Promise.all([fetch('/api/faqs'), fetch('/api/problems')]);

        const faqData = await faqRes.json();
        const problemData = await problemRes.json();

        setFaqs(faqData);
        setProblems(problemData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let relevantItems = activeTab === 'faq' ? faqs : problems;
    const categoryList = [...new Set(relevantItems.map(item => item.category).filter(Boolean))];
    setCategories(categoryList);
  }, [activeTab, faqs, problems]);

  // Filtered data
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filter.category || faq.category === filter.category;
    const matchesReadStatus = filter.readStatus === '' || (filter.readStatus === 'read' && faq.isRead) || (filter.readStatus === 'unread' && !faq.isRead);
    return matchesSearch && matchesCategory && matchesReadStatus;
  });

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || problem.solution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filter.category || problem.category === filter.category;
    const matchesDifficulty = !filter.difficulty || problem.difficulty === filter.difficulty;
    const matchesReadStatus = filter.readStatus === '' || (filter.readStatus === 'read' && problem.isRead) || (filter.readStatus === 'unread' && !problem.isRead);
    return matchesSearch && matchesCategory && matchesDifficulty && matchesReadStatus;
  });

  // Form handlers
  const handleFaqSubmit = async e => {
    e.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/faqs?id=${currentId}` : '/api/faqs';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faqForm),
      });

      if (response.ok) {
        const result = await response.json();
        if (isEditing) {
          setFaqs(faqs.map(f => (f._id === currentId ? result : f)));
        } else {
          setFaqs([...faqs, result]);
        }
        resetFaqForm();
        setShowFaqForm(false);
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleProblemSubmit = async e => {
    e.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/problems?id=${currentId}` : '/api/problems';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problemForm),
      });

      if (response.ok) {
        const result = await response.json();
        if (isEditing) {
          setProblems(problems.map(p => (p._id === currentId ? result : p)));
        } else {
          setProblems([...problems, result]);
        }
        resetProblemForm();
        setShowProblemForm(false);
      }
    } catch (error) {
      console.error('Error saving problem:', error);
    }
  };

  const resetFaqForm = () => {
    setFaqForm({
      question: '',
      answer: '',
      category: '',
      isRead: false,
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const resetProblemForm = () => {
    setProblemForm({
      title: '',
      solution: '',
      difficulty: 'easy',
      category: '',
      isRead: false,
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const editFaq = faq => {
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      isRead: faq.isRead,
    });
    setIsEditing(true);
    setCurrentId(faq._id);
    setShowFaqForm(true);
  };

  const editProblem = problem => {
    setProblemForm({
      title: problem.title,
      solution: problem.solution,
      difficulty: problem.difficulty,
      category: problem.category,
      isRead: problem.isRead,
    });
    setIsEditing(true);
    setCurrentId(problem._id);
    setShowProblemForm(true);
  };

  const deleteItem = async (id, type) => {
    if (window.confirm(t('deleteConfirm'))) {
      try {
        const response = await fetch(`/api/${type}?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          if (type === 'faqs') {
            setFaqs(faqs.filter(f => f._id !== id));
          } else {
            setProblems(problems.filter(p => p._id !== id));
          }
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const toggleReadStatus = async (id, type, currentStatus) => {
    try {
      const response = await fetch(`/api/${type}?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: !currentStatus }),
      });

      if (response.ok) {
        if (type === 'faqs') {
          setFaqs(faqs.map(f => (f._id === id ? { ...f, isRead: !currentStatus } : f)));
        } else {
          setProblems(problems.map(p => (p._id === id ? { ...p, isRead: !currentStatus } : p)));
        }
      }
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const handleJsonImport = async type => {
    try {
      const data = JSON.parse(jsonInput);
      const response = await fetch(`/api/${type == 'faq' ? 'faqs' : type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (type === 'faq') {
          setFaqs([...faqs, ...result]);
        } else {
          setProblems([...problems, ...result]);
        }
        setShowJsonImport(false);
        setJsonInput('');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert(t('invalidJsonFormat'));
    }
  };

  // Form validation
  const isFaqFormValid = faqForm.question.trim() && faqForm.answer.trim() && faqForm.category.trim();
  const isProblemFormValid = problemForm.title.trim() && problemForm.solution.trim() && problemForm.category.trim();

  // Toggle expansion
  const toggleFaqExpansion = id => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const toggleProblemExpansion = id => {
    setExpandedProblemId(expandedProblemId === id ? null : id);
  };

  // تقوم بتحويل كود HTML يحتوي على كود برمجي داخل ``` إلى مكون
  function renderAnswerWithHighlighting(answer) {
    const parts = answer.split(/```([\s\S]*?)```/g); // تقسيم حسب الكود
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        // هذا كود
        return (
          <SyntaxHighlighter key={i} language='javascript' style={oneLight} customStyle={{ borderRadius: '0.5rem', fontSize: '0.85rem' }}>
            {part.trim()}
          </SyntaxHighlighter>
        );
      } else {
        // هذا نص عادي
        return <p key={i} dangerouslySetInnerHTML={{ __html: part }} />;
      }
    });
  }

  return (
    <div className=' text-gray-900 px-4 py-4'>
      <h1 className='text-3xl font-bold mb-8'>{t('title')}</h1>

      {/* Tabs */}
      <div className='flex border-b mb-6 justify-between '>
        <div className='flex items-center gap-2'>
          <button className={`py-2 px-4 font-medium ${activeTab === 'faq' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('faq')}>
            {t('faqTab')}
          </button>
          <button className={`py-2 px-4 font-medium ${activeTab === 'problems' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('problems')}>
            {t('problemsTab')}
          </button>
        </div>

        <div className='flex items-center gap-2'>
          {/* زر إضافة عنصر جديد */}
          <button onClick={() => (activeTab === 'faq' ? setShowFaqForm(true) : setShowProblemForm(true))} className='relative group w-10 h-9 flex items-center justify-center bg-green-600 text-white rounded-lg shadow hover:bg-green-700 active:scale-95 transition-transform duration-150'>
            <Plus size={20} />
            <span className='absolute -top-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none'>{activeTab === 'faq' ? t('addFaq') : t('addProblem')}</span>
          </button>

          {/* زر استيراد JSON */}
          <button onClick={() => setShowJsonImport(true)} className='relative group w-10 h-9 flex items-center justify-center bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 active:scale-95 transition-transform duration-150'>
            <Import size={20} />
            <span className='absolute -top-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none'>{t('importJson')}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className=' mb-8  flex items-center justify-center gap-3  '>
        <div className='flex flex-wrap justify-center gap-3'>
          {activeTab === 'problems' && <DifficultyFilter filter={filter} setFilter={setFilter} t={t} />}

          <ReadStatusFilter filter={filter} setFilter={setFilter} t={t} />
          {/* كل الفئات */}
          <button onClick={() => setFilter({ ...filter, category: '' })} className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-300 ${filter.category === '' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}>
            {t('allCategories')} ({activeTab == 'faq' ? faqs.length : problems.length})
          </button>

          {/* الفئات الديناميكية */}
          {categories.map(category => {
            const count = activeTab == 'faq' ? faqs.filter(faq => faq.category === category).length : problems.filter(faq => faq.category === category).length;
            return (
              <button key={category} onClick={() => setFilter({ ...filter, category })} className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-300 ${filter.category === category ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}>
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* JSON Import Modal */}
      <Modal
        show={showJsonImport}
        onClose={() => {
          setShowJsonImport(false);
          setJsonInput('');
        }}>
        <h2 className='text-xl font-semibold mb-4'>{t('importJson')}</h2>

        <textarea
          className='w-full h-64 p-3 border rounded font-mono text-sm'
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder={
            activeTab === 'faq'
              ? `[
  {
    "question": "ما هو React؟",
    "answer": "مكتبة لبناء الواجهات - تدعم JSX و Virtual DOM",
    "category": "Frontend"
  }
]`
              : `[
  {
    "title": "مشكلة في ترتيب العناصر",
    "solution": "استخدم Flexbox لحل المشكلة",
    "difficulty": "medium",
    "category": "CSS"
  }
]`
          }
        />

        <div className='flex justify-end space-x-3 mt-4'>
          <button
            onClick={() => {
              setShowJsonImport(false);
              setJsonInput('');
            }}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'>
            {t('cancel')}
          </button>

          <button onClick={() => handleJsonImport(activeTab)} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
            {t('import')}
          </button>
        </div>
      </Modal>

      {/* FAQ Form Modal */}
      <Modal
        show={showFaqForm}
        onClose={() => {
          resetFaqForm();
          setShowFaqForm(false);
        }}>
        <h2 className='text-2xl font-semibold mb-6 border-b pb-2'>
          {isEditing ? t('editItem') : t('addNewItem')} {t('faq')}
        </h2>

        <form onSubmit={handleFaqSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('question')} *</label>
            <input type='text' className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' value={faqForm.question} onChange={e => setFaqForm({ ...faqForm, question: e.target.value })} required />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('answer')} *</label>
            <TextEditor height='200px' value={faqForm.answer} onChange={value => setFaqForm({ ...faqForm, answer: value })} />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('category')} *</label>
            <input type='text' list='categories' className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' value={faqForm.category} onChange={e => setFaqForm({ ...faqForm, category: e.target.value })} required />
            <datalist id='categories'>
              {categories.map(category => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div className='flex items-center'>
            <input type='checkbox' id='faq-read' className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500' checked={faqForm.isRead} onChange={e => setFaqForm({ ...faqForm, isRead: e.target.checked })} />
            <label htmlFor='faq-read' className='ml-2 text-sm text-gray-700'>
              {t('markAsRead')}
            </label>
          </div>

          <div className='flex justify-end space-x-4 pt-4'>
            <button
              type='button'
              onClick={() => {
                resetFaqForm();
                setShowFaqForm(false);
              }}
              className='px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition'>
              {t('cancel')}
            </button>
            <button type='submit' disabled={!isFaqFormValid} className={`px-5 py-2 rounded-lg transition ${isFaqFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              {isEditing ? t('update') : t('save')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Problem Form Modal */}
      <Modal
        show={showProblemForm}
        onClose={() => {
          resetProblemForm();
          setShowProblemForm(false);
        }}>
        <h2 className='text-xl font-semibold mb-4'>
          {isEditing ? t('editItem') : t('addNewItem')} {t('problem')}
        </h2>

        <form onSubmit={handleProblemSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('title')} *</label>
            <input type='text' className='w-full px-3 py-2 border rounded' value={problemForm.title} onChange={e => setProblemForm({ ...problemForm, title: e.target.value })} required />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('solution')} *</label>
            <TextEditor height={'200px'} value={problemForm.solution} onChange={value => setProblemForm({ ...problemForm, solution: value })} />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('difficulty')}</label>
            <select className='w-full px-3 py-2 border rounded' value={problemForm.difficulty} onChange={e => setProblemForm({ ...problemForm, difficulty: e.target.value })}>
              <option value='easy'>{t('easy')}</option>
              <option value='medium'>{t('medium')}</option>
              <option value='hard'>{t('hard')}</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('category')} *</label>
            <input type='text' list='categories' className='w-full px-3 py-2 border rounded' value={problemForm.category} onChange={e => setProblemForm({ ...problemForm, category: e.target.value })} required />
          </div>

          <div className='flex items-center'>
            <input type='checkbox' id='problem-read' className='h-4 w-4 text-blue-600 rounded' checked={problemForm.isRead} onChange={e => setProblemForm({ ...problemForm, isRead: e.target.checked })} />
            <label htmlFor='problem-read' className='ml-2 text-sm text-gray-700'>
              {t('markAsRead')}
            </label>
          </div>

          <div className='flex justify-end space-x-3 pt-4'>
            <button
              type='button'
              onClick={() => {
                resetProblemForm();
                setShowProblemForm(false);
              }}
              className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'>
              {t('cancel')}
            </button>
            <button type='submit' disabled={!isProblemFormValid} className={`px-4 py-2 rounded transition-colors ${isProblemFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              {isEditing ? t('update') : t('save')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Content Area */}
      <div className='grid grid-cols-1'>
        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='relative w-32 h-32 mt-12 scale-[4] '>
              {[...Array(8)].map((_, i) => {
                const angle = i * 45 * (Math.PI / 180); // 8 نقاط كل 45 درجة
                const x = 6 * Math.cos(angle);
                const y = 6 * Math.sin(angle);
                return (
                  <div
                    key={i}
                    className='absolute w-2 h-2 bg-blue-500 rounded-full animate-ping'
                    style={{
                      top: `calc(50% + ${y * 2}px - 0.5rem)`,
                      left: `calc(50% + ${x * 2}px - 0.5rem)`,
                      animationDelay: `${i * 0.1}s`,
                    }}></div>
                );
              })}
            </div>
          </div>
        ) : activeTab === 'faq' ? (
          <div>
            {filteredFaqs.length === 0 ? (
              <div className='flex flex-col items-center justify-center text-center py-12 px-4 '>
                <svg className='w-12 h-12 text-gray-400 mb-4' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <h3 className='text-lg font-semibold text-gray-700'>{t('noFaqsFound') /* أو noProblemsFound */}</h3>
                <p className='text-sm text-gray-500 mt-2'>{t('tryAdjustingYourFilters')}</p>
              </div>
            ) : (
              <div className='space-y-3'>
                <AnimatePresence>
                  {filteredFaqs.map(faq => (
                    <motion.div key={faq._id} layout initial='hidden' animate='visible' exit='exit' variants={cardVariants} className='border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'>
                      <div className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50' onClick={() => toggleFaqExpansion(faq._id)}>
                        <div className='flex-1 min-w-0  '>
                          <div className='flex items-center space-x-2 mb-1'>
                            <h3 className={`font-semibold text-base truncate ${faq.isRead ? 'text-gray-600' : 'text-gray-900'}`}>{faq.question}</h3>
                          </div>
                          <p className='text-sm text-gray-500'>{faq.category}</p>
                        </div>

                        <div className='flex items-center gap-2 ml-4'>
                          {/* isRead checkbox */}
                          <label className='inline-flex items-center cursor-pointer' title={faq.isRead ? t('markUnread') : t('markRead')} onClick={e => e.stopPropagation()}>
                            <input type='checkbox' checked={faq.isRead} onChange={() => toggleReadStatus(faq._id, 'faqs', faq.isRead)} className='sr-only peer' />
                            <div className='w-[20px] h-[20px] rounded border border-gray-300 flex items-center justify-center bg-white peer-checked:bg-green-500 peer-checked:border-green-500 transition'>{faq.isRead && <Check size={14} className='text-white' />}</div>
                          </label>

                          {/* Edit button */}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              editFaq(faq);
                            }}
                            className='w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition'
                            title={t('edit')}>
                            <Edit size={16} />
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              deleteItem(faq._id, 'faqs');
                            }}
                            className='w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition'
                            title={t('delete')}>
                            <Trash2 size={16} />
                          </button>

                          {/* Expand/Collapse icon */}
                          <ChevronDown size={20} className={`text-gray-500 transform transition-transform ${expandedFaqId === faq._id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedFaqId === faq._id && (
                          <motion.div initial='hidden' animate='visible' exit='exit' variants={expandVariants} className='overflow-hidden'>
                            <div className='p-4 border-t bg-gray-900 text-white rounded-b-xl'>
                              <div className='prose max-w-none prose-invert space-y-4'>{renderAnswerWithHighlighting(faq.answer)}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        ) : (
          <div> 
            {filteredProblems.length === 0 ? (
              <div className='flex flex-col items-center justify-center text-center py-12'>
                <svg className='w-16 h-16 text-gray-400 mb-4' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25M8.25 9V5.25M3 9h18M4.5 19.5h15a1.5 1.5 0 001.5-1.5V9H3v9a1.5 1.5 0 001.5 1.5z' />
                </svg>

                <h3 className='text-lg font-semibold text-gray-700 mb-1'>{t('noProblemsFound')}</h3>

                <p className='text-sm text-gray-500'>{t('tryAdjustingYourFilters') || 'حاول تعديل الفلاتر أو البحث بطريقة مختلفة'}</p>
              </div>
            ) : (
              <div className='space-y-3'>
                <AnimatePresence>
                  {filteredProblems.map(problem => (
                    <motion.div key={problem._id} layout initial='hidden' animate='visible' exit='exit' variants={cardVariants} className='border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'>
                      <div className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50' onClick={() => toggleProblemExpansion(problem._id)}>
                        <div className='flex-1 min-w-0'>
                          <h3 className={`font-semibold text-base truncate ${problem.isRead ? 'text-gray-500' : 'text-gray-900'}`}>{problem.title}</h3>
                          <div className='flex items-center flex-wrap gap-2 mt-2'>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' : problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{t(problem.difficulty)}</span>
                            <span className='text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-800'>{problem.category}</span>
                          </div>
                        </div>

                        <div className='flex items-center gap-2 ml-4'>
                          <label className='inline-flex items-center cursor-pointer' title={problem.isRead ? t('markUnread') : t('markRead')} onClick={e => e.stopPropagation()}>
                            <input type='checkbox' checked={problem.isRead} onChange={() => toggleReadStatus(problem._id, 'problems', problem.isRead)} className='sr-only peer' />
                            <div className='w-[20px] h-[20px] rounded border border-gray-300 flex items-center justify-center bg-white peer-checked:bg-green-500 peer-checked:border-green-500 transition'>{problem.isRead && <Check size={14} className='text-white' />}</div>
                          </label>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              editProblem(problem);
                            }}
                            className='w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors'
                            title={t('edit')}>
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              deleteItem(problem._id, 'problems');
                            }}
                            className='w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors'
                            title={t('delete')}>
                            <Trash2 size={16} />
                          </button>

                          <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedProblemId === problem._id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedProblemId === problem._id && (
                          <motion.div initial='hidden' animate='visible' exit='exit' variants={expandVariants} className='overflow-hidden'>
                            <div className='p-4 border-t bg-gray-800 text-white rounded-b-xl'>
                              <div className='prose max-w-none prose-invert space-y-4'>{renderAnswerWithHighlighting(problem.solution)}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Modal({ show, onClose, children }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50'>
          <motion.div onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className='bg-white max-h-[calc(100%-60px)] overflow-auto p-6 rounded-lg max-w-3xl w-full mx-4'>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReadStatusFilter({ filter, setFilter, t }) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: t('allStatuses'), value: '', icon: <FiList className='mr-2' />, color: 'bg-gray-100' },
    { label: t('read'), value: 'read', icon: <FiEye className='mr-2' />, color: 'bg-green-200' },
    { label: t('unread'), value: 'unread', icon: <FiEyeOff className='mr-2' />, color: 'bg-blue-200' },
  ];

  const current = options.find(opt => opt.value === filter.readStatus);

  return (
    <div className='relative inline-block text-left'>
      {/* زر الأيقونة */}
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-2 px-4 py-2 ${current?.color || 'bg-gray-100'} hover:bg-gray-200 text-gray-700 rounded-full text-sm border border-gray-300 transition`}>
        <FiEye className='text-sm' />
        <span className='hidden sm:inline'>{current?.label || t('allStatuses')}</span>
      </button>

      {/* القائمة المنسدلة */}
      {open && (
        <div className='absolute z-20 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg'>
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => {
                setFilter({ ...filter, readStatus: option.value });
                setOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 text-sm text-left transition rounded-lg ${filter.readStatus === option.value ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DifficultyFilter({ filter, setFilter, t }) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: t('allDifficulties'), value: '', color: 'bg-gray-100 text-gray-800 ' },
    { label: t('easy'), value: 'easy', color: 'bg-green-200 text-gray-800 ' },
    { label: t('medium'), value: 'medium', color: 'bg-yellow-200 text-gray-800 ' },
    { label: t('hard'), value: 'hard', color: 'bg-red-200 text-gray-800 ' },
  ];

  const current = options.find(opt => opt.value === filter.difficulty) || options[0];

  return (
    <div className='relative inline-block text-left'>
      {/* الزر الرئيسي الذي يعكس لون الصعوبة المختارة */}
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-2 px-4 py-2 ${current.color} hover:brightness-95 text-gray-700 rounded-full text-sm border border-gray-300 transition`}>
        <FiTarget className='text-lg' />
        <span className='hidden sm:inline'>{current.label}</span>
      </button>

      {/* القائمة المنسدلة */}
      {open && (
        <div className='absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg'>
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => {
                setFilter({ ...filter, difficulty: option.value });
                setOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 text-sm text-left transition rounded-lg ${filter.difficulty === option.value ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              <span className={`h-2 w-2 mr-2 rounded-full ${option.color}`}></span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
