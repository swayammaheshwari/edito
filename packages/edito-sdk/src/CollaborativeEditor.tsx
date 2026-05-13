import React, { useEffect, useState, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';

export interface CollaborativeEditorProps {
  documentId: string;
  userId?: string;
  userName?: string;
  userColor?: string;
}

const InnerEditor: React.FC<{
  provider: HocuspocusProvider;
  ydoc: Y.Doc;
  userName: string;
  userColor: string;
}> = ({ provider, ydoc, userName, userColor }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      // @ts-ignore
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: userName,
          color: userColor,
        },
      }),
    ],
  });

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', minHeight: '300px' }}>
      <EditorContent editor={editor} />
    </div>
  );
};

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  documentId,
  userId = 'anonymous',
  userName = 'Anonymous User',
  userColor = '#f7b42c',
}) => {
  const [status, setStatus] = useState<string>('connecting');
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);

  const ydoc = useMemo(() => new Y.Doc(), []);

  useEffect(() => {
    // Explicitly use the ws:// or wss:// protocol
    const url = typeof window !== 'undefined' && window.location.protocol === 'https:'
      ? `wss://localhost:4000?userId=${userId}`
      : `ws://localhost:4000?userId=${userId}`;

    const newProvider = new HocuspocusProvider({
      url,
      name: documentId,
      document: ydoc,
      onStatus: ({ status }) => {
        setStatus(status);
      },
    });

    setProvider(newProvider);

    return () => {
      newProvider.destroy();
    };
  }, [documentId, userId, ydoc]);

  if (!provider) {
    return <div>Initializing provider...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 10, fontSize: 12, color: status === 'connected' ? 'green' : 'orange' }}>
        Connection Status: {status}
      </div>
      <InnerEditor provider={provider} ydoc={ydoc} userName={userName} userColor={userColor} />
    </div>
  );
};
