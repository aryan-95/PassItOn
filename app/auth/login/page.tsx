'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LockKeyhole, MailCheck, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#faf7ed] via-[#E0D5FA] to-[#ffe9fa]">
      <motion.div
        className="w-full max-w-md bg-white/90 border border-[#6C4AB6]/10 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col items-center"
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        {/* Logo/avatar */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-[#FFE158] p-3 rounded-full shadow-lg border-4 border-white">
            <Image
              src="/logo2.jpeg"
              alt="Site Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </span>
        </motion.div>

        <h2 className="text-2xl font-extrabold text-[#5B3DF6] mb-2 tracking-wide text-center flex gap-2 items-center">
          <LockKeyhole size={20} />
          Login to Your Account
        </h2>

        <div className="w-full mb-3">
          <div className="relative">
            <input
              type="email"
              placeholder="Your student email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              className="w-full px-5 py-4 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-[#5B3DF6] focus:outline-none text-base shadow placeholder-[#a78bfa] font-semibold transition pr-10"
            />
            <MailCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e79df]" />
          </div>
        </div>
        <div className="w-full mb-3">
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-5 py-4 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-pink-400 focus:outline-none text-base shadow placeholder-[#a78bfa] font-semibold transition pr-10"
            />
            <LockKeyhole size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400" />
          </div>
        </div>

        <motion.button
          onClick={handleLogin}
          disabled={loading}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 mt-1 rounded-full font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 bg-[#5B3DF6] hover:bg-[#6C4AB6] text-white disabled:opacity-60"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>

        {status && (
          <motion.p
            className={`
              mt-5 mb-2 text-center text-base font-semibold transition
              ${
                status.startsWith('✅')
                  ? "text-green-500"
                  : status.startsWith('❌')
                  ? "text-pink-500"
                  : "text-[#a78bfa]"
              }
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {status}
          </motion.p>
        )}

        <p className="mt-6 text-sm text-center text-[#5B3DF6] hover:underline font-medium cursor-pointer"
          onClick={() => router.push('/auth')}
        >
          Don&apos;t have an account? <span className="underline">Sign up</span>
        </p>
      </motion.div>
    </div>
  );
}
