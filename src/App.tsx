import React, { useState } from 'react';
import { Shield, Brain, Lock, Fingerprint } from 'lucide-react';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Simulate authentication - in production, this would connect to your Python backend
    if (credentials.email && credentials.password) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {!isAuthenticated ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;