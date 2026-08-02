import Link from "next/link";
// import { Github,AArrowDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-[#09090B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            P
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight">Procura AI</h1>

            <p className="text-xs text-zinc-500">AI Procurement Agent</p>
          </div>
        </Link>

        {/* Right */}
        <Link
          href="https://github.com/as-ga"
          target="_blank"
          className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
        >
          {/* <Github className="h-4 w-4" /> */}

          <span>GitHub</span>
        </Link>
      </div>
    </header>
  );
}
