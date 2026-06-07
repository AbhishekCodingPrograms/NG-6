import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | NotesGallery',
};

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl font-sans">
      <h1 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight border-b-4 border-foreground pb-4">Terms of Use</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:uppercase prose-a:text-primary">
        <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using NotesGallery ("the Website"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our website.</p>

        <h2>2. Content and Intellectual Property</h2>
        <p>All content on NotesGallery, including articles, text, graphics, logos, and images, is the property of NotesGallery or its content creators and is protected by intellectual property laws. You may not reproduce, distribute, or modify our content without explicit permission.</p>

        <h2>3. User Conduct</h2>
        <p>When using our platform or leaving comments, you agree not to post any content that is unlawful, defamatory, abusive, or obscene. We reserve the right to remove any content that violates these guidelines and to terminate accounts.</p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>The information provided on NotesGallery is for general informational purposes only. We make no representations or warranties of any kind regarding the accuracy, reliability, or completeness of any information on the site.</p>

        <h2>5. Limitation of Liability</h2>
        <p>NotesGallery shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of or inability to use the website.</p>

        <h2>6. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.</p>

        <p className="mt-8 font-bold italic">If you have any questions about these Terms, please contact us.</p>
      </div>
    </div>
  );
}
