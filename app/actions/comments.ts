'use server';

import { createComment } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function submitCommentAction(
  postId: number, 
  name: string, 
  email: string, 
  content: string,
  pathToRevalidate: string
) {
  try {
    const success = await createComment(postId, name, email, content);
    
    if (success) {
      // Revalidate the current page so the new comment shows up immediately (if auto-approved)
      revalidatePath(pathToRevalidate);
      return { success: true, message: "Comment submitted successfully! It may be pending moderation." };
    } else {
      return { success: false, message: "Failed to submit comment. Please try again." };
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
