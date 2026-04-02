# 🚀 Edito

**Edito** is a real-time collaborative editor platform designed to be embedded into any application.
Think of it as a plug-and-play collaboration layer — like Google Docs or Notion — but built for developers.

---

# 🧠 What is Edito?

Edito allows developers to add **real-time collaborative editing** to their apps using a simple React SDK.

It provides:

* ⚡ Real-time multi-user editing
* 🧩 Embeddable editor component
* 🧠 CRDT-based sync (conflict-free)
* 💾 Persistent document storage

---

# 🏗️ Architecture

Edito is built using a **monorepo architecture**:

```
edito/
  apps/
    edito-server      # Real-time backend (Hocuspocus + MongoDB)
    edito-app         # Next.js playground/demo app
  packages/
    edito-sdk         # React SDK (main product)
```

---

# ⚙️ Tech Stack

### Core

* Node.js
* React
* TypeScript
* MongoDB

### Real-time Collaboration

* Yjs (CRDT engine)
* Hocuspocus (WebSocket server)

### Editor

* BlockNote (rich text editor)

### Tooling

* pnpm (workspace management)
* Vite (SDK build)
* Next.js (playground app)

---

# 🧩 Core Concepts

## Workspace → Documents → Editor

* A **workspace** contains multiple documents
* Each document is identified by:

  * `workspaceId`
  * `docId` (provided by the client)

---

# 💾 Database Design

### Collection: `documents`

```
{
  _id: ObjectId,
  workspaceId: string,
  docId: string,
  ydoc: Buffer, // Yjs binary
  createdAt: Date,
  updatedAt: Date
}
```

### Important

* Unique index on:

```
{ workspaceId: 1, docId: 1 }
```

---

# ⚡ Real-time Flow

```
User types → BlockNote → Yjs → Hocuspocus → MongoDB
                                 ↓
                          Other users sync
```

---

# 📦 SDK Usage

Install the SDK (future):

```bash
npm install edito-sdk
```

### Example

```jsx
import { EditoEditor } from "edito-sdk";

export default function App() {
  return (
    <EditoEditor
      workspaceId="ws-1"
      docId="doc-1"
      user={{ name: "Swayam" }}
    />
  );
}
```

---

# ⚡ Features (MVP)

* ✅ Real-time collaboration
* ✅ Multi-user editing
* ✅ Cursor presence (awareness)
* ✅ MongoDB persistence
* ✅ Embeddable React SDK

---

# ❌ Not Included (Yet)

* Authentication (JWT planned in V2)
* Permissions & roles
* Version history
* Comments

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
pnpm install
```

---

## 2. Start backend server

```bash
cd apps/edito-server
pnpm dev
```

---

## 3. Start playground app

```bash
cd apps/edito-app
pnpm dev
```

---

## 4. Open in browser

```
http://localhost:3000
```

Open the same document in multiple tabs to test real-time collaboration.

---

# 🔧 Environment Variables

Create a `.env` file in `apps/edito-server`:

```
MONGO_URL=your_mongodb_connection_string
PORT=1234
```

---

# 🧠 How It Works

* The SDK connects to the Hocuspocus WebSocket server
* Documents are identified using:

```
workspaceId + docId
```

* Yjs handles conflict-free updates
* Document state is stored as binary in MongoDB

---

# 🎯 Vision

Edito aims to become:

> “The collaboration layer for the internet”

A developer-first platform where any app can enable real-time editing with minimal effort.

---

# 🤝 Contributing

Contributions, ideas, and improvements are welcome!

---

# 📜 License

MIT License
