import Navbar from "@/components/Navbar";
import PromptForm from "@/components/PromptForm";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-6xl font-bold tracking-tight">
            AI Procurement Agent
          </h1>

          <p className="mt-6 text-lg text-zinc-400">
            Automate purchasing decisions with AI, compare products
            intelligently and complete payments seamlessly using Prava.
          </p>
        </div>

        <PromptForm />

        <div className="mt-8 flex gap-3 text-sm text-zinc-500">
          <span>OpenAI</span>
          <span>•</span>
          <span>Prava</span>
          <span>•</span>
          <span>Redis</span>
          <span>•</span>
          <span>Next.js</span>
        </div>
      </main>
    </>
  );
}
