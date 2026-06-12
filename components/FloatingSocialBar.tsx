'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Bookmark, ThumbsUp, MessageSquare, User, Sparkles, Check } from 'lucide-react';

interface FloatingSocialBarProps {
  url: string;
  title: string;
}

export default function FloatingSocialBar({ url, title }: FloatingSocialBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from local storage to keep state persistent
  useEffect(() => {
    const liked = localStorage.getItem(`liked-${url}`);
    const bookmarked = localStorage.getItem(`bookmarked-${url}`);
    if (liked) setIsLiked(true);
    if (bookmarked) setIsBookmarked(true);
  }, [url]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    if (newState) {
      localStorage.setItem(`bookmarked-${url}`, 'true');
      showToast('Article saved to your bookmarks!');
    } else {
      localStorage.removeItem(`bookmarked-${url}`);
      showToast('Article removed from bookmarks.');
    }
  };

  const handleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    if (newState) {
      localStorage.setItem(`liked-${url}`, 'true');
      showToast('You liked this article!');
    } else {
      localStorage.removeItem(`liked-${url}`);
    }
  };

  const scrollToComments = () => {
    const element = document.getElementById('comments-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast('Comments are disabled for this article.');
    }
  };

  const handleSparkle = () => {
    showToast('AI Summary feature coming soon!');
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-fade-in-up flex items-center gap-2 text-sm font-medium">
          <Check className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      <aside className="hidden xl:flex flex-col gap-4 sticky top-32 h-fit items-center w-16 flex-shrink-0 z-10 pt-4">
        {/* Top Sparkle */}
        <button 
          onClick={handleSparkle}
          className="w-10 h-10 rounded-full flex items-center justify-center text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2"
          title="Generate AI Summary"
        >
          <Sparkles className="w-6 h-6" />
        </button>

        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:scale-110 transition-all text-gray-900 dark:text-gray-100"
          title="Share this article"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Bookmark Button */}
        <button 
          onClick={handleBookmark}
          className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:scale-110 transition-all ${isBookmarked ? 'text-blue-600 ring-2 ring-blue-500' : 'text-gray-900 dark:text-gray-100'}`}
          title="Save for later"
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:scale-110 transition-all ${isLiked ? 'text-pink-600 ring-2 ring-pink-500' : 'text-gray-900 dark:text-gray-100'}`}
          title="Like this article"
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Comment Button */}
        <button 
          onClick={scrollToComments}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:scale-110 transition-all text-gray-900 dark:text-gray-100"
          title="Jump to comments"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <a 
          href="/profile"
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:scale-110 transition-all mt-2 text-gray-900 dark:text-gray-100"
          title="View your profile"
        >
          <User className="w-5 h-5" />
        </a>
      </aside>
    </>
  );
}
