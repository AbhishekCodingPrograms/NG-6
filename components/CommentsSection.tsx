'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { WPComment } from '@/lib/api';
import { submitCommentAction } from '@/app/actions/comments';

interface CommentsSectionProps {
  postId: number;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const pathname = usePathname();
  const [comments, setComments] = useState<WPComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments?postId=${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !content) {
      setSubmitMessage({ text: 'Please fill in all fields.', isError: true });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    const result = await submitCommentAction(postId, name, email, content, pathname);

    if (result.success) {
      setSubmitMessage({ text: result.message, isError: false });
      // Clear form
      setName('');
      setEmail('');
      setContent('');
      
      // Optimistically add to list (though it might be pending moderation)
      const newComment: WPComment = {
        id: Date.now(), // Temporary ID
        post: postId,
        author_name: name,
        date: new Date().toISOString(),
        content: { rendered: `<p>${content}</p>` }
      };
      setComments([...comments, newComment]);
    } else {
      setSubmitMessage({ text: result.message, isError: true });
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div id="comments-section" className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold font-serif mb-8">Discussion ({comments.length})</h3>
      
      {/* Comment Form */}
      <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-10 shadow-sm">
        <h4 className="text-lg font-bold mb-4">Leave a Reply</h4>
        {submitMessage && (
          <div className={`p-4 rounded-md mb-4 ${submitMessage.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {submitMessage.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Name *</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email *</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Comment *</label>
            <textarea
              id="content"
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="What are your thoughts?"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-gray-500 font-medium">Comments are loading...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <img 
                  src={comment.author_avatar_urls?.['48'] || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author_name)}&background=random`} 
                  alt={comment.author_name} 
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-sm">{comment.author_name}</h5>
                    <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                  </div>
                  <div 
                    className="text-sm text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No comments yet. Be the first to start the discussion!</p>
        )}
      </div>
    </div>
  );
}
