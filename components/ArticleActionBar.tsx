'use client';

import React, { useState } from 'react';
import { Bookmark, ThumbsUp, MessageSquare } from 'lucide-react';

export default function ArticleActionBar() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const scrollToComments = () => {
    const element = document.getElementById('comments-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between md:justify-start gap-0 border-y border-gray-200 dark:border-gray-800 mb-8 py-2 md:py-3 bg-gray-50 dark:bg-slate-900/50 xl:hidden">
      
      {/* Follow Button */}
      <button 
        onClick={() => setIsFollowing(!isFollowing)}
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-r border-gray-200 dark:border-gray-800 text-sm font-bold flex-1 md:flex-none justify-center"
      >
        <Bookmark className={`w-4 h-4 ${isFollowing ? 'fill-current text-blue-600' : ''}`} />
        <span className={isFollowing ? 'text-blue-600' : ''}>{isFollowing ? 'Following' : 'Follow'}</span>
      </button>

      {/* Like Button */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-r border-gray-200 dark:border-gray-800 text-sm font-bold flex-1 md:flex-none justify-center"
      >
        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current text-pink-600' : ''}`} />
        <span className={isLiked ? 'text-pink-600' : ''}>Like</span>
      </button>

      {/* Comment Button */}
      <button 
        onClick={scrollToComments}
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors md:border-r border-gray-200 dark:border-gray-800 text-sm font-bold flex-1 md:flex-none justify-center"
      >
        <MessageSquare className="w-4 h-4" />
        <span>1</span>
      </button>

      {/* Google News Button */}
      <a 
        href="#"
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm font-bold w-full md:w-auto justify-center mt-2 md:mt-0 border-t md:border-t-0 border-gray-200 dark:border-gray-800"
      >
        <span>Add us on</span>
        {/* Simple inline Google colored G logo */}
        <div className="flex -space-x-0.5">
          <span className="text-[#4285F4] font-black text-lg leading-none">G</span>
        </div>
      </a>
      
    </div>
  );
}
