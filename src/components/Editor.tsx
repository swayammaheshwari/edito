"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
 
// Our <Editor> component we can reuse later
export default function Editor() {
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [userInfo, setUserInfo] = useState<{name: string, color: string} | null>(null);

  useEffect(() => {
    // Mark as client-side to avoid hydration issues
    setIsClient(true);
    
    // Generate user info only on client side
    const userId = Math.floor(Math.random() * 1000);
    const userColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    setUserInfo({
      name: `User ${userId}`,
      color: userColor,
    });

    // Create a new Y.js document
    const ydoc = new Y.Doc();
    
    // Create Hocuspocus provider
    const hocuspocusProvider = new HocuspocusProvider({
      url: 'ws://localhost:1234',
      name: 'collaborative-document', // Document name
      document: ydoc,
    });

    setDoc(ydoc);
    setProvider(hocuspocusProvider);

    // Cleanup on unmount
    return () => {
      hocuspocusProvider.destroy();
    };
  }, []);

  // Creates a new editor instance with collaboration
  const editor = useCreateBlockNote({
    collaboration: doc && provider && userInfo ? {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: userInfo,
    } : undefined,
  });
 
  // Show loading state while setting up collaboration
  if (!isClient || !doc || !provider || !userInfo) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Connecting to collaboration server...</div>
      </div>
    );
  }

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}