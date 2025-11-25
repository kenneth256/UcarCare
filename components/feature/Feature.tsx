"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featuredcars } from "@/libs/utils";
import { LockIcon } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const discoverVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

const subheadingVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
  },
};

const carItemVariants = {
  hidden: (index: any) => ({
    opacity: 0,
    x: index % 2 === 0 ? 100 : -100,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Feature = () => {
  const carRef = useRef(null);
  const isInView = useInView(carRef, { once: true, amount: 0.2 });

  return (
    <div className="w-full min-h-screen py-20 px-4 mb-10">
      {/* Heading Section */}
      <div className="flex flex-col justify-center text-center mb-16">
        <motion.p
          variants={discoverVariants}
          initial="hidden"
          animate="visible"
          className="text-sm uppercase tracking-widest text-gray-500 mb-4"
        >
          Discover
        </motion.p>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl uppercase md:text-6xl font-bold font-mona mb-4"
        >
          Featured Prominently
        </motion.h2>
        <motion.p
          variants={subheadingVariants}
          initial="hidden"
          animate="visible"
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Explore our wide selection of modern luxury vehicles
        </motion.p>
      </div>

      {/* Cars Grid */}
      <motion.div
        ref={carRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {featuredcars.map((car, index) => (
          <motion.div
            variants={carItemVariants}
            custom={index}
            key={index}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden">
              <img
                src={car.imageUrl}
                alt={car.carName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Lock Icon */}
              <div className="absolute top-4 right-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                  <LockIcon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Car Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-1">{car.carName}</h4>
                <p className="text-sm text-gray-300 uppercase tracking-wide mb-2">
                  {car.color}
                </p>
              </div>
            </div>

            {/* Price Section */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Starting at
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {car.price}
                  </p>
                </div>
                <button className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 text-sm">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Feature;
