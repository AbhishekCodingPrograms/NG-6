import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { User, Mail, ShieldCheck } from "lucide-react";

export const metadata = {
  title: 'Profile | NotesGallery',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Protected Route
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Premium Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl transition-all duration-500 hover:border-white/20">
          <div className="flex flex-col items-center mb-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.4)] mb-6 flex items-center justify-center bg-slate-800">
              {session?.user?.image ? (
                <img src={session.user.image} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-indigo-400" />
              )}
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
              {session?.user?.name || "Welcome Back!"}
            </h1>
            <p className="text-slate-400 mt-2 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authenticated Account
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 hover:bg-slate-900/80 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-lg text-slate-200 font-medium">{session?.user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
