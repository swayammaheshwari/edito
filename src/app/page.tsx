
import { Editor } from "../components/DynamicEditor";

export default function Home() {

  const handleSave = () => {
    console.log("Save");
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Real-Time Collaborative Editor</h1>
        <Editor />


        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
      </main>

    </>
  );
}