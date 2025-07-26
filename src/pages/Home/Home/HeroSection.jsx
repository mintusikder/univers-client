import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const heroSlides = [
  {
    id: 1,
    image: "https://i.ibb.co/yKMBFCM/b2.webp",
    title: "Mega Fashion Sale!",
    subtitle: "Get up to 70% off on top brands!",
    buttonText: "Explore Now",
  },
  {
    id: 2,
    image: "https://i.ibb.co/Kx77MV7c/b1.webp",
    title: "Electronics Deals!",
    subtitle: "Best gadgets at unbeatable prices.",
    buttonText: "Shop Electronics",
  },
  {
    id: 3,
    image: "https://i.ibb.co/tTX7hhpR/s4.jpg",
    title: "Home Essentials Offer!",
    subtitle: "Stylish home upgrades at 60% off!",
    buttonText: "Browse Home Items",
  },
];

const HeroSection = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-screen"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-screen bg-cover bg-center relative flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-white space-y-6">
                <motion.h1
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="text-4xl md:text-6xl font-bold"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9 }}
                  className="text-lg md:text-2xl"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#F07F13] hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full"
                >
                  {slide.buttonText}
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
