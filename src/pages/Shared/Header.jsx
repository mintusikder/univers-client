import React, { useState, useEffect, useRef } from "react";

const categories = ["Electronics", "Fashion", "Home", "Toys", "Books"];

const Header = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    }
    if (isCategoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

  // Handle category selection
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setIsCategoryOpen(false);
  };

  return (
    <div className="bg-[#f07f13] py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <svg
            width="36"
            height="36"
            viewBox="0 0 157 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-bold text-white text-base">ShopLogo</span>
        </div>

        {/* Middle: Search with category dropdown */}
        <div className="flex-1 max-w-xl w-full">
          <div className="relative flex bg-white rounded-full overflow-hidden items-center">
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="font-medium text-black flex items-center gap-1 hover:text-[#f07f13] transition-colors duration-200 px-4 py-3 rounded-l-full"
                aria-haspopup="true"
                aria-expanded={isCategoryOpen}
                type="button"
                aria-label="Select category"
              >
                {selectedCategory}
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

              {isCategoryOpen && (
                <ul className="absolute top-full mt-2 w-40 bg-black text-black border border-gray-200 rounded shadow-lg z-50">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-[#f07f13] hover:text-black transition-colors duration-200"
                        onClick={() => handleCategorySelect(cat)}
                        type="button"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 text-gray-900 text-sm focus:outline-none rounded-r-full"
            />
            <button
              className="px-4 text-gray-600 hover:text-[#f07f13] transition-colors duration-200"
              aria-label="Search products"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-5.2-5.2M4 11a7 7 0 1114 0 7 7 0 01-14 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Wishlist and Cart Icons */}
        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <button
            className="relative"
            aria-label="Wishlist"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21.364 4.318 13.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
          </button>

          {/* Shopping Cart */}
          <button
            className="relative"
            aria-label="Shopping cart"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4a1 1 0 00.98 1.2h11.44a1 1 0 00.98-1.2L17 13M7 13h10"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
