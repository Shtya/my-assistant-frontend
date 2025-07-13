/**
 * i need here show the length of every category and also when i select category show the all tags on it 
 * the faqs ( [
    {
        "_id": "68701c2bea7db7f1d86d997b",
        "question": "هل عندي tests كفاية للتحديثات المستقبلية؟",
        "answer": "<h3>🧠 الشرح (بالعربية):</h3> <p>✨ الاختبارات الكافية تتميز بـ: 1) تغطية الحالات الأساسية والحدية، 2) سرعة التنفيذ، 3) استقلاليتها، 4) سهولة الصيانة. نحرص عليها لأنها تمنح ثقة عند التحديث. مؤشرات جودة الاختبارات: نسبة التغطية، وقت التنفيذ، وسهولة فهمها.</p><h3>🔍 مثال:</h3><pre><code>// مثال اختبار جيد (باستخدام Jest)\ndescribe('ShoppingCart', () => {\n  let cart;\n  \n  beforeEach(() => {\n    cart = new ShoppingCart(); // إعداد نظيف قبل كل اختبار\n  });\n  \n  test('should add items correctly', () => {\n    cart.addItem({ id: 1, price: 10 });\n    expect(cart.items.length).toBe(1);\n    expect(cart.total()).toBe(10);\n  });\n  \n  test('should apply discount correctly', () => {\n    cart.addItem({ id: 1, price: 100 });\n    cart.applyDiscount(0.1); // 10% discount\n    expect(cart.total()).toBe(90);\n  });\n  \n  test('should handle empty cart', () => {\n    expect(cart.total()).toBe(0);\n    expect(() => cart.applyDiscount(0.1))\n      .toThrow('Cannot apply discount to empty cart');\n  });\n});</code></pre><h3>📘 معلومات إضافية:</h3><ul><li>أدوات قياس التغطية: Istanbul, Jest --coverage</li><li>اختبارات End-to-End مهمة ولكنها مكلفة</li></ul><h3>🔗 مواضيع ذات صلة:</h3><ul><li>Test Coverage</li><li>Regression Testing</li></ul>",
        "category": "Testing",
        "isRead": false,
        "tag": [
            "Test Sufficiency"
        ],
        "createdAt": "2025-07-10T20:01:47.703Z",
        "__v": 0
    },
    {
        "_id": "68701c2bea7db7f1d86d997a",
        "question": "هل أقدر أغير ميزة أساسية بدون ما أعدل 30 ملف؟",
        "answer": "<h3>🧠 الشرح (بالعربية):</h3> <p>✨ لتقليل التعديلات عند تغيير الميزات: 1) استخدام تصميم معياري، 2) فصل الاهتمامات (Separation of Concerns)، 3) تقليل التكرار (DRY Principle)، 4) استخدام أنماط التصميم مثل Dependency Injection. نهدف لجعل التغييرات محصورة في مكان واحد.</p><h3>🔍 مثال:</h3><pre><code>// مثال سيء (تغيير يتطلب تعديل كل استخدام)\nfunction sendEmail(user, message) {\n  // تنفيذ مباشر\n}\n\n// مثال جيد (استخدام واجهة يمكن تغيير تنفيذها)\ninterface MessageSender {\n  send(user: User, message: string): Promise<void>;\n}\n\nclass EmailSender implements MessageSenderc\n\n// الاستخدام:\nconst sender: MessageSender = new EmailSender();\n// لاحقًا يمكن تغيير التنفيذ دون تعديل أماكن الاستخدام\nconst sender: MessageSender = new SmsSender();</code></pre><h3>📘 معلومات إضافية:</h3><ul><li>مبادئ SOLID تساعد في تحقيق هذا الهدف</li><li>الاختبارات الجيدة تضمن أن التغييرات لا تكسر وظائف موجودة</li></ul><h3>🔗 مواضيع ذات صلة:</h3><ul><li>Software Architecture</li><li>Design Patterns</li></ul>",
        "category": "Software Development",
        "isRead": false,
        "tag": [
            "Maintainability"
        ],
        "createdAt": "2025-07-10T20:01:47.703Z",
        "__v": 0
    },
    {
        "_id": "68701c2bea7db7f1d86d9979",
        "question": "هل في Single Point of Failure في نظامي؟",
        "answer": "<h3>🧠 الشرح (بالعربية):</h3> <p>✨ Single Point of Failure (SPOF) هو مكون إذا فشل يؤدي لفشل النظام كله. لاكتشافه: 1) تحليل البنية للعناصر غير الزائدة عن الحاجة، 2) اختبار سيناريوهات الفشل، 3) مراجعة التبعيات الخارجية. نتجنبه باستخدام: التكرار، التوزيع، وعزل المكونات.</p><h3>🔍 مثال:</h3><pre><code># أمثلة شائعة لـ SPOF:\n# - خادم قاعدة بيانات واحد\n# - خدمة خارجية بدون fallback\n# - Load Balancer واحد\n# - مسار شبكة واحد\n\n# استراتيجيات للقضاء على SPOF:\n# - تكرار الخوادم (Database Replication)\n# - استخدام Multi-AZ في السحابة\n# - تصميم أنماط مثل Circuit Breaker للخدمات الخارجية\n# - وجود خطة استعادة من الكوارث (Disaster Recovery)\n\n# أدوات مساعدة:\n# - AWS Multi-Region Deployment\n# - Kubernetes للتحكم في الحاويات\n# - Service Mesh مثل Istio</code></pre><h3>📘 معلومات إضافية:</h3><ul><li>اختبار Chaos Engineering يساعد في اكتشاف SPOF</li><li>بعض SPOFs مقبولة في مراحل مبكرة مع خطة للتحسين</li></ul><h3>🔗 مواضيع ذات صلة:</h3><ul><li>High Availability</li><li>Fault Tolerance</li></ul>",
        "category": "System Design",
        "isRead": false,
        "tag": [
            "Reliability"
        ],
        "createdAt": "2025-07-10T20:01:47.703Z",
        "__v": 0
    },])


    and also i need select have the all tags to filter with it 

    * and when i click outside the dropdown of any dropdown close it 
    * and also i need add fav tab to add the fav question to it as important question like this 
    * 
    * and also when select a filters for seelct category or status or tags save it in the localestorage to get it when make refresh 

 */

'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Edit, Import, Pencil, Plus, Trash2, X, Filter } from 'lucide-react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
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

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
};

export default function TechnicalCMS() {
  const t = useTranslations('TechnicalCMS');
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
    tags: [],
  });

  // State for data
  const [faqs, setFaqs] = useState([]);
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // Form states
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: '',
    isRead: false,
    tags: [],
  });
  const [problemForm, setProblemForm] = useState({
    title: '',
    solution: '',
    difficulty: 'easy',
    category: '',
    isRead: false,
    tags: [],
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
  const [newTag, setNewTag] = useState('');

  // Loading states for buttons
  const [loadingStates, setLoadingStates] = useState({
    faqSubmit: false,
    problemSubmit: false,
    deleteItem: false,
    toggleRead: false,
    jsonImport: false,
  });

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

        // Extract all unique tags from both FAQs and Problems
        const allTagsFromData = [...new Set([...faqData.flatMap(faq => faq.tags || []), ...problemData.flatMap(problem => problem.tags || [])])];

        setFaqs(faqData);
        setProblems(problemData);
        setAllTags(allTagsFromData);
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

  // Get tags for current category
  const getTagsForCurrentCategory = () => {
    if (!filter.category) return allTags;

    const items = activeTab === 'faq' ? faqs : problems;
    const categoryItems = items.filter(item => item.category === filter.category);
    const categoryTags = new Set();

    categoryItems.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => categoryTags.add(tag));
      }
    });

    return Array.from(categoryTags);
  };

  // Filtered data
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filter.category || faq.category === filter.category;
    const matchesReadStatus = filter.readStatus === '' || (filter.readStatus === 'read' && faq.isRead) || (filter.readStatus === 'unread' && !faq.isRead);
    const matchesTags = filter.tags.length === 0 || (faq.tags && filter.tags.every(tag => faq.tags.includes(tag)));
    return matchesSearch && matchesCategory && matchesReadStatus && matchesTags;
  });

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || problem.solution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filter.category || problem.category === filter.category;
    const matchesDifficulty = !filter.difficulty || problem.difficulty === filter.difficulty;
    const matchesReadStatus = filter.readStatus === '' || (filter.readStatus === 'read' && problem.isRead) || (filter.readStatus === 'unread' && !problem.isRead);
    const matchesTags = filter.tags.length === 0 || (problem.tags && filter.tags.every(tag => problem.tags.includes(tag)));
    return matchesSearch && matchesCategory && matchesDifficulty && matchesReadStatus && matchesTags;
  });

  // Form handlers
  const handleFaqSubmit = async e => {
    e.preventDefault();
    setLoadingStates(prev => ({ ...prev, faqSubmit: true }));
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
          setFaqs([result, ...faqs]);
        }
        resetFaqForm();
        setShowFaqForm(false);
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, faqSubmit: false }));
    }
  };

  const handleProblemSubmit = async e => {
    e.preventDefault();
    setLoadingStates(prev => ({ ...prev, problemSubmit: true }));
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
    } finally {
      setLoadingStates(prev => ({ ...prev, problemSubmit: false }));
    }
  };

  const resetFaqForm = () => {
    setFaqForm({
      question: '',
      answer: '',
      category: '',
      isRead: false,
      tags: [],
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
      tags: [],
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
      tags: faq.tags || [],
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
      tags: problem.tags || [],
    });
    setIsEditing(true);
    setCurrentId(problem._id);
    setShowProblemForm(true);
  };

  const deleteItem = async (id, type) => {
    if (window.confirm(t('deleteConfirm'))) {
      setLoadingStates(prev => ({ ...prev, deleteItem: true }));
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
      } finally {
        setLoadingStates(prev => ({ ...prev, deleteItem: false }));
      }
    }
  };

  const toggleReadStatus = async (id, type, currentStatus) => {
    setLoadingStates(prev => ({ ...prev, toggleRead: true }));
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
    } finally {
      setLoadingStates(prev => ({ ...prev, toggleRead: false }));
    }
  };

  const handleJsonImport = async type => {
    setLoadingStates(prev => ({ ...prev, jsonImport: true }));
    try {
      const data = JSON.parse(jsonInput);
      const response = await fetch(`/api/${type === 'faq' ? 'faqs' : 'problems'}`, {
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
    } finally {
      setLoadingStates(prev => ({ ...prev, jsonImport: false }));
    }
  };

  // Tag handlers
  const addTagToForm = (formType, tag) => {
    if (formType === 'faq') {
      if (!faqForm.tags.includes(tag)) {
        setFaqForm({ ...faqForm, tags: [...faqForm.tags, tag] });
      }
    } else {
      if (!problemForm.tags.includes(tag)) {
        setProblemForm({ ...problemForm, tags: [...problemForm.tags, tag] });
      }
    }
  };

  const removeTagFromForm = (formType, tag) => {
    if (formType === 'faq') {
      setFaqForm({ ...faqForm, tags: faqForm.tags.filter(t => t !== tag) });
    } else {
      setProblemForm({ ...problemForm, tags: problemForm.tags.filter(t => t !== tag) });
    }
  };

  const createNewTag = formType => {
    if (newTag.trim() && !allTags.includes(newTag.trim())) {
      setAllTags([...allTags, newTag.trim()]);
      addTagToForm(formType, newTag.trim());
      setNewTag('');
    }
  };

  const toggleTagFilter = tag => {
    setFilter(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag],
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilter({
      category: '',
      difficulty: '',
      readStatus: '',
      tags: [],
    });
  };

  // Form validation
  console.log(faqForm);
  const isFaqFormValid = faqForm.question.trim() && faqForm.answer.trim() && faqForm.category.trim();
  const isProblemFormValid = problemForm.title.trim() && problemForm.solution.trim() && problemForm.category.trim();

  // Toggle expansion
  const toggleFaqExpansion = id => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const toggleProblemExpansion = id => {
    setExpandedProblemId(expandedProblemId === id ? null : id);
  };

  function renderAnswerWithHighlighting(answer) {
    if (!answer) return null;

    // Create a parser function for HTML content
    const parseHtmlContent = html => {
      const container = document.createElement('div');
      container.innerHTML = html;
      return Array.from(container.childNodes);
    };

    // Enhanced code block renderer
    const renderCodeBlock = (code, key, language = 'javascript') => (
      <SyntaxHighlighter
        key={key}
        language={language}
        style={oneLight}
        wrapLines={true}
        wrapLongLines={true}
        lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
        customStyle={{
          borderRadius: '0.5rem',
          fontSize: '0.85rem',
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          margin: '1rem 0',
          overflowX: 'auto',
          fontFamily: 'monospace',
        }}
        showLineNumbers
        lineNumberStyle={{
          color: '#adb5bd',
          minWidth: '2.5em',
          userSelect: 'none',
        }}>
        {code.trim()}
      </SyntaxHighlighter>
    );

    // Handle both Markdown-style ``` and HTML <pre><code> blocks
    if (answer.includes('```') || answer.includes('<pre><code>')) {
      // Unified split pattern for both Markdown and HTML code blocks
      const parts = answer.split(/(```[\s\S]*?```|<pre><code>[\s\S]*?<\/code><\/pre>)/g);

      return parts.map((part, i) => {
        // Check for Markdown ``` code blocks
        if (part.startsWith('```') && part.endsWith('```')) {
          const codeContent = part.slice(3, -3).trim();
          return renderCodeBlock(codeContent, i);
        }
        // Check for HTML <pre><code> blocks
        else if (part.startsWith('<pre><code>') && part.endsWith('</code></pre>')) {
          const codeContent = part.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, '$1').trim();
          return renderCodeBlock(codeContent, i);
        }
        // Handle regular content
        else if (part.trim()) {
          const nodes = parseHtmlContent(part);
          return nodes.map((node, j) => {
            const uniqueKey = `${i}-${j}`;
            if (node.nodeName === 'CODE') {
              return renderCodeBlock(node.textContent, uniqueKey);
            }
            return (
              <div
                key={uniqueKey}
                dangerouslySetInnerHTML={{ __html: node.outerHTML || node.textContent }}
                style={{
                  whiteSpace: 'pre-wrap',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  marginBottom: '1rem',
                }}
              />
            );
          });
        }
        return null;
      });
    }

    // Fallback for pure HTML content without code blocks
    const nodes = parseHtmlContent(answer);
    return nodes.map((node, i) => {
      if (node.nodeName === 'CODE') {
        return renderCodeBlock(node.textContent, i);
      }
      return (
        <div
          key={i}
          dangerouslySetInnerHTML={{ __html: node.outerHTML || node.textContent }}
          style={{
            whiteSpace: 'pre-wrap',
            fontSize: '1rem',
            lineHeight: '1.7',
            marginBottom: '1rem',
          }}
        />
      );
    });
  }

  return (
    <div className='text-gray-900 px-4 py-4'>
      <h1 className='text-3xl font-bold mb-8'>{t('title')}</h1>

      {/* Tabs */}
      <div className='flex border-b mb-6 justify-between'>
        <div className='flex items-center gap-2'>
          <button className={`py-2 px-4 font-medium ${activeTab === 'faq' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('faq')}>
            {t('faqTab')}
          </button>
          <button className={`py-2 px-4 font-medium ${activeTab === 'problems' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveTab('problems')}>
            {t('problemsTab')}
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <button onClick={() => (activeTab === 'faq' ? setShowFaqForm(true) : setShowProblemForm(true))} className='relative group w-10 h-9 flex items-center justify-center bg-green-600 text-white rounded-lg shadow hover:bg-green-700 active:scale-95 transition-transform duration-150'>
            <Plus size={20} />
            <span className='absolute -top-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none'>{activeTab === 'faq' ? t('addFaq') : t('addProblem')}</span>
          </button>

          <button onClick={() => setShowJsonImport(true)} className='relative group w-10 h-9 flex items-center justify-center bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 active:scale-95 transition-transform duration-150'>
            <Import size={20} />
            <span className='absolute -top-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none'>{t('importJson')}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='mb-8 flex flex-col gap-4'>
        {/* Main filter row */}
        <div className='flex flex-wrap items-center gap-3'>
          {/* Category dropdown */}
          <div className='relative'>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${filter.category ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-700 border-gray-300'} hover:bg-gray-50 transition`} onClick={() => document.getElementById('category-dropdown').classList.toggle('hidden')}>
              {filter.category || t('allCategories')}
              <ChevronDown size={16} />
            </button>
            <div id='category-dropdown' className='hidden absolute max-h-[265px] overflow-auto z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg'>
              <button
                onClick={() => {
                  setFilter({ ...filter, category: '' });
                  document.getElementById('category-dropdown').classList.add('hidden');
                }}
                className={`w-full text-left px-4 py-2 ${!filter.category ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}>
                {t('allCategories')}
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setFilter({ ...filter, category });
                    document.getElementById('category-dropdown').classList.add('hidden');
                  }}
                  className={`w-full text-left px-4 py-2 ${filter.category === category ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Combined filter dropdown */}
          <div className='relative'>
            <button className='flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition' onClick={() => document.getElementById('filter-dropdown').classList.toggle('hidden')}>
              <Filter size={16} />
              <span>{t('filters')}</span>
              <ChevronDown size={16} />
            </button>
            <div id='filter-dropdown' className='hidden absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-3'>
              {/* Status filter */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>{t('status')}</label>
                <div className='flex gap-2'>
                  <button onClick={() => setFilter({ ...filter, readStatus: '' })} className={`px-3 py-1 text-sm rounded ${filter.readStatus === '' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {t('all')}
                  </button>
                  <button onClick={() => setFilter({ ...filter, readStatus: 'read' })} className={`px-3 py-1 text-sm rounded ${filter.readStatus === 'read' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {t('read')}
                  </button>
                  <button onClick={() => setFilter({ ...filter, readStatus: 'unread' })} className={`px-3 py-1 text-sm rounded ${filter.readStatus === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {t('unread')}
                  </button>
                </div>
              </div>

              {/* Difficulty filter (only for problems) */}
              {activeTab === 'problems' && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>{t('difficulty')}</label>
                  <div className='flex gap-2'>
                    <button onClick={() => setFilter({ ...filter, difficulty: '' })} className={`px-3 py-1 text-sm rounded ${filter.difficulty === '' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {t('all')}
                    </button>
                    <button onClick={() => setFilter({ ...filter, difficulty: 'easy' })} className={`px-3 py-1 text-sm rounded ${filter.difficulty === 'easy' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {t('easy')}
                    </button>
                    <button onClick={() => setFilter({ ...filter, difficulty: 'medium' })} className={`px-3 py-1 text-sm rounded ${filter.difficulty === 'medium' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {t('medium')}
                    </button>
                    <button onClick={() => setFilter({ ...filter, difficulty: 'hard' })} className={`px-3 py-1 text-sm rounded ${filter.difficulty === 'hard' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {t('hard')}
                    </button>
                  </div>
                </div>
              )}

              {/* Tags filter */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>{t('tags')}</label>
                <div className='flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1'>
                  {getTagsForCurrentCategory().map(tag => (
                    <motion.button key={tag} onClick={() => toggleTagFilter(tag)} className={`px-2 py-1 text-xs rounded-full ${filter.tags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} variants={itemVariants}>
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Clear all button */}
              <button onClick={clearAllFilters} className='w-full mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded'>
                {t('clearAllFilters')}
              </button>
            </div>
          </div>

          {/* Active filters display */}
          <div className='flex flex-wrap gap-2 items-center'>
            {filter.category && (
              <motion.span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                {filter.category}
                <button onClick={() => setFilter({ ...filter, category: '' })} className='ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600 focus:outline-none'>
                  <X size={12} />
                </button>
              </motion.span>
            )}
            {filter.readStatus && (
              <motion.span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                {filter.readStatus === 'read' ? t('read') : t('unread')}
                <button onClick={() => setFilter({ ...filter, readStatus: '' })} className='ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600 focus:outline-none'>
                  <X size={12} />
                </button>
              </motion.span>
            )}
            {activeTab === 'problems' && filter.difficulty && (
              <motion.span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                {t(filter.difficulty)}
                <button onClick={() => setFilter({ ...filter, difficulty: '' })} className='ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600 focus:outline-none'>
                  <X size={12} />
                </button>
              </motion.span>
            )}
            {filter.tags.map(tag => (
              <motion.span key={tag} className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                {tag}
                <button onClick={() => toggleTagFilter(tag)} className='ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600 focus:outline-none'>
                  <X size={12} />
                </button>
              </motion.span>
            ))}
          </div>
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
    "question": "What is React?",
    "answer": "A JavaScript library for building user interfaces",
    "category": "Frontend",
    "tags": ["react", "javascript"]
  }
]`
              : `[
  {
    "title": "Array sorting issue",
    "solution": "Use the sort method with a compare function",
    "difficulty": "medium",
    "category": "JavaScript",
    "tags": ["arrays", "sorting"]
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

          <button onClick={() => handleJsonImport(activeTab)} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center min-w-20' disabled={loadingStates.jsonImport}>
            {loadingStates.jsonImport ? (
              <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
            ) : null}
            {loadingStates.jsonImport ? t('importing') : t('import')}
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
            <textarea className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-[300px]  ' value={faqForm.answer} onChange={value => setFaqForm({ ...faqForm, answer: value.target.value })} />
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

          {/* Tags input for FAQ */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{t('tags')}</label>
            <div className='flex flex-wrap gap-2 mb-2'>
              {faqForm.tags.map(tag => (
                <motion.span key={tag} className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                  {tag}
                  <button type='button' onClick={() => removeTagFromForm('faq', tag)} className='ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600 focus:outline-none'>
                    <X size={12} />
                  </button>
                </motion.span>
              ))}
            </div>
            <div className='flex gap-2'>
              <select
                className='flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                value=''
                onChange={e => {
                  if (e.target.value) {
                    addTagToForm('faq', e.target.value);
                    e.target.value = '';
                  }
                }}>
                <option value=''>{t('selectTag')}</option>
                {allTags
                  .filter(tag => !faqForm.tags.includes(tag))
                  .map(tag => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
              </select>
              <div className='flex'>
                <input type='text' className='px-3 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder={t('newTag')} value={newTag} onChange={e => setNewTag(e.target.value)} />
                <button type='button' onClick={() => createNewTag('faq')} className='px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700'>
                  {t('add')}
                </button>
              </div>
            </div>
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
            <button type='submit' disabled={!isFaqFormValid || loadingStates.faqSubmit} className={`px-5 py-2 rounded-lg transition flex items-center justify-center min-w-20 ${isFaqFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              {loadingStates.faqSubmit ? (
                <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
              ) : null}
              {loadingStates.faqSubmit ? t('saving') : isEditing ? t('update') : t('save')}
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
            <textarea className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-[300px]  ' value={problemForm.solution} onChange={value => setProblemForm({ ...problemForm, solution: value.target.value })} />
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
            <button type='submit' disabled={!isProblemFormValid || loadingStates.problemSubmit} className={`px-4 py-2 rounded transition-colors flex items-center justify-center min-w-20 ${isProblemFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              {loadingStates.problemSubmit ? (
                <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
              ) : null}
              {loadingStates.problemSubmit ? t('saving') : isEditing ? t('update') : t('save')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Content Area */}
      <div dir='rtl' className='ar-font grid grid-cols-1'>
        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='relative w-32 h-32 mt-12 scale-[4]'>
              {[...Array(8)].map((_, i) => {
                const angle = i * 45 * (Math.PI / 180);
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
              <div className='flex flex-col items-center justify-center text-center py-12 px-4'>
                <svg className='w-12 h-12 text-gray-400 mb-4' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <h3 className='text-lg font-semibold text-gray-700'>{t('noFaqsFound')}</h3>
                <p className='text-sm text-gray-500 mt-2'>{t('tryAdjustingYourFilters')}</p>
              </div>
            ) : (
              <div className='space-y-3 '>
                <AnimatePresence>
                  {filteredFaqs.map(faq => (
                    <motion.div key={faq._id} layout initial='hidden' animate='visible' exit='exit' variants={cardVariants} className='border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'>
                      <div className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50' onClick={() => toggleFaqExpansion(faq._id)}>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center space-x-2 mb-1'>
                            <h3 className={`font-semibold text-lg truncate ${faq.isRead ? 'text-gray-600' : 'text-gray-900'}`}>{faq.question}</h3>
                          </div>
                        </div>

                        <div className='flex items-center gap-2 mr-4'>
                          <label className='inline-flex items-center cursor-pointer' title={faq.isRead ? t('markUnread') : t('markRead')} onClick={e => e.stopPropagation()}>
                            <input type='checkbox' checked={faq.isRead} onChange={() => toggleReadStatus(faq._id, 'faqs', faq.isRead)} className='sr-only peer' disabled={loadingStates.toggleRead} />
                            <div className={`w-[20px] h-[20px] rounded border border-gray-300 flex items-center justify-center bg-white peer-checked:bg-green-500 peer-checked:border-green-500 transition ${loadingStates.toggleRead ? 'opacity-50' : ''}`}>{faq.isRead && <Check size={14} className='text-white' />}</div>
                          </label>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              editFaq(faq);
                            }}
                            className='w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition'
                            title={t('edit')}>
                            <Edit size={16} />
                          </button>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              deleteItem(faq._id, 'faqs');
                            }}
                            className={`w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition ${loadingStates.deleteItem ? 'opacity-50' : ''}`}
                            title={t('delete')}
                            disabled={loadingStates.deleteItem}>
                            {loadingStates.deleteItem ? (
                              <svg className='animate-spin h-4 w-4 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                              </svg>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>

                          <ChevronDown size={20} className={`text-gray-500 transform transition-transform ${expandedFaqId === faq._id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedFaqId === faq._id && (
                          <motion.div initial='hidden' animate='visible' exit='exit' variants={expandVariants} className='overflow-hidden'>
                            <div className='p-4 border-t   ounded-b-xl'>
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

                <p className='text-sm text-gray-500'>{t('tryAdjustingYourFilters') || 'Try adjusting your filters or search differently'}</p>
              </div>
            ) : (
              <div className='space-y-3'>
                <AnimatePresence>
                  {filteredProblems.map(problem => (
                    <motion.div key={problem._id} layout initial='hidden' animate='visible' exit='exit' variants={cardVariants} className='border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'>
                      <div className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50' onClick={() => toggleProblemExpansion(problem._id)}>
                        <div className='flex-1 min-w-0'>
                          <h3 className={`font-semibold text-base truncate ${problem.isRead ? 'text-gray-500' : 'text-gray-900'}`}>{problem.title}</h3>
                        </div>

                        <div className='flex items-center gap-2 mr-4'>
                          <label className='inline-flex items-center cursor-pointer' title={problem.isRead ? t('markUnread') : t('markRead')} onClick={e => e.stopPropagation()}>
                            <input type='checkbox' checked={problem.isRead} onChange={() => toggleReadStatus(problem._id, 'problems', problem.isRead)} className='sr-only peer' disabled={loadingStates.toggleRead} />
                            <div className={`w-[20px] h-[20px] rounded border border-gray-300 flex items-center justify-center bg-white peer-checked:bg-green-500 peer-checked:border-green-500 transition ${loadingStates.toggleRead ? 'opacity-50' : ''}`}>{problem.isRead && <Check size={14} className='text-white' />}</div>
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
                            className={`w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors ${loadingStates.deleteItem ? 'opacity-50' : ''}`}
                            title={t('delete')}
                            disabled={loadingStates.deleteItem}>
                            {loadingStates.deleteItem ? (
                              <svg className='animate-spin h-4 w-4 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                              </svg>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>

                          <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedProblemId === problem._id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedProblemId === problem._id && (
                          <motion.div initial='hidden' animate='visible' exit='exit' variants={expandVariants} className='overflow-hidden'>
                            <div className='p-4 border-t   rounded-b-xl'>
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
        <motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
          <motion.div onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className='bg-white max-h-[calc(100%-60px)] overflow-auto p-6 rounded-lg max-w-3xl w-full mx-4'>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
