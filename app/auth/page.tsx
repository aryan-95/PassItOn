'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      setStatus('✅ OTP sent to your email');
      setStep('verify');
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
        window.location.href = '/';
      }, 1000);
    } else {
      setStatus(`❌ ${data.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="bg-zinc-900 p-8 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 'signup' ? 'Sign Up with OTP' : 'Enter OTP'}
        </h2>

        <input
          type="email"
          placeholder="Email (must be @kiet.edu)"
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
      </div>
    </div>
  );
}
