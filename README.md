# Real-Time Collaborative Editor

A modern collaborative text editor built with Next.js, BlockNote, and Hocuspocus for real-time collaboration.

## Features

- **Real-time Collaboration**: Multiple users can edit the same document simultaneously
- **Modern Editor**: Built with BlockNote for a rich editing experience
- **WebSocket Connection**: Uses Hocuspocus for real-time synchronization
- **User Identification**: Each user gets a unique name and color
- **Persistent Connection**: Automatic reconnection handling

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

To run both the Hocuspocus collaboration server and the Next.js development server:

```bash
npm run dev:full
```

This will start:
- Hocuspocus server on `ws://localhost:1234`
- Next.js development server on `http://localhost:3000`

Alternatively, you can run them separately:

```bash
# Terminal 1: Start the collaboration server
npm run server

# Terminal 2: Start the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
