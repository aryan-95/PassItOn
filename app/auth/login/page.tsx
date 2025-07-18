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
    <div className="min-h-screen bg-gradient-to-br from-[#faf7ed] via-[#E0D5FA] to-[#ffe9fa] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full max-w-md"
      >
        {/* Logo with glow */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="inline-block bg-[#FFE158] p-3 rounded-full border-4 border-white shadow-lg">
            <Image
              src="/logo.png"
              alt="Startup Logo"
              width={65}
              height={65}
              className="mx-auto rounded-full"
            />
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white/90 border-2 border-[#E0D5FA] rounded-3xl shadow-2xl w-full px-8 py-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-extrabold text-[#5B3DF6] text-center flex items-center gap-2 mb-6">
            <LockKeyhole size={20} />
            Login to Your Account
          </h2>

          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Your student email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              className="w-full px-5 py-4 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] placeholder-[#a78bfa] focus:ring-2 focus:ring-[#5B3DF6] focus:outline-none shadow font-semibold text-base pr-10 transition"
            />
            <MailCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e79df]" />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-5 py-4 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] placeholder-[#a78bfa] focus:ring-2 focus:ring-pink-400 focus:outline-none shadow font-semibold text-base pr-10 transition"
            />
            <LockKeyhole size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400" />
          </div>

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            className={`w-full py-4 rounded-full font-bold shadow-lg transition-all tracking-wide flex items-center justify-center gap-2
              ${loading
                ? 'bg-[#5B3DF6]/70 cursor-not-allowed opacity-70'
                : 'bg-[#5B3DF6] hover:bg-[#6C4AB6] text-white'
              }`}
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          {status && (
            <motion.p
              className={`mt-4 text-center text-base font-semibold transition ${
                status.startsWith("✅")
                  ? "text-green-500"
                  : status.startsWith("❌")
                  ? "text-pink-500"
                  : "text-[#a78bfa]"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status}
            </motion.p>
          )}
        </motion.div>

        <p className="mt-4 text-sm text-center text-[#6C4AB6] font-medium">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push('/auth/sign-up')}
            className="text-[#5B3DF6] underline font-bold cursor-pointer hover:text-pink-500 transition"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
