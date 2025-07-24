"use client";

import { Editor } from "../components/DynamicEditor";

export default function Home() {

  const handleSave = () => {
    console.log("Save");
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8 h-screen flex flex-col justify-between">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">Real-Time Collaborative Editor</h1>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={handleSave}>
            Save
          </button>
        </div>

        <div className="flex-grow">
          <Editor />
        </div>
      </main>
    </>
  );
}