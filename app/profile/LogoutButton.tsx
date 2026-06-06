"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:scale-105"
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
}
