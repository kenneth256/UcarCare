"use client";
import { leftTyres, rightTyres } from "@/libs/utils";
import { motion } from "framer-motion";
import { Car, Server } from "lucide-react";
import { Button } from "../ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -80 : 80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const tyreVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const SubHero = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-7xl min-h-screen rounded-3xl mt-10 px-4"
    >
      <div className="w-full h-full flex flex-col lg:flex-row gap-14 py-10 items-center">
        {/* Left Content */}
        <div className="flex-1">
          <motion.h2
            variants={leftVariants}
            className="text-4xl md:text-5xl font-bold mb-4 font-inter uppercase max-w-[450px] font-mona leading-tight"
          >
            Find your dream car today
          </motion.h2>

          <motion.p
            variants={leftVariants}
            className="font-mono text-md text-black/60 mb-6"
          >
            At Unique car we offer a wide selection of vehicles to suit your
            needs and budget. Browse our inventory and discover the perfect car
            for you.
          </motion.p>

          <div className="flex w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quality Cars Card */}
              <motion.div
                custom="left"
                variants={cardVariants}
                className="space-y-3"
              >
                <span className="flex mb-2 items-center gap-2 font-mono font-bold text-black/80">
                  <Car className="w-6 h-6 text-white bg-black/75 rounded-full p-1" />
                  Quality Cars
                </span>
                <p className="font-mono text-xs text-black/60">
                  Explore our extensive collection of well-maintained vehicles,
                  each thoroughly inspected to ensure top-notch quality and
                  performance.
                </p>
              </motion.div>

              {/* Exceptional Services Card */}
              <motion.div
                custom="right"
                variants={cardVariants}
                className="space-y-3"
              >
                <span className="flex items-center gap-2 font-mono font-bold text-black/80 mb-2">
                  <Server className="w-6 h-6 text-white bg-black/75 rounded-full p-1" />
                  Exceptional services
                </span>
                <p className="font-mono text-xs text-black/60">
                  Experience exceptional customer service from our dedicated
                  team, committed to assisting you at every step of your
                  car-buying journey.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Buttons */}
          <motion.div variants={leftVariants} className="flex gap-4 mt-8">
            <Button className="rounded-full bg-blue-400 font-bold text-white hover:bg-blue-500 transition-colors">
              Sign Up
            </Button>
            <Button
              variant="ghost"
              className="rounded-full font-bold border-0 text-black/75 hover:bg-black/5"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Right Image Section */}
        <motion.div
          variants={rightVariants}
          className="flex-1 relative h-80 lg:h-96 w-full"
        >
          <motion.img
            variants={imageVariants}
            src="https://vehicle-images.dealerinspire.com/9ac5-110009892/W1KLF6DB2SA104437/f7da4a8698f6fae66a5d3a613a522a58.jpg"
            alt="luxury car"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />

          {/* Left Tyre */}
          <motion.div
            variants={tyreVariants}
            className="absolute z-20 -bottom-15 left-10 w-32 h-32 lg:w-40 lg:h-40 rounded-full"
          >
            <img
              alt="car tyre"
              src={rightTyres}
              className="object-cover w-full h-full rounded-full shadow-2xl border-4 border-white"
            />
          </motion.div>

          {/* Right Tyre */}
          <motion.div
            variants={tyreVariants}
            className="absolute z-20 -bottom-15 right-10 w-32 h-32 lg:w-40 lg:h-40 rounded-full"
          >
            <img
              alt="car tyre"
              src={rightTyres}
              className="object-cover w-full h-full rounded-full shadow-2xl border-4 border-white"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SubHero;
