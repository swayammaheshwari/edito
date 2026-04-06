import { EditoEditor } from "edito-sdk";
import type { JSX } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

export default function Home(): JSX.Element {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Try it yourself
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Experience real-time collaboration in action
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6">
          <EditoEditor />
        </div>
      </div>
    </main>
  );
}
