import React, { useState } from 'react';
import { Shield, Lock, Fingerprint } from 'lucide-react';
import BiometricScanner from './BiometricScanner';

interface AuthPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showBiometric, setShowBiometric] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleBiometricComplete = (success: boolean) => {
    if (success) {
      onLogin({ email: 'biometric@user.com', password: 'biometric' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-50 p-8 rounded-2xl backdrop-blur-lg border border-blue-500/20 shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">EclipseTwin</h2>
          <p className="text-blue-200">Your Privacy-First AI Avatar</p>
        </div>

        {!showBiometric ? (
          <>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>

            <div 
              className="flex items-center justify-center space-x-2 text-sm text-blue-200 cursor-pointer hover:text-blue-100"
              onClick={() => setShowBiometric(true)}
            >
              <Fingerprint className="h-4 w-4" />
              <span>Use Biometric Authentication</span>
            </div>
          </>
        ) : (
          <BiometricScanner onScanComplete={handleBiometricComplete} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;