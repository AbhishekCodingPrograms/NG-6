import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | NotesGallery',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl font-sans">
      <h1 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight border-b-4 border-foreground pb-4">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:uppercase prose-a:text-primary">
        <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>At NotesGallery, we respect your privacy. We may collect personal information such as your name and email address when you create an account, subscribe to our newsletter, or leave a comment. We also collect non-personal data through cookies and analytics tools to improve user experience.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and maintain our website</li>
          <li>Send you updates, newsletters, and promotional content</li>
          <li>Respond to your comments and inquiries</li>
          <li>Analyze website traffic and optimize our content</li>
        </ul>

        <h2>3. Cookies and Tracking</h2>
        <p>We use cookies and similar tracking technologies to track activity on our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our website may not function properly.</p>

        <h2>4. Third-Party Services and Advertisements</h2>
        <p>We may use third-party advertising companies (such as Google AdSense) to serve ads when you visit our website. These companies may use aggregated information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>

        <h2>5. Data Security</h2>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, update, or delete the personal information we have on you. If you wish to exercise these rights, please contact us.</p>

        <p className="mt-8 font-bold italic">If you have any questions about this Privacy Policy, please contact us.</p>
      </div>
    </div>
  );
}
