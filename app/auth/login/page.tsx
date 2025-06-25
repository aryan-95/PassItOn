'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setStatus('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('✅ Logged in! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setStatus(`❌ ${data.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="bg-zinc-900 p-8 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {status && <p className="mt-4 text-yellow-400 text-sm text-center">{status}</p>}
      </div>
    </div>
  );
}
