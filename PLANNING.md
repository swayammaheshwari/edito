You are a senior full-stack architect and developer. Your task is to create a production-ready monorepo project called **Edito**, a real-time collaborative editor platform.

---

# 🚀 Project Goal

Build a SaaS-style real-time collaborative editor system similar to Notion/Google Docs, but designed as an embeddable SDK for other applications.

The system must support:

* Real-time collaboration
* Multi-user editing
* Workspace + document abstraction
* SDK-based integration

---

# 🧠 Architecture Overview

We are using a **monorepo architecture** with three main parts:

```
edito/
  apps/
    edito-server      → backend (real-time engine)
    edito-app         → Next.js playground/demo
  packages/
    edito-sdk         → React SDK (main product)
```

---

# 🧩 Tech Stack

## Core Technologies

* Node.js (backend)
* React (frontend SDK)
* TypeScript (everywhere)
* MongoDB (database)

## Real-time Collaboration

* Yjs (CRDT engine)
* Hocuspocus (WebSocket server for Yjs)

## Editor

* BlockNote (rich text editor)

## Build Tools

* pnpm (workspace management)
* Turborepo (optional but recommended)
* Vite (for SDK build)

---

# 🏗️ Core Concepts

## 1. Workspace & Document Model

Hierarchy:

```
Workspace → Documents → Editor
```

* Each workspace can have multiple documents
* Each document is uniquely identified by:

  * workspaceId (string)
  * docId (string, provided by client)

---

## 2. Database Design (MongoDB)

Collection: documents

Schema:

```
{
  _id: ObjectId,
  workspaceId: string,
  docId: string,
  ydoc: Buffer, // Yjs binary state
  createdAt: Date,
  updatedAt: Date
}
```

IMPORTANT:

* Add a unique compound index on:
  `{ workspaceId: 1, docId: 1 }`

---

## 3. Real-time Sync Strategy

* Use Yjs for CRDT-based state management
* Use Hocuspocus server for WebSocket sync

Document identification inside Hocuspocus:

```
documentName = `${workspaceId}:${docId}`
```

---

# ⚡ Backend: edito-server

Create a Node.js server using Hocuspocus.

Responsibilities:

* Handle WebSocket connections
* Load document from MongoDB
* Store document updates in MongoDB
* Auto-create document if not found

### Required Features

Implement:

* `onLoadDocument`
* `onStoreDocument`

Behavior:

* On load:

  * Fetch document using workspaceId + docId
  * If found → load Yjs state
  * If not → create new Y.Doc()

* On store:

  * Save Yjs state as binary (Buffer)
  * Use upsert

Also:

* Setup MongoDB connection
* Use environment variables

---

# 📦 SDK: edito-sdk

Build a React component SDK.

### Export:

```
<EditoEditor
  workspaceId="ws-123"
  docId="doc-456"
  user={{ name: "Swayam" }}
/>
```

### Responsibilities:

* Initialize Yjs document
* Connect to Hocuspocus server
* Bind Yjs to BlockNote editor
* Setup awareness (user presence)

### Features:

* Real-time collaboration
* Cursor presence (via awareness)
* Accept user info from parent app

### Internal Structure:

```
src/
  components/
    EditoEditor.tsx
  lib/
    yjs.ts
    provider.ts
  index.ts
```

---

# 🎨 Playground App: edito-app

Create a Next.js app to test the SDK.

### Responsibilities:

* Install and use edito-sdk
* Render the editor
* Simulate real usage

Example usage:

```
<EditoEditor
  workspaceId="ws-1"
  docId="doc-1"
  user={{ name: "Test User" }}
/>
```

---

# 🔄 Data Flow

```
User types → BlockNote → Yjs → Hocuspocus → MongoDB
                                 ↓
                          Other users sync
```

---

# ⚠️ Constraints

* No authentication in V1
* No permissions system
* No version history
* Focus ONLY on core collaboration

---

# 🎯 Deliverables

1. Full monorepo setup with pnpm
2. Working Hocuspocus server with MongoDB
3. SDK package that connects to server
4. Next.js playground using SDK
5. Real-time editing working between multiple clients

---

# 🔥 Bonus (if possible)

* Awareness (cursor + username)
* Clean TypeScript types
* Proper folder structure
* Environment config

---

# 🧪 Expected Outcome

* Run server
* Run Next.js app
* Open same doc in 2 tabs
* See real-time collaboration working

---

Generate the complete project setup with code, configs, and instructions to run locally.
