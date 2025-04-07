import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, Mic, Settings } from 'lucide-react';
import AIFace from './AIFace';

function App() {
  const [message, setMessage] = useState('');
  const [aiExpression, setAiExpression] = useState<'neutral' | 'happy' | 'thinking'>('neutral');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setAiExpression('thinking');
      // Simulate AI processing
      setTimeout(() => {
        setAiExpression('happy');
        setTimeout(() => {
          setAiExpression('neutral');
          setMessage('');
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 bg-opacity-50 border-b border-blue-500/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">EclipseTwin</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Settings className="h-6 w-6 text-blue-300" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 flex flex-col items-center justify-center space-y-8">
        <div className="w-96 h-96 relative bg-gray-800/50 rounded-full p-8 shadow-2xl border border-blue-500/20">
          <AIFace expression={aiExpression} />
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button type="button" className="p-2 text-blue-300 hover:text-blue-400 transition-colors">
                <Mic className="h-5 w-5" />
              </button>
              <button type="submit" className="p-2 text-blue-300 hover:text-blue-400 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;