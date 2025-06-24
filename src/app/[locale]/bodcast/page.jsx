'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SelectorWithAdd from '@/components/atoms/SelectorWithAdd';

// Helpers
const getYoutubeVideoId = (url) => {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
};

const getYoutubeOEmbed = async (url) => {
  const res = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
  if (!res.ok) throw new Error('Invalid YouTube link');
  return await res.json();
};

const getTikTokVideoId = (url) => {
  const regExp = /tiktok\.com\/(?:.*\/video\/(\d+))/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
};

export default function MediaLibraryPage() {
  const [link, setLink] = useState('');
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [categories, setCategories] = useState(['All', 'medical']);

  // Load
  useEffect(() => {
    const stored = localStorage.getItem('media-library');
    if (stored) setVideos(JSON.parse(stored));
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem('media-library', JSON.stringify(videos));
  }, [videos]);

  // Add new media (YouTube or TikTok)
  const handleAdd = async (e) => {
    e.preventDefault();
    const youtubeId = getYoutubeVideoId(link);
    const tiktokId = getTikTokVideoId(link);

    if (youtubeId) {
      try {
        const data = await getYoutubeOEmbed(link);
        const newItem = {
          id: youtubeId,
          url: link,
          title: data.title,
          thumbnail: data.thumbnail_url,
          watchTime: 0,
          category: category || 'Uncategorized',
          type: 'YouTube',
        };
        setVideos([newItem, ...videos]);
        setLink('');
        setCategory('');
      } catch (err) {
        alert('Failed to fetch YouTube info.');
      }
    } else if (tiktokId) {
      const newItem = {
        id: tiktokId,
        url: link,
        title: 'TikTok Reel',
        thumbnail: '', // Optional: add default or fetch from metadata
        watchTime: 0,
        category: category || 'Uncategorized',
        type: 'TikTok',
      };
      setVideos([newItem, ...videos]);
      setLink('');
      setCategory('');
    } else {
      alert('Invalid link. Only YouTube or TikTok are supported.');
    }
  };

  const handleUpdateTime = (id) => {
    const time = prompt('Enter watch time in seconds:');
    if (time !== null && !isNaN(Number(time))) {
      setVideos(
        videos.map((v) => (v.id === id ? { ...v, watchTime: parseInt(time) } : v))
      );
    }
  };

  const allCategories = ['All', ...new Set(videos.map((v) => v.category).filter(Boolean))];
  const allTypes = ['All', 'YouTube', 'TikTok'];

  const filteredVideos = videos.filter((v) => {
    const categoryMatch = filterCategory === 'All' || v.category === filterCategory;
    const typeMatch = filterType === 'All' || v.type === filterType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-3xl font-bold mb-6'>🎥 My Media Library</h1>

      {/* Form */}
      <form onSubmit={handleAdd} className='flex flex-col sm:flex-row gap-3 mb-6'>
        <input
          type='text'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder='Paste YouTube or TikTok link...'
          className='flex-1 px-4 py-2 border border-gray-300 rounded'
        />
        <SelectorWithAdd
          cn='max-w-md w-full'
          categories={categories}
          selected={category}
          onChange={(e) => setCategory(e)}
        />
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add
        </button>
      </form>

      {/* Filters */}
      <div className='flex flex-wrap gap-4 mb-6'>
        {/* Category Filter */}
        <div className='flex gap-2 flex-wrap'>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full border ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className='flex gap-2 flex-wrap'>
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-full border ${
                filterType === type
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <AnimatePresence>
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className='bg-white shadow-md rounded p-4'
            >
              <div className='aspect-video mb-3'>
                {video.type === 'YouTube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?start=${video.watchTime}`}
                    title={video.title}
                    className='w-full h-full rounded'
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    src={video.url.replace(
                      'www.tiktok.com',
                      'www.tiktok.com/embed'
                    )}
                    title='TikTok Reel'
                    className='w-full h-full rounded'
                    allow='autoplay; encrypted-media'
                  />
                )}
              </div>

              <h2 className='text-lg font-semibold mb-1'>{video.title}</h2>
              <p className='text-sm text-gray-600 mb-1'>
                Watched: {video.watchTime || 0}s
              </p>
              <p className='text-xs text-gray-500 mb-2'>
                Category: {video.category} | Type: {video.type}
              </p>

              <div className='flex gap-2 flex-wrap'>
                {video.type === 'YouTube' && (
                  <button
                    onClick={() => handleUpdateTime(video.id)}
                    className='text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700'
                  >
                    Update Time
                  </button>
                )}
                <a
                  href={video.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                >
                  Watch
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
