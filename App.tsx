
import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response || data.error || 'No response');
    } catch (err) {
      setResponse('Error connecting to backend.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-primary-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Project Bolt</h1>
      <textarea
        className="w-full max-w-xl p-4 bg-primary-700 rounded-xl mb-4"
        rows={4}
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-accent-500 hover:bg-accent-400 px-6 py-2 rounded-xl text-white font-semibold"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Ask Gemini'}
      </button>
      <div className="mt-6 w-full max-w-xl bg-primary-800 p-4 rounded-xl whitespace-pre-wrap">
        {response}
      </div>
    </div>
  );
}

export default App;
