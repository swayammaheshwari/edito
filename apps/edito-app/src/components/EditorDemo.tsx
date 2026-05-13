"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Disable SSR for the collaborative editor as Yjs/ProseMirror bindings rely on browser APIs
const CollaborativeEditor = dynamic(
  () => import("edito-sdk").then((mod) => mod.CollaborativeEditor),
  { ssr: false, loading: () => <div>Loading collaborative editor...</div> }
);

export function EditorDemo() {
  const [docId, setDocId] = useState<string>("");
  const [inputDocId, setInputDocId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check URL for docId
    const params = new URLSearchParams(window.location.search);
    const urlDocId = params.get("docId");
    if (urlDocId) {
      setDocId(urlDocId);
    }

    // Generate random values on client side to avoid hydration mismatch
    setUserId(`user-${Math.floor(Math.random() * 10000)}`);
    setUserName(`Guest ${Math.floor(Math.random() * 100)}`);

    const colors = ['#f7b42c', '#fc427b', '#42a5f5', '#2ecc71', '#9b59b6'];
    setUserColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputDocId.trim()) {
      const targetDocId = inputDocId.trim();
      const params = new URLSearchParams(window.location.search);
      params.set("docId", targetDocId);
      window.history.pushState(null, '', `?${params.toString()}`);
      setDocId(targetDocId);
    }
  };

  if (!isMounted) return <div>Loading...</div>;

  if (!docId) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-sm">
        <h3 className="text-2xl font-bold mb-2">Join a Document</h3>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Enter a document ID to start collaborating. Open the same document ID in multiple tabs to test real-time collaboration.
        </p>
        <form onSubmit={handleConnect} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="text"
            placeholder="e.g. demo-doc-123"
            value={inputDocId}
            onChange={(e) => setInputDocId(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Connect
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>Document ID: <strong>{docId}</strong> (Open in multiple tabs to test)</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: userColor }}></span>
          {userName}
        </div>
      </div>
      <CollaborativeEditor
        documentId={docId}
        userId={userId}
        userName={userName}
        userColor={userColor}
      />
    </div>
  );
}
