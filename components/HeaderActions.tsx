'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import LoginModal from './LoginModal';

export default function HeaderActions() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex gap-2 md:gap-4 items-center flex-1 md:flex-none justify-end">
      <SearchBar />
      
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
      
      {session ? (
        <div className="hidden lg:flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full pr-4 pl-1 py-1 border border-border">
          <a href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src={session.user?.image || 'https://via.placeholder.com/40'} 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-bold">{session.user?.name || 'My Profile'}</span>
          </a>
          <button 
            onClick={() => signOut()}
            className="text-xs text-red-500 hover:text-red-700 ml-2 font-bold uppercase tracking-widest"
          >
            Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="hidden lg:block text-xs font-bold uppercase tracking-widest border border-border px-5 py-2.5 rounded-full hover:bg-foreground hover:text-background transition-all"
        >
          Sign In
        </button>
      )}
      
      <a 
        href="https://9f77f9d0.sibforms.com/serve/MUIFAPdzwyevM31Y8zodey7ZOlAiaiUJZLHeGfIjXw4oJVpRZfGr897Ynjm8i-yYX0BvT1yq3q1iWyFIXz9pFPqb-1d_nkcS5xn9Erxo5zu10TtVtrYxtXhtovE38ymJMU_lLcgFqlVM4wvpkxyZLKCnDyWuMI655bmZSBNbqN7Vq12gnIBwwFOG6VAkwi4pKrmi5paNbFNg43oC-Q=="
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block text-xs font-bold uppercase tracking-widest bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 transition-all text-center"
      >
        Subscribe
      </a>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}
