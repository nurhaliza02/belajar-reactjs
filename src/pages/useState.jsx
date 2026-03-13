import { useState } from "react";

export default function NameInput() {
  const [name, setName] = useState("");

  return (
    <div className="p-6 max-w-md mx-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border p-2 rounded w-full"
      />

      <p className="mt-4 text-lg">Hello {name}</p>
      <button
        onClick={() => setName("")}
        className="mt-2 bg-blue-500 text-black px-4 py-2 rounded"
      >
        Clear
      </button>
    </div>
  );
}

// useState & useEffect harus dipelajari lagi apa itu..
