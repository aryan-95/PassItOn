'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full max-w-md"
      >
        {/* Logo with slight glow */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="/logo.png"
            alt="Startup Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 transition"
          />
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-zinc-900 p-8 rounded-xl w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className={`w-full py-3 rounded-lg transition-all font-semibold ${
              loading
                ? 'bg-blue-800 cursor-not-allowed opacity-70'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          {status && (
            <motion.p
              className="mt-4 text-yellow-400 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
