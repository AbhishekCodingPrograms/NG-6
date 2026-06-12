'use client';

import React, { useState } from 'react';
import { Bookmark, ThumbsUp, MessageSquare } from 'lucide-react';

export default function ArticleActionBar() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Optional: add a tiny count for realism
  
  const scrollToComments = () => {
    const element = document.getElementById('comments-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="flex flex-row items-center justify-between border-y border-gray-200 dark:border-gray-800 mb-8 py-1 md:py-2 bg-gray-50 dark:bg-slate-900/50 xl:hidden overflow-x-auto hide-scrollbar">
      
      {/* Follow Button */}
      <button 
        onClick={() => setIsFollowing(!isFollowing)}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-r border-gray-200 dark:border-gray-800 text-xs md:text-sm font-bold flex-1 justify-center whitespace-nowrap"
      >
        <Bookmark className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isFollowing ? 'fill-current text-blue-600' : ''}`} />
        <span className={isFollowing ? 'text-blue-600' : ''}>{isFollowing ? 'Following' : 'Follow'}</span>
      </button>

      {/* Like Button */}
      <button 
        onClick={handleLike}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-r border-gray-200 dark:border-gray-800 text-xs md:text-sm font-bold flex-1 justify-center whitespace-nowrap"
      >
        <ThumbsUp className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform ${isLiked ? 'fill-current text-pink-600 scale-110' : ''}`} />
        <span className={isLiked ? 'text-pink-600' : ''}>Like {likeCount > 0 && `(${likeCount})`}</span>
      </button>

      {/* Comment Button */}
      <button 
        onClick={scrollToComments}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-r border-gray-200 dark:border-gray-800 text-xs md:text-sm font-bold flex-1 justify-center whitespace-nowrap"
      >
        <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span>Comment</span>
      </button>

      {/* Google News Button */}
      <a 
        href="https://news.google.com/publications/CAAqBwgKMLjBqAswy5jAAw"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-xs md:text-sm font-bold flex-1 justify-center whitespace-nowrap"
      >
        <span>Add on</span>
        <div className="flex items-center">
          <span className="text-[#4285F4] font-black text-sm md:text-lg leading-none">G</span>
        </div>
      </a>
      
    </div>
  );
}
