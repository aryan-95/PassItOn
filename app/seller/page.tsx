"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, UploadCloud } from "lucide-react";

export default function SellerPage() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    college: "KIET Group of Institutions",
    phone: "",
  });

  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus("Uploading image...");

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (res.ok) {
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      setStatus("✅ Image uploaded");
    } else {
      setStatus("❌ Image upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, price, phone } = formData;
    const numericPrice = parseInt(price);
    if (title.trim().length < 3) {
      setStatus("❌ Title must be at least 3 characters.");
      return;
    }
    if (isNaN(numericPrice) || numericPrice < 10 || numericPrice > 50000) {
      setStatus("❌ Price must be between ₹10 and ₹50,000.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setStatus("❌ Phone number must be 10 digits.");
      return;
    }
    setStatus("Submitting...");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: numericPrice }),
      });
      if (res.ok) {
        setStatus("✅ Product listed successfully!");
        setFormData({
          title: "",
          price: "",
          category: "",
          image: "",
          college: "KIET Group of Institutions",
          phone: "",
        });
      } else {
        setStatus("❌ Failed to submit. Try again.");
      }
    } catch (err) {
      setStatus("❌ Error submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7ed] flex flex-col items-center justify-center">
      <div className="relative flex flex-col lg:flex-row items-center justify-center w-full h-full pt-10 pb-14 px-2 md:px-0 max-w-5xl mx-auto">
        {/* Bubbly Side Blob/Illustration for Desktop */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-center pr-10">
          <motion.img
            src="/student-illustration.svg"
            alt="Student listing illustration"
            className="w-64 max-w-xs drop-shadow-lg"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          />
          <p className="mt-4 text-xl font-semibold text-[#5B3DF6] text-center">
            Ready to pass it on? <br /> List your unused items for your campus!
          </p>
        </div>

        {/* FORM CARD */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 max-w-lg w-full bg-white/90 border-2 border-[#E0D5FA] shadow-2xl rounded-3xl p-8 md:p-10 flex flex-col gap-5 mx-auto"
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.13, duration: 0.57 }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B3DF6] mb-2 text-center flex items-center justify-center gap-2">
            <PlusCircle size={28} className="text-[#5B3DF6]" />
            List a Product
          </h2>

          {/* 2-col grid for more info above lg, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Item Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-[#5B3DF6] focus:outline-none text-base shadow placeholder-[#a78bfa] font-semibold transition"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (INR)"
              value={formData.price}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-[#22C55E] focus:outline-none text-base shadow placeholder-[#a78bfa] font-semibold transition"
            />
            <input
              type="text"
              name="phone"
              placeholder="Contact Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-[#EA4CA3] focus:outline-none text-base shadow placeholder-[#a78bfa] font-semibold transition"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-[#5B3DF6] focus:outline-none text-base shadow font-semibold"
            >
              <option value="">Select Category</option>
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Stationery">Stationery</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="w-full flex flex-col gap-2 pt-2">
            <label className="text-base font-bold text-[#5B3DF6] flex items-center gap-1">
              <UploadCloud size={18} /> Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-5 py-2 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] file:font-bold file:px-5 file:py-2 cursor-pointer"
              disabled={uploading}
            />
            {formData.image && (
              <motion.div
                className="mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.28 }}
              >
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-contain bg-[#ffe7fc] rounded-2xl shadow border-2 border-[#f3e8ff]"
                />
              </motion.div>
            )}
          </div>

          {/* COLLEGE SELECT */}
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 mt-1 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-[#5B3DF6] focus:outline-none text-base shadow font-semibold"
          >
            <option value="">Select Your College</option>
            <option value="KIET Group of Institutions">KIET Group of Institutions</option>
            <option value="Bennett University">Bennett University</option>
            <option value="Shiv Nadar University">Shiv Nadar University</option>
            <option value="PSIT">PSIT</option>
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 mt-2 bg-[#FFE158] hover:bg-yellow-400 text-[#23185B] rounded-full font-bold shadow-lg transition-all disabled:opacity-70"
            disabled={uploading}
          >
            {uploading ? "Please wait..." : "Submit Product"}
          </motion.button>

          {status && (
            <motion.div
              className={`text-base text-center mt-3 font-bold ${
                status.startsWith("✅")
                  ? "text-green-500"
                  : status.startsWith("❌")
                  ? "text-pink-500"
                  : "text-[#5B3DF6]"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status}
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
}
