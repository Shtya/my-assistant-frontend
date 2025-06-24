
'use client'

import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

// API endpoints
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const EXAMPLE_SENTENCE_API = 'https://api.quotable.io/random?tags=education|knowledge';
const UNSPLASH_API = 'https://source.unsplash.com/random/300x300/?';

// Sounds
const sounds = {
  correct: new Howl({ src: ['/sounds/correct.mp3'] }),
  wrong: new Howl({ src: ['/sounds/wrong.mp3'] })
};

// Tips data
const learningTips = [
  "Repeat a word 3 times aloud to improve recall.",
  "Group similar words into categories.",
  "Use new words in sentences to reinforce memory.",
  "Review words just before sleep for better retention.",
  "Associate words with images or stories.",
  "Practice with flashcards regularly.",
  "Focus on words you find difficult more often.",
  "Learn words in context, not in isolation."
];

export default function LanguageLearningApp() {
  // State
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [timeRangeFilter, setTimeRangeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [newWord, setNewWord] = useState('');
  const [newWordMeaning, setNewWordMeaning] = useState('');
  const [newWordExample, setNewWordExample] = useState('');
  const [newWordDifficulty, setNewWordDifficulty] = useState('easy');
  const [newSentence, setNewSentence] = useState('');
  const [newSentenceTranslation, setNewSentenceTranslation] = useState('');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wordImage, setWordImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Tabs
  const tabs = [
    { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
    { id: 'sentences', label: 'Sentences', icon: '✍️' },
    { id: 'flashcards', label: 'Flashcards', icon: '🔄' },
    { id: 'favorites', label: 'Favorites', icon: '⭐' },
    { id: 'tips', label: 'Tips', icon: '💡' }
  ];

  // Initialize data from localStorage
  useEffect(() => {
    const storedWords = localStorage.getItem('words');
    const storedSentences = localStorage.getItem('sentences');
    const storedDarkMode = localStorage.getItem('darkMode');

    if (storedWords) setWords(JSON.parse(storedWords));
    if (storedSentences) setSentences(JSON.parse(storedSentences));
    if (storedDarkMode) setDarkMode(storedDarkMode === 'true');
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
    localStorage.setItem('sentences', JSON.stringify(sentences));
    localStorage.setItem('darkMode', darkMode.toString());
  }, [words, sentences, darkMode]);

  // Fetch word details from dictionary API
  const fetchWordDetails = async (word) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${DICTIONARY_API}${word}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].meanings) {
        const meaning = data[0].meanings[0].definitions[0]?.definition || 'No definition found';
        setNewWordMeaning(meaning);
      }
    } catch (error) {
      console.error('Error fetching word details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch example sentence
  const fetchExampleSentence = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(EXAMPLE_SENTENCE_API);
      const data = await response.json();
      setNewWordExample(data.content);
    } catch (error) {
      console.error('Error fetching example sentence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle word input change with debounce for API calls
  useEffect(() => {
    if (newWord.trim().length > 2) {
      const timer = setTimeout(() => {
        fetchWordDetails(newWord);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [newWord]);

  // Filter words based on selected filters
  const filteredWords = useCallback(() => {
    let result = [...words];

    // Filter by time range
    if (timeRangeFilter !== 'all') {
      const now = new Date();
      result = result.filter(word => {
        const dateAdded = new Date(word.dateAdded);
        if (timeRangeFilter === 'today') {
          return dateAdded.toDateString() === now.toDateString();
        } else if (timeRangeFilter === 'week') {
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return dateAdded >= oneWeekAgo;
        } else if (timeRangeFilter === 'month') {
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return dateAdded >= oneMonthAgo;
        }
        return true;
      });
    }

    // Filter by difficulty
    if (difficultyFilter !== 'all') {
      result = result.filter(word => word.difficulty === difficultyFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(word => 
        word.text.toLowerCase().includes(query) || 
        word.meaning.toLowerCase().includes(query) ||
        word.example.toLowerCase().includes(query)
      );
    }

    return result;
  }, [words, timeRangeFilter, difficultyFilter, searchQuery]);

  // Filter sentences based on selected filters
  const filteredSentences = useCallback(() => {
    let result = [...sentences];

    // Filter by time range
    if (timeRangeFilter !== 'all') {
      const now = new Date();
      result = result.filter(sentence => {
        const dateAdded = new Date(sentence.dateAdded);
        if (timeRangeFilter === 'today') {
          return dateAdded.toDateString() === now.toDateString();
        } else if (timeRangeFilter === 'week') {
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return dateAdded >= oneWeekAgo;
        } else if (timeRangeFilter === 'month') {
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return dateAdded >= oneMonthAgo;
        }
        return true;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(sentence => 
        sentence.text.toLowerCase().includes(query) || 
        sentence.translation.toLowerCase().includes(query)
      );
    }

    return result;
  }, [sentences, timeRangeFilter, searchQuery]);

  // Get favorite words and sentences
  const favorites = useCallback(() => {
    const favWords = words.filter(word => word.isFavorite);
    const favSentences = sentences.filter(sentence => sentence.isFavorite);
    return { words: favWords, sentences: favSentences };
  }, [words, sentences]);

  // Get words for review based on spaced repetition
  const wordsForReview = useCallback(() => {
    const now = new Date();
    return words.filter(word => {
      // Always include words added today
      const dateAdded = new Date(word.dateAdded);
      if (dateAdded.toDateString() === now.toDateString()) return true;
      
      // Include words based on difficulty and last reviewed date
      if (!word.lastReviewed) return true;
      
      const lastReviewed = new Date(word.lastReviewed);
      const daysSinceReview = (now.getTime() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24);
      
      if (word.difficulty === 'hard') return daysSinceReview >= 1;
      if (word.difficulty === 'medium') return daysSinceReview >= 3;
      return daysSinceReview >= 7;
    });
  }, [words]);

  // Add a new word
  const handleAddWord = async () => {
    if (!newWord || !newWordMeaning) return;

    try {
      // Generate image URL from Unsplash or use uploaded image
      let imageUrl = wordImage ? URL.createObjectURL(wordImage) : 
        `${UNSPLASH_API}${newWord}`;

      const word = {
        id: Date.now().toString(),
        text: newWord.trim(),
        meaning: newWordMeaning.trim(),
        example: newWordExample.trim(),
        difficulty: newWordDifficulty,
        imageUrl,
        dateAdded: new Date().toISOString(),
        isFavorite: false,
        reviewCount: 0,
        lastReviewed: null
      };

      setWords([...words, word]);
      setNewWord('');
      setNewWordMeaning('');
      setNewWordExample('');
      setNewWordDifficulty('easy');
      setWordImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  // Add a new sentence
  const handleAddSentence = () => {
    if (!newSentence) return;

    // Auto-translate if translation is empty (simulated)
    let translation = newSentenceTranslation;
    if (!translation) {
      translation = `[Translation of "${newSentence}"]`;
    }

    const sentence = {
      id: Date.now().toString(),
      text: newSentence.trim(),
      translation: translation.trim(),
      isFavorite: false,
      dateAdded: new Date().toISOString()
    };

    setSentences([...sentences, sentence]);
    setNewSentence('');
    setNewSentenceTranslation('');
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWordImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Toggle word favorite status
  const toggleWordFavorite = (id) => {
    setWords(words.map(word => 
      word.id === id ? { ...word, isFavorite: !word.isFavorite } : word
    ));
  };

  // Toggle sentence favorite status
  const toggleSentenceFavorite = (id) => {
    setSentences(sentences.map(sentence => 
      sentence.id === id ? { ...sentence, isFavorite: !sentence.isFavorite } : sentence
    ));
  };

  // Handle flashcard navigation
  const handleNextCard = () => {
    const reviewWords = wordsForReview();
    if (reviewWords.length === 0) return;
    
    setFlashcardIndex((prevIndex) => 
      prevIndex >= reviewWords.length - 1 ? 0 : prevIndex + 1
    );
    setIsFlipped(false);
    setShowMeaning(false);
    setShowExample(false);
  };

  const handlePrevCard = () => {
    const reviewWords = wordsForReview();
    if (reviewWords.length === 0) return;
    
    setFlashcardIndex((prevIndex) => 
      prevIndex <= 0 ? reviewWords.length - 1 : prevIndex - 1
    );
    setIsFlipped(false);
    setShowMeaning(false);
    setShowExample(false);
  };

  // Handle flashcard answer
  const handleFlashcardAnswer = (correct) => {
    const reviewWords = wordsForReview();
    if (reviewWords.length === 0) return;

    const currentWordId = reviewWords[flashcardIndex].id;
    
    // Update word review count and last reviewed date
    setWords(words.map(word => 
      word.id === currentWordId ? { 
        ...word, 
        reviewCount: word.reviewCount + 1,
        lastReviewed: new Date().toISOString()
      } : word
    ));

    // Play sound
    if (correct) {
      sounds.correct.play();
    } else {
      sounds.wrong.play();
    }

    // Move to next card after a delay
    setTimeout(() => {
      handleNextCard();
    }, 1000);
  };

  // Shuffle flashcards
  const shuffleFlashcards = () => {
    const reviewWords = wordsForReview();
    if (reviewWords.length === 0) return;
    
    // Randomize the current index
    setFlashcardIndex(Math.floor(Math.random() * reviewWords.length));
    setIsFlipped(false);
    setShowMeaning(false);
    setShowExample(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Export data
  const exportData = () => {
    const data = { words, sentences };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'language-learning-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import data
  const importData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result);
        if (data.words && data.sentences) {
          setWords(data.words);
          setSentences(data.sentences);
          alert('Data imported successfully!');
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  // Render
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 p-4 shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            LinguaMaster
          </h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="relative flex-grow md:w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500' : 'bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 pb-20">
        {/* Tabs */}
        <div className="flex overflow-x-auto mb-6 scrollbar-hide">
          <div className="flex space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id 
                  ? darkMode 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-blue-500 text-white shadow-lg'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } whitespace-nowrap`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.id === 'favorites' && favorites().words.length + favorites().sentences.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-yellow-500 text-white">
                    {favorites().words.length + favorites().sentences.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`p-6 rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}`}>
          {/* Vocabulary Tab */}
          {activeTab === 'vocabulary' && (
            <div>
              <div className="flex flex-wrap justify-between items-center mb-6">
                <h2 className="text-xl font-bold mb-4 md:mb-0">Vocabulary Builder</h2>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={timeRangeFilter}
                    onChange={(e) => setTimeRangeFilter(e.target.value)}
                    className={`px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-900 border hover:bg-gray-50'}`}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
                    <span className="text-sm">Difficulty:</span>
                    {['all', 'easy', 'medium', 'hard'].map((level) => (
                      <label key={level} className="flex items-center space-x-1 cursor-pointer">
                        <input
                          type="radio"
                          value={level}
                          checked={difficultyFilter === level}
                          onChange={() => setDifficultyFilter(level)}
                          className="hidden"
                        />
                        <span className={`px-2 py-1 text-xs rounded-full transition-colors ${difficultyFilter === level 
                          ? level === 'easy' ? 'bg-green-500 text-white' :
                            level === 'medium' ? 'bg-yellow-500 text-white' :
                            level === 'hard' ? 'bg-red-500 text-white' :
                            'bg-blue-500 text-white'
                          : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {level === 'all' ? 'All' : level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Word Form */}
              <div className={`p-4 mb-6 rounded-lg transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className="text-lg font-semibold mb-3">Add New Word</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block mb-1 font-medium">English Word</label>
                    <input
                      type="text"
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      className={`w-full px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500' : 'bg-white text-gray-900 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                      placeholder="Enter word"
                    />
                    {newWord && (
                      <button 
                        onClick={() => fetchWordDetails(newWord)}
                        disabled={isLoading}
                        className="mt-1 text-xs text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        {isLoading ? 'Fetching...' : 'Get Definition'}
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Meaning</label>
                    <input
                      type="text"
                      value={newWordMeaning}
                      onChange={(e) => setNewWordMeaning(e.target.value)}
                      className={`w-full px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500' : 'bg-white text-gray-900 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                      placeholder="Enter meaning"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-medium">Example Sentence</label>
                    <button 
                      onClick={fetchExampleSentence}
                      disabled={isLoading || !newWord}
                      className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      {isLoading ? 'Generating...' : 'Generate Example'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={newWordExample}
                    onChange={(e) => setNewWordExample(e.target.value)}
                    className={`w-full px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500' : 'bg-white text-gray-900 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                    placeholder="Enter example sentence"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Image</label>
                  <div className="flex items-center space-x-4">
                    <label className={`cursor-pointer px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white border hover:bg-gray-50'}`}>
                      Upload Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <button 
                          onClick={() => {
                            setWordImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    {!imagePreview && (
                      <button
                        onClick={() => setWordImage('auto')}
                        className={`px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white border hover:bg-gray-50'}`}
                      >
                        Auto-generate Image
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <label className="block mb-1 font-medium">Difficulty</label>
                    <div className="flex space-x-2">
                      {['easy', 'medium', 'hard'].map((level) => (
                        <label key={level} className="flex items-center space-x-1 cursor-pointer">
                          <input
                            type="radio"
                            value={level}
                            checked={newWordDifficulty === level}
                            onChange={() => setNewWordDifficulty(level)}
                            className="hidden"
                          />
                          <span className={`px-3 py-1 rounded-full transition-colors ${newWordDifficulty === level 
                            ? level === 'easy' ? 'bg-green-500 text-white' :
                              level === 'medium' ? 'bg-yellow-500 text-white' :
                              'bg-red-500 text-white'
                            : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleAddWord}
                    disabled={!newWord || !newWordMeaning}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Word
                  </button>
                </div>
              </div>

              {/* Words List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWords().length > 0 ? (
                  filteredWords().map(word => (
                    <div 
                      key={word.id} 
                      className={`p-4 rounded-lg shadow transition-all hover:shadow-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} cursor-pointer transform hover:-translate-y-1 transition-transform`}
                      onClick={() => setSelectedWord(word)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{word.text}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWordFavorite(word.id);
                          }}
                          className={`text-xl transition-colors ${word.isFavorite ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-gray-300'}`}
                          aria-label={word.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {word.isFavorite ? '★' : '☆'}
                        </button>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                        {word.meaning}
                      </p>
                      {word.imageUrl && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          <img 
                            src={word.imageUrl} 
                            alt={word.text} 
                            className="w-full h-32 object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="mt-2 flex justify-between items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          word.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          word.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {word.difficulty}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(word.dateAdded).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`col-span-full text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchQuery ? 'No words match your search.' : 'No words found. Add some words to get started!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sentences Tab */}
          {activeTab === 'sentences' && (
            <div>
              <div className="flex flex-wrap justify-between items-center mb-6">
                <h2 className="text-xl font-bold mb-4 md:mb-0">Sentence Practice</h2>
                <select
                  value={timeRangeFilter}
                  onChange={(e) => setTimeRangeFilter(e.target.value)}
                  className={`px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-900 border hover:bg-gray-50'}`}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {/* Add Sentence Form */}
              <div className={`p-4 mb-6 rounded-lg transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className="text-lg font-semibold mb-3">Add New Sentence</h3>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Sentence</label>
                  <textarea
                    value={newSentence}
                    onChange={(e) => setNewSentence(e.target.value)}
                    className={`w-full px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500' : 'bg-white text-gray-900 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                    placeholder="Enter sentence in any language"
                    rows={2}
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Translation</label>
                  <textarea
                    value={newSentenceTranslation}
                    onChange={(e) => setNewSentenceTranslation(e.target.value)}
                    className={`w-full px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500' : 'bg-white text-gray-900 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                    placeholder="Enter translation (leave empty for auto-translate)"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddSentence}
                    disabled={!newSentence}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Sentence
                  </button>
                </div>
              </div>

              {/* Sentences List */}
              <div className="space-y-4">
                {filteredSentences().length > 0 ? (
                  filteredSentences().map(sentence => (
                    <div 
                      key={sentence.id} 
                      className={`p-4 rounded-lg shadow transition-all hover:shadow-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} cursor-pointer`}
                      onClick={() => setSelectedSentence(sentence)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-lg mb-2 font-medium">{sentence.text}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {sentence.translation}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSentenceFavorite(sentence.id);
                          }}
                          className={`text-xl ml-2 transition-colors ${sentence.isFavorite ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-gray-300'}`}
                          aria-label={sentence.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {sentence.isFavorite ? '★' : '☆'}
                        </button>
                      </div>
                      <div className="mt-2 text-right">
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(sentence.dateAdded).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchQuery ? 'No sentences match your search.' : 'No sentences found. Add some sentences to get started!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Flashcards Tab */}
          {activeTab === 'flashcards' && (
            <div>
              <div className="flex flex-wrap justify-between items-center mb-6">
                <h2 className="text-xl font-bold mb-4 md:mb-0">Flashcard Review</h2>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={timeRangeFilter}
                    onChange={(e) => setTimeRangeFilter(e.target.value)}
                    className={`px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-900 border hover:bg-gray-50'}`}
                  >
                    <option value="all">All Words</option>
                    <option value="today">Today's Words</option>
                    <option value="week">This Week's Words</option>
                    <option value="month">This Month's Words</option>
                  </select>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className={`px-3 py-2 rounded transition-colors ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-900 border hover:bg-gray-50'}`}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <button
                    onClick={shuffleFlashcards}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Shuffle
                  </button>
                </div>
              </div>

              {wordsForReview().length > 0 ? (
                <div className="flex flex-col items-center">
                  {/* Flashcard */}
                  <div 
                    className={`w-full max-w-md h-64 mb-8 perspective-1000 cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                      {/* Front of card */}
                      <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-xl flex flex-col items-center justify-center p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} border-4 ${darkMode ? 'border-blue-600' : 'border-blue-500'}`}>
                        <h3 className="text-2xl font-bold mb-4 text-center">
                          {wordsForReview()[flashcardIndex].text}
                        </h3>
                        {wordsForReview()[flashcardIndex].imageUrl && (
                          <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden">
                            <img 
                              src={wordsForReview()[flashcardIndex].imageUrl} 
                              alt={wordsForReview()[flashcardIndex].text} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <p className="text-sm text-gray-500">Click to flip</p>
                      </div>
                      
                      {/* Back of card */}
                      <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-xl flex flex-col items-center justify-center p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} border-4 ${darkMode ? 'border-purple-600' : 'border-purple-500'}`}>
                        <div className="w-full">
                          <div className="mb-4">
                            <h4 className="font-semibold text-center mb-1">Meaning:</h4>
                            <p className={`p-3 rounded text-center ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                              {wordsForReview()[flashcardIndex].meaning}
                            </p>
                          </div>
                          
                          {wordsForReview()[flashcardIndex].example && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-center mb-1">Example:</h4>
                              <p className={`p-3 rounded text-center italic ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                {wordsForReview()[flashcardIndex].example}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation and answer buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={handlePrevCard}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition flex items-center"
                    >
                      <span className="mr-1">←</span> Previous
                    </button>
                    <button
                      onClick={() => handleFlashcardAnswer(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center"
                    >
                      Don't Know
                    </button>
                    <button
                      onClick={() => handleFlashcardAnswer(true)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center"
                    >
                      Know It
                    </button>
                    <button
                      onClick={handleNextCard}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition flex items-center"
                    >
                      Next <span className="ml-1">→</span>
                    </button>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6 text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${((flashcardIndex + 1) / wordsForReview().length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="font-medium">
                      Card {flashcardIndex + 1} of {wordsForReview().length}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Reviewed {wordsForReview()[flashcardIndex].reviewCount} times
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No words available for review. Add some words first!
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Your Favorites</h2>
              
              {/* Favorite Words */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Favorite Words</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {favorites().words.length} words
                  </span>
                </div>
                {favorites().words.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites().words.map(word => (
                      <div 
                        key={word.id} 
                        className={`p-4 rounded-lg shadow transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} cursor-pointer`}
                        onClick={() => setSelectedWord(word)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold">{word.text}</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWordFavorite(word.id);
                            }}
                            className="text-xl text-yellow-400 hover:text-yellow-300 transition-colors"
                            aria-label="Remove from favorites"
                          >
                            ★
                          </button>
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                          {word.meaning}
                        </p>
                        {word.imageUrl && (
                          <div className="mt-3 rounded-lg overflow-hidden">
                            <img 
                              src={word.imageUrl} 
                              alt={word.text} 
                              className="w-full h-32 object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No favorite words yet. Click the star on any word to add it here.
                  </div>
                )}
              </div>

              {/* Favorite Sentences */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Favorite Sentences</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {favorites().sentences.length} sentences
                  </span>
                </div>
                {favorites().sentences.length > 0 ? (
                  <div className="space-y-4">
                    {favorites().sentences.map(sentence => (
                      <div 
                        key={sentence.id} 
                        className={`p-4 rounded-lg shadow transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} cursor-pointer`}
                        onClick={() => setSelectedSentence(sentence)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-lg mb-2 font-medium">{sentence.text}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {sentence.translation}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSentenceFavorite(sentence.id);
                            }}
                            className="text-xl ml-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                            aria-label="Remove from favorites"
                          >
                            ★
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No favorite sentences yet. Click the star on any sentence to add it here.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Learning Tips & Strategies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningTips.map((tip, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg shadow transition-all hover:shadow-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{index % 2 === 0 ? '💡' : '✨'}</span>
                      <p className="text-lg">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Data Management */}
        <div className={`mt-6 p-4 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}`}>
          <h2 className="text-lg font-semibold mb-3">Data Management</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center"
            >
              <span className="mr-2">💾</span> Export Data
            </button>
            <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center cursor-pointer">
              <span className="mr-2">📂</span> Import Data
              <input 
                type="file" 
                accept=".json" 
                onChange={importData}
                className="hidden"
              />
            </label>
            <div className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center`}>
              <span className="mr-2">📊</span>
              <span className="text-sm">
                {words.length} words, {sentences.length} sentences
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Word Detail Modal */}
      {selectedWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-lg shadow-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{selectedWord.text}</h3>
              <button 
                onClick={() => setSelectedWord(null)}
                className={`p-1 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Meaning:</h4>
              <p className={`p-3 rounded transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {selectedWord.meaning}
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Example:</h4>
              <p className={`p-3 rounded transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {selectedWord.example || "No example provided."}
              </p>
            </div>
            
            {selectedWord.imageUrl && (
              <div className="mb-4">
                <h4 className="font-semibold mb-1">Image:</h4>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={selectedWord.imageUrl} 
                    alt={selectedWord.text} 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${
                selectedWord.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                selectedWord.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {selectedWord.difficulty}
              </span>
              
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Added: {new Date(selectedWord.dateAdded).toLocaleDateString()}
                </span>
                {selectedWord.lastReviewed && (
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Last reviewed: {new Date(selectedWord.lastReviewed).toLocaleDateString()}
                  </span>
                )}
                <button
                  onClick={() => {
                    toggleWordFavorite(selectedWord.id);
                    setSelectedWord({ ...selectedWord, isFavorite: !selectedWord.isFavorite });
                  }}
                  className={`text-2xl transition-colors ${selectedWord.isFavorite ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-gray-300'}`}
                  aria-label={selectedWord.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {selectedWord.isFavorite ? '★' : '☆'}
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setNewWord(selectedWord.text);
                  setNewWordMeaning(selectedWord.meaning);
                  setNewWordExample(selectedWord.example);
                  setNewWordDifficulty(selectedWord.difficulty);
                  setSelectedWord(null);
                  setActiveTab('vocabulary');
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setWords(words.filter(w => w.id !== selectedWord.id));
                  setSelectedWord(null);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sentence Detail Modal */}
      {selectedSentence && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-lg shadow-xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Sentence Details</h3>
              <button 
                onClick={() => setSelectedSentence(null)}
                className={`p-1 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Original:</h4>
              <p className={`p-3 rounded transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {selectedSentence.text}
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Translation:</h4>
              <p className={`p-3 rounded transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {selectedSentence.translation}
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Added: {new Date(selectedSentence.dateAdded).toLocaleDateString()}
              </span>
              
              <button
                onClick={() => {
                  toggleSentenceFavorite(selectedSentence.id);
                  setSelectedSentence({ ...selectedSentence, isFavorite: !selectedSentence.isFavorite });
                }}
                className={`text-2xl transition-colors ${selectedSentence.isFavorite ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-gray-300'}`}
                aria-label={selectedSentence.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {selectedSentence.isFavorite ? '★' : '☆'}
              </button>
            </div>
            
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setNewSentence(selectedSentence.text);
                  setNewSentenceTranslation(selectedSentence.translation);
                  setSelectedSentence(null);
                  setActiveTab('sentences');
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSentences(sentences.filter(s => s.id !== selectedSentence.id));
                  setSelectedSentence(null);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-4 transition-colors ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <div className="container mx-auto text-center text-sm">
          <p>LinguaMaster - Your personal language learning assistant</p>
          <p className="mt-1">Built with ❤️ for language learners</p>
        </div>
      </footer>
    </div>
  );
}