import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="w-full text-sm text-white">

      {/* Main Navbar */}
      <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 shadow">
        {/* Left Section: Logo + Category */}
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold text-[#f07f13]">MyShop</div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="font-medium flex items-center gap-1 hover:text-[#f07f13] transition"
            >
              Category
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {isCategoryOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50 text-gray-800"
                >
                  {["Electronics", "Fashion", "Home", "Toys", "Books"].map(
                    (cat) => (
                      <li key={cat}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-[#f07f13] hover:text-white transition"
                          onClick={() => setIsCategoryOpen(false)}
                        >
                          {cat}
                        </a>
                      </li>
                    )
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Middle: Search Box */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-2 w-80">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none text-sm text-gray-800"
          />
          <FaSearch className="text-gray-500" />
        </div>

        {/* Right: Nav Links + Icons */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <a href="#" className="hover:text-[#f07f13] transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#f07f13] transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#f07f13] transition">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#f07f13] transition">
                Pricing
              </a>
            </li>
          </ul>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4 text-lg">
            <FaHeart className="hover:text-[#f07f13] cursor-pointer" />
            <FaShoppingCart className="hover:text-[#f07f13] cursor-pointer" />
          </div>

          {/* CTA Button */}
          <button className="hidden md:inline bg-white hover:bg-gray-50 border border-gray-300 px-6 py-2 rounded-full active:scale-95 transition-all">
            Get started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4 5h16M4 12h16M4 19h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-sm text-gray-900 px-6 py-4"
          >
            <ul className="space-y-4">
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>

            <div className="mt-4 flex gap-4 text-lg">
              <FaHeart className="hover:text-[#f07f13] cursor-pointer" />
              <FaShoppingCart className="hover:text-[#f07f13] cursor-pointer" />
            </div>

            <button className="mt-6 w-full bg-white text-gray-700 border border-gray-300 py-2 rounded-full hover:bg-gray-50">
              Get started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
