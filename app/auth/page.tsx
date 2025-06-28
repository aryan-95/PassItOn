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
  const [userExists, setUserExists] = useState(false); // NEW

  const handleSendOtp = async () => {
    setLoading(true);
    setStatus('');
    setUserExists(false);

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
      if (data.userExists) {
        setUserExists(true);
        setTimeout(() => router.push('/auth/login'), 2000); // Auto redirect
      }
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
      setTimeout(() => router.push('/'), 1000);
    } else {
      setStatus(`❌ ${data.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex-col text-white flex items-center justify-center px-6">
      <div>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/logo.png"
            alt="Startup Logo"
            width={100}
            height={100}
            className="mx-auto rounded-full"
          />
        </motion.div>
      </div>

      <div className="bg-zinc-900 p-8 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 'signup' ? 'Sign Up with OTP' : 'Enter OTP'}
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          disabled={step === 'verify'}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        {step === 'signup' ? (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700"
            >
              {loading ? 'Verifying...' : 'Verify & Sign Up'}
            </button>
          </>
        )}

        {status && (
          <p className="mt-4 text-center text-sm text-yellow-400">{status}</p>
        )}

        {userExists && (
          <p
            onClick={() => router.push('/auth/login')}
            className="mt-2 text-sm text-green-400 underline text-center cursor-pointer"
          >
            Login Now →
          </p>
        )}

        <p
          className="mt-6 text-sm text-center text-zinc-400 hover:text-white cursor-pointer"
          onClick={() => router.push('/auth/login')}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
