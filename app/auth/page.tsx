'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from "@emailjs/browser";
import Image from 'next/image';

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<'signup' | 'verify'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    setStatus('');

    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            to_email: email,
            otp: data.otp,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        setStatus('✅ OTP sent to your email');
        setStep('verify');
      } catch (err) {
        console.error('EmailJS send error:', err);
        setStatus('❌ Failed to send OTP email');
      }
    } else {
      setStatus(`❌ ${data.error}`);
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setStatus('');

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, password, otp }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('✅ Verified! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setStatus(`❌ ${data.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex-col text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full max-w-md"
      >
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

        <motion.div
          className="bg-zinc-900 p-8 rounded-xl w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {step === 'signup' ? 'Sign Up with OTP' : 'Enter OTP'}
          </h2>

          <input
            type="email"
            placeholder="Email (must be @kiet.edu)"
            value={email}
            disabled={step === 'verify'}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />

          {step === 'signup' ? (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
              <motion.button
                onClick={handleSendOtp}
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  loading
                    ? 'bg-blue-800 cursor-not-allowed opacity-70'
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </motion.button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              />
              <motion.button
                onClick={handleVerifyOtp}
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  loading
                    ? 'bg-green-800 cursor-not-allowed opacity-70'
                    : 'bg-green-600 hover:bg-green-700 active:scale-95'
                }`}
              >
                {loading ? 'Verifying...' : 'Verify & Sign Up'}
              </motion.button>
            </>
          )}

          {status && (
            <motion.p
              className="mt-4 text-center text-sm text-yellow-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status}
            </motion.p>
          )}

          <motion.p
            className="mt-6 text-sm text-center text-zinc-400 hover:text-white cursor-pointer"
            onClick={() => router.push('/auth/login')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Already have an account? Login
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
