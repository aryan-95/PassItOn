'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, PlusCircle, Compass, Heart } from 'lucide-react';
import { LogoutButton } from '@/components/LogoutButton';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#faf7ed] flex flex-col items-center w-full">

      {/* NAVIGATION HEADER */}
      <header className="w-full bg-[#5B3DF6] flex items-center justify-between px-6 py-5">
        <span className="text-white text-xl font-bold tracking-widest">PASS IT ON</span>
        <div className="flex items-center gap-4">
          <LogoutButton />
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        className="w-full flex flex-col md:flex-row items-center justify-between px-6 pt-8 pb-10 bg-[#03B1AA]"
        style={{ borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px' }}
      >
        <div className="flex-1 flex flex-col gap-7">
          <h1 className="font-black text-4xl md:text-5xl leading-tight text-white">
             <span className="text-[#FFE158]">PASS</span> Karo,<span className="text-[#FFE158]"> EARN</span> Karo <br />
            
          </h1>
          <div className="flex items-center mt-1">
            <div className="bg-[#faf7ed] rounded-full flex items-center px-5 py-[10px] w-full max-w-xs shadow-md">
              <svg className="w-5 h-5 text-[#5B3DF6] mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="bg-transparent w-full outline-none text-base text-[#23185B] placeholder-[#23185B] font-medium"
                placeholder="Search listings..."
                type="text"
              />
            </div>
          </div>
          {/* BUTTON ROW under search bar */}
          <div className="flex gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#FFE158] hover:bg-[#ffd900] text-[#23185B] font-bold flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all text-base"
              onClick={() => router.push('/seller')}
            >
              <PlusCircle size={20} />
              List an item
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#5B3DF6] hover:bg-[#3b278e] text-white font-bold flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all text-base"
              onClick={() => router.push('/buyer')}
            >
              <Compass size={20} />
              Browse
            </motion.button>
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center items-center mt-8 md:mt-0">
          <Image
            src="/student-illustration.svg"
            alt="Student illustration"
            width={300}
            height={300}
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* FEATURED LISTINGS */}
     <section className="w-full max-w-5xl px-6 pt-12 pb-10">
  <div className="bg-[#fff9e8] w-full rounded-2xl shadow-md py-8 px-6 flex flex-col">
    <h2 className="text-2xl font-bold text-[#23185B] mb-7">Featured Listings</h2>
    
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-7">
      <div className="flex flex-col items-center bg-[#f7f4e8] shadow-sm rounded-xl p-6 transition-transform hover:scale-105">
        <Image src="/icons/book.png" alt="Book" width={54} height={54} />
        <span className="mt-2 font-semibold text-lg text-[#23185B]">Textbooks</span>
        <span className="text-[#23185B]">$15</span>
      </div>
      <div className="flex flex-col items-center bg-[#f7f4e8] shadow-sm rounded-xl p-6 transition-transform hover:scale-105">
        <Image src="/coset.jpg" alt="Game Console" width={54} height={54} />
        <span className="mt-2 font-semibold text-lg text-[#23185B]">Co-Set</span>
        <span className="text-[#23185B]">₹700</span>
      </div>
      <div className="flex flex-col items-center bg-[#f7f4e8] shadow-sm rounded-xl p-6 transition-transform hover:scale-105">
        <Image src="/laptop.jpg" alt="Book" width={54} height={54} />
        <span className="mt-2 font-semibold text-lg text-[#23185B]">Laptop</span>
        <span className="text-[#23185B]">₹10000</span>
      </div>
      <div className="flex flex-col items-center bg-[#f7f4e8] shadow-sm rounded-xl p-6 transition-transform hover:scale-105">
        <Image src="/icons/headphones.png" alt="Headphones" width={54} height={54} />
        <span className="mt-2 font-semibold text-lg text-[#23185B]">Headphones</span>
        <span className="text-[#23185B]">$30</span>
      </div>
    </div>

    {/* 📞 Contact Info CTA */}
    <div className="mt-10 bg-[#ffedc2] text-center rounded-xl p-5 border border-[#ffd46b] shadow-md animate-pulse">
      <p className="text-lg font-semibold text-[#23185B]">
        📞 For more information, contact us at <span className="text-[#D93D04]">8273145433</span>
      </p>
    </div>

  </div>
</section>



      {/* HOW IT WORKS */}
      <section className="w-full max-w-5xl px-6 pt-4 pb-10">
        <div className="bg-[#ffefa9] w-full rounded-2xl shadow-md py-8 px-6 flex flex-col">
          <h2 className="text-2xl font-bold text-[#23185B] mb-7 px-2">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-9">
            <div className="flex flex-col items-center flex-1">
              <div className="bg-[#5B3DF6] p-3 rounded-full mb-2">
                <Image src="/icons/signup.png" alt="Sign Up" width={38} height={38} />
              </div>
              <div className="font-bold text-[#23185B] mb-1">Sign Up</div>
              <div className="text-[#23185B] text-center text-sm font-medium">
                Create an account<br />with your student email
              </div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="bg-[#03B1AA] p-3 rounded-full mb-2">
                <Image src="/icons/list.png" alt="List Items" width={38} height={38} />
              </div>
              <div className="font-bold text-[#23185B] mb-1">List Items</div>
              <div className="text-[#23185B] text-center text-sm font-medium">
                Upload your items for<br />sale in just minutes
              </div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="bg-[#FFE158] p-3 rounded-full mb-2">
                <Image src="/icons/connect.png" alt="Connect" width={38} height={38} />
              </div>
              <div className="font-bold text-[#23185B] mb-1">Connect</div>
              <div className="text-[#23185B] text-center text-sm font-medium">
                Chat with other<br />students and arrange
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full max-w-5xl px-6 pt-2 pb-10">
        <div className="bg-white shadow px-6 py-5 flex items-center gap-4 rounded-2xl">
          <Image
            src="/icons/student1.svg"
            alt="Testimonial user"
            width={48}
            height={48}
          />
          <span className="text-base text-[#23185B] font-medium">
            I found a great deal on a used textbook! The process was super easy
          </span>
          <button
            className="ml-auto bg-[#5B3DF6] hover:bg-[#3b278e] transition text-white font-bold px-7 py-2 rounded-full text-base shadow"
            onClick={() => router.push('/seller')}
          >
            List an item
          </button>
        </div>
      </section>

      {/* WISHLIST SECTION */}
      <motion.section
        className="w-full flex justify-center mt-10 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="w-full max-w-2xl bg-[#fff9e8] border-2 rounded-3xl shadow-lg p-7 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={28} className="text-pink-400" />
            <h2 className="text-2xl font-bold text-[#5B3DF6]">Wish for Something?</h2>
          </div>
          <p className="text-[#7c689c] text-base mb-6 text-center">
            Didn’t find what you want? <span className="text-[#e11d48] font-semibold">Submit your wish</span> &amp; we’ll let sellers know!
          </p>
          <form
            className="w-full flex flex-col gap-4 items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const itemRaw = formData.get("item");
              const item = typeof itemRaw === "string" ? itemRaw.trim() : "";
              const detailsRaw = formData.get("details");
              const details = typeof detailsRaw === "string" ? detailsRaw.trim() : "";
              if (!item) {
                alert("Please enter what you're looking for");
                return;
              }
              const res = await fetch("/api/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item, details }),
              });
              if (res.ok) {
                alert("✅ Your wish has been submitted!");
                form.reset();
              } else {
                alert("❌ Something went wrong.");
              }
            }}
          >
            <input
              name="item"
              type="text"
              placeholder="What do you need? (e.g., Lamp, Calculator)"
              className="w-full px-5 py-3 rounded-full bg-white border-2 border-pink-100 focus:border-pink-400 text-[#402973] placeholder-[#a78bfa] shadow-sm focus:outline-none text-base"
              required
            />
            <textarea
              name="details"
              rows={2}
              placeholder="Any details? (color, brand, etc.) (optional)"
              className="w-full px-5 py-3 rounded-2xl bg-white border-2 border-pink-100 focus:border-pink-400 text-[#402973] placeholder-[#a78bfa] shadow-sm focus:outline-none text-base"
            />
            <button
              type="submit"
              className="mt-1 px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition shadow font-bold text-white text-base flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Heart size={18} className="inline-block" />
              Submit Wish
            </button>
          </form>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="w-full pb-7 flex flex-col items-center gap-2 text-[#736a6a] text-[13px]">
        <motion.button
          whileHover={{ scale: 1.05, color: "#03B1AA" }}
          onClick={() => window.location.href = "mailto:freakyakkmu@gmail.com"}
          className="flex items-center gap-2 text-[#5B3DF6] font-semibold mt-2 transition-colors"
        >
          <Mail size={18} />
          Contact Us
        </motion.button>
        <span className="text-xs">© 2025 Passion Writers. All rights reserved.</span>
      </footer>
    </div>
  );
}
