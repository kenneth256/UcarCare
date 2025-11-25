"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { easeInOut, motion, AnimatePresence } from "framer-motion";

const sectionVariations = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2, staggerChildren: 0.2 },
  },
};

const headingVariations = {
  hidden: { opacity: 0, y: 20, scale: 0.2, x: -60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.5, delay: 0.2, ease: easeInOut },
  },
};

const carImageVariants = {
  enter: {
    x: 800,
    opacity: 0,
    scale: 0.8,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4, ease: easeInOut },
    },
  },
  exit: {
    x: -800,
    opacity: 0,
    scale: 0.8,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4, ease: easeInOut },
    },
  },
};

const cars = [
  {
    name: "Car Model A",
    imageUrl:
      "https://www.mbzthousandoaks.com/inventoryphotos/15271/w1k6g7gb4sa323783/ip/2.jpg",
  },
  {
    name: "Car Model B",
    imageUrl:
      "https://www.mbofmilwaukeenorth.com/blogs/6562/wp-content/uploads/2024/12/c-class.jpg",
  },
  {
    name: "Car Model C",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/7fa0-110009311/W1K6G7GB2SA338511/c2ad54a82929ff6ad75f8dd573d3ecd2.jpg",
  },
];

const CarHero = () => {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  return (
    <motion.section
      variants={sectionVariations}
      initial="hidden"
      animate="visible"
      className="w-full  flex flex-col h-full justify-center items-center mt-4 px-4 gap-4"
    >
      <motion.h1
        variants={headingVariations}
        initial="hidden"
        animate="visible"
        className="uppercase text-center tracking-wider font-inter font-bold text-[100px] leading-tight"
      >
        Your next car
      </motion.h1>

      <div className="relative flex mt-5 overflow-hidden w-fit h-100 rounded-full justify-center items-center">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={cars[currentCarIndex].imageUrl}
            variants={carImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            loading="lazy"
            src={cars[currentCarIndex].imageUrl}
            alt={cars[currentCarIndex].name}
            className="max-w-3xl object-cover aspect-video"
          />
        </AnimatePresence>
      </div>
      <div className="flex gap-4">
        {cars.map((_, index) => (
          <Button
            key={index}
            className={`bg-black/50 -mt-2 w-6 h-2 p-0 transition-all duration-300 ${
              currentCarIndex === index ? "opacity-100" : "opacity-40"
            }`}
            onClick={() => setCurrentCarIndex(index)}
          ></Button>
        ))}
      </div>
    </motion.section>
  );
};

export default CarHero;
