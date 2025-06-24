'use client';

import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import TabSlider from '@/components/atoms/TabSlider';

// API endpoints
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const TRANSLATION_API = 'https://api.mymemory.translated.net/get';
const OPENVERSE_API = 'https://api.openverse.org/v1/images/';
const YOUTUBE_API = 'https://www.youtube.com/oembed?url=';

// Sounds
const sounds = {
    correct: new Howl({ src: ['/sounds/correct.mp3'] }),
    wrong: new Howl({ src: ['/sounds/wrong.mp3'] }),
    flip: new Howl({ src: ['/sounds/flip.mp3'] }),
    success: new Howl({ src: ['/sounds/success.mp3'] }),
};

// Learning tips in English
const learningTips = ['Repeat the word 3 times out loud to improve memory', 'Group similar words together in categories', 'Use new words in sentences to reinforce memory', 'Review words before sleeping to improve retention', 'Associate words with images or stories', 'Practice regularly using flashcards', 'Focus more on words you find difficult', 'Learn words in context, not in isolation', 'Use spaced repetition technique for long-term memory', 'Keep a notebook of new words you learn'];

// Study plan data in English
const studyPlan = {
    title: '✅ Daily Study Plan (30-45 minutes)',
    description: 'Your time is limited but your goal is clear: improve English pronunciation and listening skills. This is very achievable with just 30-45 minutes daily if you follow a smart, focused system.',
    activities: [
        { name: 'Active Listening', time: '15 min', goal: 'Improve ear training and quick comprehension' },
        { name: 'Imitation & Pronunciation', time: '10-15 min', goal: 'Improve your pronunciation and accent' },
        { name: 'Review New Words', time: '5-10 min', goal: 'Expand your active vocabulary' },
        { name: 'Voice Recording', time: '5 min', goal: 'Evaluate and improve pronunciation' },
    ],
    resources: [
        { name: 'EnglishClass101', url: 'https://www.youtube.com/user/EnglishClass101' },
        { name: 'BBC Learning English', url: 'https://www.youtube.com/user/bbclearningenglish' },
        { name: 'Speak English With Mr. Duncan', url: 'https://www.youtube.com/user/duncaninchina' },
    ],
    methods: ["Choose a simple English video (doesn't have to be a series). Most important is clear pronunciation with English subtitles.", 'Listen to a 3-5 minute segment once without subtitles.', 'Listen again with English subtitles.', 'Pause after each sentence and try to understand and repeat it clearly.'],
    shadowingTechnique: ['Play a short video or podcast.', 'Repeat each sentence immediately after the speaker, matching their speed, tone and intonation.', 'Goal: Train your mouth muscles to get used to correct English pronunciation.', 'Choose one accent (American or British) and stick with it.'],
    tools: [
        { name: 'YouGlish', use: 'Hear any word in natural pronunciation' },
        { name: 'Forvo', use: 'Real human pronunciation from native speakers' },
        { name: 'Elsa Speak', use: 'App for precise pronunciation correction' },
        { name: 'BBC 6 Minute English', use: 'Short and very useful podcast' },
    ],
    goldenTip: 'Be consistent — even 30 minutes daily for 3 months will make more difference than 5 hours in one day and then forgetting!',
};

// Reusable Button Component
const Button = ({ onClick, cn, label, disabled = false }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`${cn} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {label}
        </button>
    );
};

// Input Component
const Input2 = ({ label, type, value, onChange, placeholder, rows }) => {
    return (
        <div className='mb-4'>
            <label className='block mb-2 font-medium'>{label}</label>
            {type === 'textarea' ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' /> : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />}
        </div>
    );
};

// Select Component
const SelectDefault = ({ value, onChange, options }) => {
    return (
        <select value={value} onChange={e => onChange(e.target.value)} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

// Success Animation Component
const SuccessAnimation = ({ show }) => {
    if (!show) return null;

    return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className='animate-bounce bg-green-500 text-white p-4 rounded-full shadow-lg'>
                <svg className='w-12 h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
            </div>
        </div>
    );
};

// Add Folder Modal Component
const AddFolderModal = ({ show, onClose, onAdd, newFolder, setNewFolder }) => {
    if (!show) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='w-full max-w-md rounded-xl shadow-2xl bg-white p-6'>
                <div className='flex justify-between items-start mb-4'>
                    <h3 className='text-xl font-bold'>Add New Folder</h3>
                    <button onClick={onClose} className='p-2 rounded-full hover:bg-gray-100'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                <div className='mb-4'>
                    <Input2 label='Folder Name' type='text' value={newFolder} onChange={setNewFolder} placeholder='Enter folder name' />
                </div>

                <div className='flex justify-start space-x-4 space-x-reverse'>
                    <Button onClick={onAdd} disabled={!newFolder.trim()} cn='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' label='Add' />
                    <Button onClick={onClose} cn='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600' label='Cancel' />
                </div>
            </div>
        </div>
    );
};

// Vocabulary Tab Component
const VocabularyTab = ({ newWord, setNewWord, wordImage, setWordImage, folders, showAddFolder, setShowAddFolder, handleAddWord, handleWordChange, isLoading, showSuccess }) => {
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <span className='ml-2'>📚</span> Add New Vocabulary
            </h2>

            {/* Add Word Form */}
            <div className='p-6 mb-8 rounded-xl bg-blue-50 shadow-md'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                    <div>
                        <Input2 label='Word in English*' type='text' value={newWord.english} onChange={handleWordChange} placeholder='Enter word (e.g., apple)' />
                        {isLoading && newWord.english && (
                            <div className='mt-1 text-sm text-blue-500 flex items-center'>
                                <svg className='animate-spin h-4 w-4 ml-2' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                                Fetching details...
                            </div>
                        )}
                    </div>
                    <div>
                        <Input2 label='Translation in Arabic' type='text' value={newWord.arabic} onChange={e => setNewWord({ ...newWord, arabic: e })} placeholder='Arabic translation' />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                    <div>
                        <Input2 label='Meaning (optional)' type='text' value={newWord.meaning} onChange={e => setNewWord({ ...newWord, meaning: e })} placeholder='Enter meaning' />
                    </div>
                    <div>
                        <Input2 label='Example (optional)' type='text' value={newWord.example} onChange={e => setNewWord({ ...newWord, example: e })} placeholder='Enter example sentence' />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                    <div>
                        <label className='block mb-2 font-medium'>Folder</label>
                        <div className='flex'>
                            <SelectDefault
                                value={newWord.folder}
                                onChange={e => setNewWord({ ...newWord, folder: e })}
                                options={folders.map(folder => ({
                                    value: folder.id,
                                    label: folder.name,
                                }))}
                            />
                            <button onClick={() => setShowAddFolder(true)} className='mr-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'>
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className='block mb-2 font-medium'>Difficulty</label>
                        <div className='flex space-x-4 space-x-reverse'>
                            {['easy', 'medium', 'hard'].map(level => (
                                <label key={level} className='flex items-center'>
                                    <input type='radio' name='difficulty' checked={newWord.difficulty === level} onChange={() => setNewWord({ ...newWord, difficulty: level })} className='mr-2' />
                                    {level === 'easy' && 'Easy'}
                                    {level === 'medium' && 'Medium'}
                                    {level === 'hard' && 'Hard'}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {wordImage && (
                    <div className='mb-4 flex justify-center'>
                        <div className='w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-300'>
                            <img src={wordImage} alt='Word preview' className='w-full h-full object-cover' />
                        </div>
                    </div>
                )}

                <div className='flex justify-start'>
                    <Button
                        onClick={handleAddWord}
                        disabled={!newWord.english}
                        cn='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
                        label={
                            <>
                                <span className='ml-2'>➕</span>
                                Add Word
                            </>
                        }
                    />
                </div>
            </div>

            <SuccessAnimation show={showSuccess} />
        </div>
    );
};

// Sentences Tab Component
const SentencesTab = ({ newSentence, setNewSentence, folders, showAddFolder, setShowAddFolder, handleAddSentence, handleSentenceChange, isLoading, showSuccess }) => {
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <span className='ml-2'>✍️</span> Add New Sentences
            </h2>

            {/* Add Sentence Form */}
            <div className='p-6 mb-8 rounded-xl bg-blue-50 shadow-md'>
                <div className='mb-4'>
                    <Input2 label='Sentence*' type='textarea' value={newSentence.text} onChange={handleSentenceChange} placeholder='Enter sentence (language will be detected automatically)' rows={3} />
                    {isLoading && newSentence.text && (
                        <div className='mt-1 text-sm text-blue-500 flex items-center'>
                            <svg className='animate-spin h-4 w-4 ml-2' viewBox='0 0 24 24'>
                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                            Translating...
                        </div>
                    )}
                </div>

                <div className='mb-4'>
                    <Input2 label='Translation*' type='textarea' value={newSentence.translation} onChange={e => setNewSentence({ ...newSentence, translation: e })} placeholder='Translation' rows={3} />
                </div>

                <div className='mb-4'>
                    <label className='block mb-2 font-medium'>Folder</label>
                    <div className='flex'>
                        <SelectDefault
                            value={newSentence.folder}
                            onChange={e => setNewSentence({ ...newSentence, folder: e })}
                            options={folders.map(folder => ({
                                value: folder.id,
                                label: folder.name,
                            }))}
                        />
                        <button onClick={() => setShowAddFolder(true)} className='mr-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'>
                            +
                        </button>
                    </div>
                </div>

                <div className='flex justify-start'>
                    <Button
                        onClick={handleAddSentence}
                        disabled={!newSentence.text || !newSentence.translation}
                        cn='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
                        label={
                            <>
                                <span className='ml-2'>➕</span>
                                Add Sentence
                            </>
                        }
                    />
                </div>
            </div>

            <SuccessAnimation show={showSuccess} />
        </div>
    );
};

// Flashcards Tab Component
const FlashcardsTab = ({ flashcardWords, words, flashcardIndex, isFlipped, flashcardCount, setFlashcardCount, handleNextCard, handlePrevCard, handleFlipCard, handleFlashcardAnswer, addToFlashcards }) => {
    const getCurrentFlashcard = () => {
        if (flashcardWords.length === 0) return null;
        return words.find(word => word.id === flashcardWords[flashcardIndex]);
    };

    return (
        <div className='p-6'>
            <div className='flex flex-wrap justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold mb-4 md:mb-0 flex items-center'>
                    <span className='ml-2'>🔄</span> Learning Flashcards
                </h2>

                <div className='flex flex-wrap gap-4'>
                    <div className='flex items-center space-x-2 space-x-reverse'>
                        <SelectDefault
                            value={flashcardCount}
                            onChange={e => setFlashcardCount(e)}
                            options={[
                                { value: '10', label: '10 cards' },
                                { value: '20', label: '20 cards' },
                                { value: '50', label: '50 cards' },
                                { value: 'all', label: 'All' },
                            ]}
                        />
                        <label>Number of cards:</label>
                    </div>

                    <Button
                        onClick={() => {
                            // Add random words to flashcards
                            const randomWords = [...words].sort(() => 0.5 - Math.random()).slice(0, flashcardCount === 'all' ? words.length : parseInt(flashcardCount));
                            addToFlashcards(randomWords, 'words');
                        }}
                        cn='px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center'
                        label={
                            <>
                                <span className='ml-1'>🔀</span>
                                Generate Random Cards
                            </>
                        }
                    />
                </div>
            </div>

            {flashcardWords.length > 0 ? (
                <div className='flex flex-col items-center'>
                    {/* Flashcard */}
                    <div className={`w-full max-w-md h-96 mb-8 perspective-1000 cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`} onClick={handleFlipCard}>
                        <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                            {/* Front of card */}
                            <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-xl flex flex-col items-center justify-center p-8 bg-white border-2 border-blue-400`}>
                                <div className='absolute top-4 left-4 text-xs text-gray-500'>
                                    {flashcardIndex + 1}/{flashcardWords.length}
                                </div>

                                <h3 className='text-3xl font-bold mb-4 text-center'>{getCurrentFlashcard()?.english}</h3>

                                {getCurrentFlashcard()?.imageUrl && !isFlipped && (
                                    <div className='w-32 h-32 rounded-lg overflow-hidden mb-4'>
                                        <img src={getCurrentFlashcard()?.imageUrl} alt={getCurrentFlashcard()?.english} className='w-full h-full object-cover' />
                                    </div>
                                )}

                                <p className='text-sm text-gray-500'>Click to flip</p>
                            </div>

                            {/* Back of card */}
                            <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-xl flex flex-col items-center justify-center p-8 bg-white border-2 border-purple-400`}>
                                <div className='w-full h-full flex flex-col'>
                                    <div className='absolute top-4 left-4 text-xs text-gray-500'>
                                        {flashcardIndex + 1}/{flashcardWords.length}
                                    </div>

                                    <div className='flex-grow flex flex-col justify-center'>
                                        <h3 className='text-3xl font-bold mb-4 text-center'>{getCurrentFlashcard()?.arabic}</h3>

                                        {getCurrentFlashcard()?.meaning && (
                                            <div className='mb-4'>
                                                <h4 className='font-semibold mb-2 text-center'>Meaning:</h4>
                                                <p className='text-center text-gray-600'>{getCurrentFlashcard()?.meaning}</p>
                                            </div>
                                        )}
                                    </div>

                                    <p className='text-sm text-gray-500 mt-auto'>Click to flip</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation and answer buttons */}
                    <div className='flex flex-wrap justify-center gap-4 mb-8'>
                        <Button
                            onClick={handlePrevCard}
                            cn='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center'
                            label={
                                <>
                                    <span className='ml-1'>➡️</span>
                                    Previous
                                </>
                            }
                        />

                        <Button
                            onClick={() => handleFlashcardAnswer(false)}
                            cn='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center'
                            label={
                                <>
                                    <span className='ml-1'>❌</span>
                                    Don't Know
                                </>
                            }
                        />

                        <Button
                            onClick={() => handleFlashcardAnswer(true)}
                            cn='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center'
                            label={
                                <>
                                    <span className='ml-1'>✅</span>
                                    Know It
                                </>
                            }
                        />

                        <Button
                            onClick={handleNextCard}
                            cn='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center'
                            label={
                                <>
                                    Next
                                    <span className='mr-1'>⬅️</span>
                                </>
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className='text-center py-12 rounded-xl bg-gray-50'>
                    <svg className='w-16 h-16 mx-auto text-gray-400 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <h4 className='text-lg font-medium mb-2'>No flashcards available</h4>
                    <p className='max-w-md mx-auto text-gray-500'>Add some words to your vocabulary first or select words to practice!</p>
                </div>
            )}
        </div>
    );
};

// MyContentTab Component
const MyContentTab = ({ words, sentences, folders, selectedFolder, setSelectedFolder, toggleWordFavorite, toggleSentenceFavorite, addToFlashcards, removeFromFlashcards, flashcardWords }) => {
    const getWordsByFolder = folderId => {
        if (folderId === 'favorites') {
            return words.filter(word => word.isFavorite);
        }
        return words.filter(word => word.folder === folderId);
    };

    const getSentencesByFolder = folderId => {
        if (folderId === 'favorites') {
            return sentences.filter(sentence => sentence.isFavorite);
        }
        return sentences.filter(sentence => sentence.folder === folderId);
    };

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <span className='ml-2'>📁</span> My Content
            </h2>

            <div className='mb-6'>
                <label className='block mb-2 font-medium'>Select Folder:</label>
                <SelectDefault
                    value={selectedFolder}
                    onChange={e => setSelectedFolder(e)}
                    options={[
                        ...folders.map(folder => ({
                            value: folder.id,
                            label: folder.name,
                        })),
                        { value: 'favorites', label: 'Favorites' },
                    ]}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Words Section */}
                <div className='p-4 rounded-xl bg-white shadow-sm border border-gray-200'>
                    <h3 className='text-xl font-semibold mb-4 flex items-center'>
                        <span className='ml-2'>📚</span> Vocabulary ({getWordsByFolder(selectedFolder).length})
                    </h3>

                    {getWordsByFolder(selectedFolder).length > 0 ? (
                        <div className='space-y-3 max-h-96 overflow-y-auto'>
                            {getWordsByFolder(selectedFolder).map(word => (
                                <div key={word.id} className='p-3 rounded-lg hover:bg-gray-50 border border-gray-100 flex justify-between items-center'>
                                    <div>
                                        <p className='font-medium'>{word.english}</p>
                                        <p className='text-sm text-gray-600' dir='rtl'>
                                            {word.arabic}
                                        </p>
                                    </div>
                                    <div className='flex space-x-2 space-x-reverse'>
                                        <button onClick={() => toggleWordFavorite(word.id)} className={`text-xl ${word.isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}>
                                            {word.isFavorite ? '★' : '☆'}
                                        </button>
                                        <button onClick={() => addToFlashcards([word], 'words')} className='text-blue-500 hover:text-blue-700'>
                                            ➕
                                        </button>
                                        {flashcardWords.includes(word.id) && (
                                            <button onClick={() => removeFromFlashcards(word.id)} className='text-red-500 hover:text-red-700'>
                                                ✖
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-8 text-gray-500'>No words in this folder</div>
                    )}
                </div>

                {/* Sentences Section */}
                <div className='p-4 rounded-xl bg-white shadow-sm border border-gray-200'>
                    <h3 className='text-xl font-semibold mb-4 flex items-center'>
                        <span className='ml-2'>✍️</span> Sentences ({getSentencesByFolder(selectedFolder).length})
                    </h3>

                    {getSentencesByFolder(selectedFolder).length > 0 ? (
                        <div className='space-y-3 max-h-96 overflow-y-auto'>
                            {getSentencesByFolder(selectedFolder).map(sentence => (
                                <div key={sentence.id} className='p-3 rounded-lg hover:bg-gray-50 border border-gray-100 flex justify-between items-center'>
                                    <div>
                                        <p className='font-medium'>{sentence.text}</p>
                                        <p className='text-sm text-gray-600'>{sentence.translation}</p>
                                    </div>
                                    <div className='flex space-x-2 space-x-reverse'>
                                        <button onClick={() => toggleSentenceFavorite(sentence.id)} className={`text-xl ${sentence.isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}>
                                            {sentence.isFavorite ? '★' : '☆'}
                                        </button>
                                        <button onClick={() => addToFlashcards([sentence], 'sentences')} className='text-blue-500 hover:text-blue-700'>
                                            ➕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-8 text-gray-500'>No sentences in this folder</div>
                    )}
                </div>
            </div>
        </div>
    );
};

// LessonsTab Component
const LessonsTab = ({ lessons, newLesson, setNewLesson, handleAddLesson, handleLessonUrlChange, isLoading, showSuccess }) => {
    const lessonCategories = [
        { id: 'reading', name: 'Reading' },
        { id: 'listening', name: 'Listening' },
        { id: 'shadowing', name: 'Shadowing' },
        { id: 'speaking', name: 'Speaking' },
    ];

    const getLessonsByCategory = categoryId => {
        return lessons.filter(lesson => lesson.category === categoryId);
    };

    const toggleLessonCompletion = id => {
        setLessons(lessons.map(lesson => (lesson.id === id ? { ...lesson, completed: !lesson.completed } : lesson)));
    };

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <span className='ml-2'>🎓</span> Learning Lessons
            </h2>

            {/* Add Lesson Form */}
            <div className='p-6 mb-8 rounded-xl bg-blue-50 shadow-md'>
                <h3 className='text-lg font-semibold mb-4 flex items-center'>
                    <span className='ml-2'>➕</span> Add New Lesson
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                    <div>
                        <Input2 label='Lesson Title*' type='text' value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e })} placeholder='Enter lesson title' />
                    </div>
                    <div>
                        <Input2 label='Video URL (YouTube)*' type='url' value={newLesson.url} onChange={handleLessonUrlChange} placeholder='https://youtube.com/...' />
                        {isLoading && newLesson.url && (
                            <div className='mt-1 text-sm text-blue-500 flex items-center'>
                                <svg className='animate-spin h-4 w-4 ml-2' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                                Fetching video details...
                            </div>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                    <div>
                        <label className='block mb-2 font-medium'>Category</label>
                        <SelectDefault
                            value={newLesson.category}
                            onChange={e => setNewLesson({ ...newLesson, category: e })}
                            options={lessonCategories.map(cat => ({
                                value: cat.id,
                                label: cat.name,
                            }))}
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <Input2 label='Lesson Summary (optional)' type='textarea' value={newLesson.summary} onChange={e => setNewLesson({ ...newLesson, summary: e })} placeholder='Enter lesson summary' rows={3} />
                </div>

                {newLesson.thumbnail && (
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium'>Video Thumbnail</label>
                        <img src={newLesson.thumbnail} alt='Video thumbnail' className='w-full max-w-xs rounded-lg border border-gray-300' />
                    </div>
                )}

                <div className='flex justify-start'>
                    <Button
                        onClick={handleAddLesson}
                        disabled={!newLesson.title || !newLesson.url}
                        cn='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
                        label={
                            <>
                                <span className='ml-2'>➕</span>
                                Add Lesson
                            </>
                        }
                    />
                </div>
            </div>

            {/* Lessons by Category */}
            <div className='space-y-8'>
                {lessonCategories.map(category => {
                    const categoryLessons = getLessonsByCategory(category.id);
                    if (categoryLessons.length === 0) return null;

                    return (
                        <div key={category.id} className='p-4 rounded-xl bg-white shadow-sm border border-gray-200'>
                            <h3 className='text-xl font-semibold mb-4 flex items-center'>
                                <span className='ml-2'>
                                    {category.id === 'reading' && '📖'}
                                    {category.id === 'listening' && '🎧'}
                                    {category.id === 'shadowing' && '🗣️'}
                                    {category.id === 'speaking' && '💬'}
                                </span>
                                {category.name} ({categoryLessons.length})
                            </h3>

                            <div className='space-y-4'>
                                {categoryLessons.map(lesson => (
                                    <div key={lesson.id} className='p-4 rounded-lg hover:bg-gray-50 border border-gray-100'>
                                        <div className='flex justify-between items-start'>
                                            <div>
                                                <h4 className='text-lg font-medium flex items-center'>
                                                    <input type='checkbox' checked={lesson.completed} onChange={() => toggleLessonCompletion(lesson.id)} className='ml-2' />
                                                    {lesson.title}
                                                </h4>
                                                <a href={lesson.url} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline text-sm break-all'>
                                                    {lesson.url}
                                                </a>
                                            </div>
                                            {lesson.thumbnail && <img src={lesson.thumbnail} alt='Lesson thumbnail' className='w-20 h-12 rounded object-cover' />}
                                        </div>

                                        {lesson.summary && (
                                            <div className='mt-3 p-3 bg-gray-50 rounded-lg'>
                                                <p className='text-sm text-gray-600'>{lesson.summary}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <SuccessAnimation show={showSuccess} />
        </div>
    );
};

// TipsTab Component
const TipsTab = () => {
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <span className='ml-2'>💡</span> English Learning Tips
            </h2>

            {/* Study Plan */}
            <div className='mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 shadow-md'>
                <h3 className='text-xl font-semibold mb-2'>{studyPlan.title}</h3>
                <p className='mb-4 text-gray-600'>{studyPlan.description}</p>

                <div className='mb-6'>
                    <h4 className='text-lg font-medium mb-3'>⏱️ Smart Time Allocation:</h4>
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-blue-100'>
                                    <th className='p-3 border border-blue-200'>Activity</th>
                                    <th className='p-3 border border-blue-200'>Time</th>
                                    <th className='p-3 border border-blue-200'>Goal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studyPlan.activities.map((activity, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className='p-3 border border-blue-200 font-medium'>{activity.name}</td>
                                        <td className='p-3 border border-blue-200'>{activity.time}</td>
                                        <td className='p-3 border border-blue-200'>{activity.goal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='mb-6'>
                    <h4 className='text-lg font-medium mb-2'>🎧 1. Active Listening (15 minutes)</h4>
                    <p className='mb-2'>What to do:</p>
                    <ul className='list-disc pl-5 mb-4 space-y-1'>
                        {studyPlan.methods.map((method, i) => (
                            <li key={i}>{method}</li>
                        ))}
                    </ul>
                    <p className='mb-2'>Best resources:</p>
                    <ul className='space-y-2'>
                        {studyPlan.resources.map((resource, i) => (
                            <li key={i}>
                                <a href={resource.url} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
                                    {resource.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='mb-6'>
                    <h4 className='text-lg font-medium mb-2'>🗣️ 2. Imitation & Pronunciation (10-15 minutes)</h4>
                    <p className='mb-2'>Exercise Name: Shadowing Technique</p>
                    <ul className='list-disc pl-5 space-y-1'>
                        {studyPlan.shadowingTechnique.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ul>
                </div>

                <div className='mb-6'>
                    <h4 className='text-lg font-medium mb-2'>📚 3. Review New Words (5-10 minutes)</h4>
                    <p>Learn 3-5 new words daily, focusing on correct pronunciation.</p>
                    <p className='mt-1'>
                        <strong>Important:</strong> Don't just memorize the word, memorize a complete sentence containing it.
                    </p>
                </div>

                <div className='mb-6'>
                    <h4 className='text-lg font-medium mb-2'>🎙️ 4. Voice Recording (5 minutes)</h4>
                    <p>Choose a short passage (from a video or lesson).</p>
                    <p>Read it aloud and record yourself.</p>
                    <p>Listen to your recording and compare with the original source.</p>
                    <p>You'll notice the difference day by day.</p>
                </div>

                <div className='mb-4'>
                    <h4 className='text-lg font-medium mb-2'>Tools That Will Help You:</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {studyPlan.tools.map((tool, i) => (
                            <div key={i} className='p-3 bg-white rounded-lg border border-gray-200'>
                                <p className='font-medium'>{tool.name}</p>
                                <p className='text-sm text-gray-600'>{tool.use}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400'>
                    <h4 className='text-lg font-medium mb-2'>💡 Golden Tip:</h4>
                    <p>{studyPlan.goldenTip}</p>
                </div>
            </div>

            {/* Learning Tips */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {learningTips.map((tip, index) => (
                    <div key={index} className='p-6 rounded-xl transition-all duration-300 hover:shadow-lg bg-white hover:bg-gray-50 border border-gray-200'>
                        <div className='flex items-start'>
                            <div className='flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600 ml-4'>
                                <span className='text-2xl'>💡</span>
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold mb-2'>Tip #{index + 1}</h3>
                                <p className='text-gray-600'>{tip}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Advice */}
            <div className='p-6 rounded-xl bg-green-50'>
                <h3 className='text-xl font-semibold mb-4 flex items-center'>
                    <span className='ml-2'>ℹ️</span> Additional Advice
                </h3>
                <ul className='space-y-4 text-gray-600'>
                    <li className='flex items-start'>
                        <span className='ml-2'>✅</span>
                        <span>Listen to English daily even if you don't understand every word</span>
                    </li>
                    <li className='flex items-start'>
                        <span className='ml-2'>✅</span>
                        <span>Don't be afraid of making mistakes - they're part of learning</span>
                    </li>
                    <li className='flex items-start'>
                        <span className='ml-2'>✅</span>
                        <span>Focus on learning words in context, not in isolation</span>
                    </li>
                    <li className='flex items-start'>
                        <span className='ml-2'>✅</span>
                        <span>Use spaced repetition techniques for long-term memory</span>
                    </li>
                    <li className='flex items-start'>
                        <span className='ml-2'>✅</span>
                        <span>Practice the language with native speakers or study partners</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

// DataManagement Component
const DataManagement = ({ exportData, importData, setWords, setSentences, setLessons }) => {
    return (
        <div className='mt-8 p-6 rounded-xl bg-white shadow-lg'>
            <h2 className='text-xl font-semibold mb-4 flex items-center'>
                <span className='ml-2'>⚙️</span> Data Management
            </h2>

            <div className='flex flex-wrap gap-4'>
                <Button
                    onClick={exportData}
                    cn='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center'
                    label={
                        <>
                            <span className='ml-2'>💾</span>
                            Export Data
                        </>
                    }
                />

                <label className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center cursor-pointer'>
                    <span className='ml-2'>📤</span>
                    Import Data
                    <input type='file' accept='.json' onChange={importData} className='hidden' />
                </label>

                <Button
                    onClick={() => {
                        if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
                            setWords([]);
                            setSentences([]);
                            setLessons([]);
                        }
                    }}
                    cn='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center'
                    label={
                        <>
                            <span className='ml-2'>🗑️</span>
                            Delete All Data
                        </>
                    }
                />
            </div>

            <div className='mt-4 text-sm text-gray-500'>
                <p>Export your data to a JSON file for backup or to transfer between devices.</p>
            </div>
        </div>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className='py-6 bg-gray-100 text-gray-600'>
            <div className='container mx-auto px-4 text-center'>
                <p>© {new Date().getFullYear()} English Learning System</p>
                <p className='text-sm mt-2'>Built with ❤️ to help language learners</p>
            </div>
        </footer>
    );
};

// Main App Component
export default function LanguageLearningApp() {
    // State
    const [activeTab, setActiveTab] = useState(() => {
        // Get active tab from localStorage if available
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeTab') || 'vocabulary';
        }
        return 'vocabulary';
    });
    const [words, setWords] = useState([]);
    const [sentences, setSentences] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [folders, setFolders] = useState([
        { id: 'default', name: 'General' },
        { id: 'difficult', name: 'Difficult' },
        { id: 'favorites', name: 'Favorites' },
    ]);
    const [selectedFolder, setSelectedFolder] = useState('default');
    const [flashcardWords, setFlashcardWords] = useState([]);
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [wordImage, setWordImage] = useState(null);
    const [newWord, setNewWord] = useState({
        english: '',
        arabic: '',
        meaning: '',
        example: '',
        difficulty: 'easy',
        folder: 'default',
    });
    const [newSentence, setNewSentence] = useState({
        text: '',
        translation: '',
        language: 'en',
        folder: 'default',
    });
    const [newLesson, setNewLesson] = useState({
        title: '',
        url: '',
        category: 'reading',
        summary: '',
        thumbnail: '',
    });
    const [newFolder, setNewFolder] = useState('');
    const [showAddFolder, setShowAddFolder] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [flashcardCount, setFlashcardCount] = useState(10);
    const [flashcardCorrectCounts, setFlashcardCorrectCounts] = useState({});

    // Tabs
    const tabs = [
        { id: 'vocabulary', name: 'Vocabulary', icon: '📚' },
        { id: 'sentences', name: 'Sentences', icon: '✍️' },
        { id: 'flashcards', name: 'Flashcards', icon: '🔄' },
        { id: 'my-content', name: 'My Content', icon: '📁' },
        { id: 'lessons', name: 'Lessons', icon: '🎓' },
        { id: 'tips', name: 'Tips', icon: '💡' },
    ];


    // Initialize data from localStorage
    useEffect(() => {
        const storedWords = localStorage.getItem('words');
        const storedSentences = localStorage.getItem('sentences');
        const storedLessons = localStorage.getItem('lessons');
        const storedFolders = localStorage.getItem('folders');
        const storedFlashcardCounts = localStorage.getItem('flashcardCounts');

        if (storedWords) setWords(JSON.parse(storedWords));
        if (storedSentences) setSentences(JSON.parse(storedSentences));
        if (storedLessons) setLessons(JSON.parse(storedLessons));
        if (storedFolders) setFolders(JSON.parse(storedFolders));
        if (storedFlashcardCounts) setFlashcardCorrectCounts(JSON.parse(storedFlashcardCounts));
    }, []);

    // Save data to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('sentences', JSON.stringify(sentences));
        localStorage.setItem('lessons', JSON.stringify(lessons));
        localStorage.setItem('folders', JSON.stringify(folders));
        localStorage.setItem('flashcardCounts', JSON.stringify(flashcardCorrectCounts));
        localStorage.setItem('activeTab', activeTab);
    }, [words, sentences, lessons, folders, flashcardCorrectCounts, activeTab]);

    // Fetch word details from dictionary API
    const fetchWordDetails = async word => {
        try {
            setIsLoading(true);
            const response = await fetch(`${DICTIONARY_API}${word}`);
            const data = await response.json();

            if (data && data[0]) {
                const firstMeaning = data[0].meanings[0]?.definitions[0]?.definition || '';
                const example = data[0].meanings[0]?.definitions[0]?.example || '';
                const translation = await translateText(word, 'en', 'ar');

                setNewWord(prev => ({
                    ...prev,
                    meaning: firstMeaning,
                    example: example,
                    arabic: translation,
                }));

                // Fetch image from Openverse
                const imageUrl = await fetchWordImage(word);
                setWordImage(imageUrl);
            }
        } catch (error) {
            console.error('Error fetching word details:', error);
            setNewWord(prev => ({
                ...prev,
                meaning: '',
                example: '',
                arabic: '',
            }));
            setWordImage(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch word image from Openverse
    const fetchWordImage = async word => {
        try {
            const response = await fetch(`${OPENVERSE_API}?q=${word}`);
            const data = await response.json();
            return data.results[0]?.url || null;
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    };

    // Fetch YouTube video details
    const fetchYouTubeDetails = async url => {
        try {
            const response = await fetch(`${YOUTUBE_API}${encodeURIComponent(url)}&format=json`);
            const data = await response.json();
            return {
                title: data.title,
                thumbnail: data.thumbnail_url,
            };
        } catch (error) {
            console.error('Error fetching YouTube details:', error);
            return {
                title: '',
                thumbnail: '',
            };
        }
    };

    // Translate text
    const translateText = async (text, fromLang, toLang) => {
        try {
            const response = await fetch(`${TRANSLATION_API}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
            const data = await response.json();
            return data.responseData?.translatedText || '';
        } catch (error) {
            console.error('Error translating:', error);
            return '';
        }
    };

    // Detect language
    const detectLanguage = text => {
        // Simple detection based on Arabic characters
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text) ? 'ar' : 'en';
    };

    // Handle word input change
    const handleWordChange = async e => {
        const word = e;
        setNewWord(prev => ({ ...prev, english: word }));

        if (word.length > 2) {
            await fetchWordDetails(word);
        }
    };

    // Handle sentence input change
    const handleSentenceChange = async e => {
        const sentence = e;
        const detectedLang = detectLanguage(sentence);

        setNewSentence(prev => ({
            ...prev,
            text: sentence,
            language: detectedLang,
        }));

        if (sentence.length > 3) {
            const translation = await translateText(sentence, detectedLang, detectedLang === 'en' ? 'ar' : 'en');
            setNewSentence(prev => ({ ...prev, translation }));
        }
    };

    // Handle lesson URL change
    const handleLessonUrlChange = async url => {
        setNewLesson(prev => ({ ...prev, url }));

        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            try {
                setIsLoading(true);
                const { title, thumbnail } = await fetchYouTubeDetails(url);
                setNewLesson(prev => ({
                    ...prev,
                    title: title || prev.title,
                    thumbnail,
                }));
            } catch (error) {
                console.error('Error fetching YouTube details:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Add a new word
    const handleAddWord = async () => {
        if (!newWord.english) return;

        const word = {
            id: Date.now().toString(),
            english: newWord.english.trim(),
            arabic: newWord.arabic.trim(),
            meaning: newWord.meaning.trim(),
            example: newWord.example.trim(),
            difficulty: newWord.difficulty,
            imageUrl: wordImage || null,
            folder: newWord.folder,
            dateAdded: new Date().toISOString(),
            isFavorite: false,
            reviewCount: 0,
            lastReviewed: null,
        };

        setWords([...words, word]);

        // Reset form
        setNewWord({
            english: '',
            arabic: '',
            meaning: '',
            example: '',
            difficulty: 'easy',
            folder: 'default',
        });
        setWordImage(null);

        // Show success animation
        setShowSuccess(true);
        sounds.success.play();
        setTimeout(() => setShowSuccess(false), 2000);
    };

    // Add a new sentence
    const handleAddSentence = async () => {
        if (!newSentence.text || !newSentence.translation) return;

        const sentence = {
            id: Date.now().toString(),
            text: newSentence.text.trim(),
            translation: newSentence.translation.trim(),
            language: newSentence.language,
            folder: newSentence.folder,
            dateAdded: new Date().toISOString(),
            isFavorite: false,
        };

        setSentences([...sentences, sentence]);

        // Reset form
        setNewSentence({
            text: '',
            translation: '',
            language: 'en',
            folder: 'default',
        });

        // Show success animation
        setShowSuccess(true);
        sounds.success.play();
        setTimeout(() => setShowSuccess(false), 2000);
    };

    // Add a new lesson
    const handleAddLesson = () => {
        if (!newLesson.title || !newLesson.url) return;

        const lesson = {
            id: Date.now().toString(),
            title: newLesson.title.trim(),
            url: newLesson.url.trim(),
            category: newLesson.category,
            summary: newLesson.summary.trim(),
            thumbnail: newLesson.thumbnail,
            dateAdded: new Date().toISOString(),
            completed: false,
        };

        setLessons([...lessons, lesson]);

        // Reset form
        setNewLesson({
            title: '',
            url: '',
            category: 'reading',
            summary: '',
            thumbnail: '',
        });

        // Show success animation
        setShowSuccess(true);
        sounds.success.play();
        setTimeout(() => setShowSuccess(false), 2000);
    };

    // Add a new folder
    const handleAddFolder = () => {
        if (!newFolder.trim()) return;

        const folder = {
            id: Date.now().toString(),
            name: newFolder.trim(),
        };

        setFolders([...folders, folder]);
        setNewFolder('');
        setShowAddFolder(false);
    };

    // Toggle word favorite status
    const toggleWordFavorite = id => {
        setWords(words.map(word => (word.id === id ? { ...word, isFavorite: !word.isFavorite } : word)));
    };

    // Toggle sentence favorite status
    const toggleSentenceFavorite = id => {
        setSentences(sentences.map(sentence => (sentence.id === id ? { ...sentence, isFavorite: !sentence.isFavorite } : sentence)));
    };

    // Add words to flashcards
    const addToFlashcards = (items, type) => {
        if (type === 'words') {
            setFlashcardWords([...new Set([...flashcardWords, ...items.map(w => w.id)])]);
        } else {
            // For sentences, we'll use the translation as the back of the card
            const sentenceWords = items.flatMap(s => {
                const words = s.translation.split(' ');
                return words.map(word => ({
                    id: `${s.id}-${word}`,
                    english: word,
                    arabic: word, // In a real app, we'd translate this
                    folder: s.folder,
                }));
            });
            setWords([...words, ...sentenceWords]);
            setFlashcardWords([...new Set([...flashcardWords, ...sentenceWords.map(w => w.id)])]);
        }
    };

    // Remove from flashcards
    const removeFromFlashcards = id => {
        setFlashcardWords(flashcardWords.filter(wordId => wordId !== id));
    };

    // Handle flashcard navigation
    const handleNextCard = () => {
        if (flashcardWords.length === 0) return;

        setFlashcardIndex(prevIndex => (prevIndex >= flashcardWords.length - 1 ? 0 : prevIndex + 1));
        setIsFlipped(false);
        sounds.flip.play();
    };

    const handlePrevCard = () => {
        if (flashcardWords.length === 0) return;

        setFlashcardIndex(prevIndex => (prevIndex <= 0 ? flashcardWords.length - 1 : prevIndex - 1));
        setIsFlipped(false);
        sounds.flip.play();
    };

    // Handle flashcard flip
    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
        sounds.flip.play();
    };

    // Handle flashcard answer
    const handleFlashcardAnswer = correct => {
        if (flashcardWords.length === 0) return;

        const currentWordId = flashcardWords[flashcardIndex];
        const currentWord = words.find(w => w.id === currentWordId);

        if (!currentWord) return;

        // Update word review count and last reviewed date
        setWords(
            words.map(word =>
                word.id === currentWordId
                    ? {
                          ...word,
                          reviewCount: word.reviewCount + 1,
                          lastReviewed: new Date().toISOString(),
                      }
                    : word,
            ),
        );

        // Update correct answer count
        if (correct) {
            setFlashcardCorrectCounts(prev => ({
                ...prev,
                [currentWordId]: (prev[currentWordId] || 0) + 1,
            }));
        }

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

    // Export data
    const exportData = () => {
        const data = { words, sentences, lessons, folders };
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'language-learning-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import data
    const importData = event => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            try {
                const data = JSON.parse(e.target?.result);
                if (data.words) setWords(data.words);
                if (data.sentences) setSentences(data.sentences);
                if (data.lessons) setLessons(data.lessons);
                if (data.folders) setFolders(data.folders);
                alert('Data imported successfully!');
            } catch (error) {
                console.error('Error importing data:', error);
                alert('Failed to import data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };

    // Render
    return (
        <div className='min-h-screen bg-gray-50 text-gray-900'>
            {/* Main Content */}
            <section className='container mx-auto p-4 pb-20'>
                {/* Tabs */}
                 <TabSlider width='fit-content' tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                {/* Tab Content */}
                <div className='rounded-xl shadow-xl overflow-hidden bg-white'>
                    {activeTab === 'vocabulary' && <VocabularyTab newWord={newWord} setNewWord={setNewWord} wordImage={wordImage} setWordImage={setWordImage} folders={folders} showAddFolder={showAddFolder} setShowAddFolder={setShowAddFolder} handleAddWord={handleAddWord} handleWordChange={handleWordChange} isLoading={isLoading} showSuccess={showSuccess} />}

                    {activeTab === 'sentences' && <SentencesTab newSentence={newSentence} setNewSentence={setNewSentence} folders={folders} showAddFolder={showAddFolder} setShowAddFolder={setShowAddFolder} handleAddSentence={handleAddSentence} handleSentenceChange={handleSentenceChange} isLoading={isLoading} showSuccess={showSuccess} />}

                    {activeTab === 'flashcards' && <FlashcardsTab flashcardWords={flashcardWords} words={words} flashcardIndex={flashcardIndex} isFlipped={isFlipped} flashcardCount={flashcardCount} setFlashcardCount={setFlashcardCount} handleNextCard={handleNextCard} handlePrevCard={handlePrevCard} handleFlipCard={handleFlipCard} handleFlashcardAnswer={handleFlashcardAnswer} addToFlashcards={addToFlashcards} />}

                    {activeTab === 'my-content' && <MyContentTab words={words} sentences={sentences} folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} toggleWordFavorite={toggleWordFavorite} toggleSentenceFavorite={toggleSentenceFavorite} addToFlashcards={addToFlashcards} removeFromFlashcards={removeFromFlashcards} flashcardWords={flashcardWords} />}

                    {activeTab === 'lessons' && <LessonsTab lessons={lessons} newLesson={newLesson} setNewLesson={setNewLesson} handleAddLesson={handleAddLesson} handleLessonUrlChange={handleLessonUrlChange} isLoading={isLoading} showSuccess={showSuccess} />}

                    {activeTab === 'tips' && <TipsTab />}
                </div>

                <DataManagement exportData={exportData} importData={importData} setWords={setWords} setSentences={setSentences} setLessons={setLessons} />
            </section>

            <Footer />

            <AddFolderModal show={showAddFolder} onClose={() => setShowAddFolder(false)} onAdd={handleAddFolder} newFolder={newFolder} setNewFolder={setNewFolder} />
        </div>
    );
}
