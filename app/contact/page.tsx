"use client";

import { useState } from "react";
import { Send, MessageSquare, Mail, User } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-6 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 font-medium text-sm">
            <MessageSquare className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Let's build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              something great.
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-md">
            Whether you have a question, feature request, or just want to say hi, our team is always ready to hear from you.
          </p>
          
          <div className="pt-8 flex flex-col gap-6">
            <div className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
                <Mail className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-lg">hello@notesgallery.com</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
          {submitted ? (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
              <p className="text-slate-400">We'll get back to you as soon as possible.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/5 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input 
                    type="text" 
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-slate-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input 
                    type="email" 
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-slate-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-slate-500 resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
