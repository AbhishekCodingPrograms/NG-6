import { Sparkles, Image as ImageIcon, Zap, Shield } from "lucide-react";

export const metadata = {
  title: 'About Us | NotesGallery',
  description: 'Learn more about NotesGallery and our mission.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-purple-500/30">
      
      {/* Abstract Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="fixed top-[40%] left-[30%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-32 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 font-medium text-sm mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>Discover The Future of Curation</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
            Curate Your World <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              With Elegance.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            NotesGallery is the premium destination for visual storytellers, thinkers, and creators to organize their inspiration in a seamless, distraction-free environment.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <FeatureCard 
            icon={<ImageIcon className="w-8 h-8 text-blue-400" />}
            title="Visual Excellence"
            description="Our platform is designed to make your content the hero. With edge-to-edge rendering and dynamic layouts."
            gradient="from-blue-500/10 to-transparent border-blue-500/20"
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-amber-400" />}
            title="Lightning Fast"
            description="Built on the edge. Enjoy sub-millisecond response times and instant interactions."
            gradient="from-amber-500/10 to-transparent border-amber-500/20"
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-emerald-400" />}
            title="Private & Secure"
            description="Your data belongs to you. End-to-end encryption and passwordless authentication keep you safe."
            gradient="from-emerald-500/10 to-transparent border-emerald-500/20"
          />
        </div>

        {/* Story Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 md:p-20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Mission</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                We started NotesGallery because we were tired of cluttered interfaces and distracting feeds. We wanted a place that respects your focus and elevates your ideas.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Today, we serve thousands of creators who rely on our platform to structure their thoughts and share their vision with the world, beautifully.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative">
                {/* Simulated glass placeholder since image generation failed */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-800 opacity-80"></div>
                <div className="absolute inset-0 backdrop-blur-3xl flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/10 blur-xl animate-pulse"></div>
                  <div className="absolute text-white/50 font-bold text-2xl tracking-widest uppercase">Creativity</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/30 blur-2xl rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/30 blur-2xl rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode, title: string, description: string, gradient: string }) {
  return (
    <div className={`backdrop-blur-md bg-white/[0.02] border rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.04] ${gradient}`}>
      <div className="mb-6 p-4 inline-flex rounded-2xl bg-slate-900/50 border border-white/5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-slate-100">{title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
