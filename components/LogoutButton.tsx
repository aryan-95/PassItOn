"use client";
import { LogOut } from "lucide-react"; // Or your preferred icon
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Place your original logout logic here
    router.push("/auth"); // OR your actual sign-out action
  };

  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleLogout}
      type="button"
      className="
        flex items-center gap-2
        px-5 py-2
        rounded-full
        bg-white
        text-[#5B3DF6]
        font-semibold
        shadow-md
        transition
        hover:bg-[#ffe158]
        hover:text-[#23185B]
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-[#5B3DF6]
        text-base
      "
      title="Logout"
    >
      <LogOut size={18} strokeWidth={2} />
      Logout
    </motion.button>
  );
}
