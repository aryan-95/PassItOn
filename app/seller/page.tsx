"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setStatus("Submitting...");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      console.error(err);
      setStatus("❌ Error submitting the form.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-black px-4 py-10 text-white"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-zinc-900 p-8 rounded-xl shadow-xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">List a Product</h2>

        {/* Input fields */}
        {["title", "price", "phone"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={
              field === "title"
                ? "Item Title"
                : field === "price"
                  ? "Price (INR)"
                  : "Contact Phone Number"
            }
            value={(formData as any)[field]}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        ))}

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Stationery">Stationery</option>
          <option value="Other">Other</option>
        </select>

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white cursor-pointer file:cursor-pointer"
        />

        {/* Preview */}
        {formData.image && (
          <motion.img
            src={formData.image}
            alt="Preview"
            className="mb-4 w-full h-48 object-cover rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* College (disabled) */}
        {/* College select */}
        <select
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">Select Your College</option>
          <option value="KIET Group of Institutions">
            KIET Group of Institutions
          </option>
          <option value="Bennett University">Bennett University</option>
          <option value="Shiv Nadar University">Shiv Nadar University</option>
          <option value="PSIT">PSIT</option>
        </select>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all disabled:opacity-60"
          disabled={uploading}
        >
          {uploading ? "Please wait..." : "Submit"}
        </motion.button>

        {/* Status */}
        {status && (
          <motion.p
            className="text-sm text-center mt-4 text-yellow-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {status}
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
}
