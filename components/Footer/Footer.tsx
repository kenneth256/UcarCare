"use client";
import { motion } from "framer-motion";
import { Settings, Award, Shield, Zap } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: any) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  }),
};

const bannerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.6,
    },
  },
};

const CarBenefits = () => {
  const benefits = [
    {
      icon: Settings,
      title: "Easy Process",
      description:
        "At Unique Car, we offer a range of benefits when you purchase a car from us. Our cars come with a warranty to give you peace of mind, and our exceptional you",
    },
    {
      icon: Award,
      title: "Fast Approval",
      description:
        "At Unique Car, we offer a range of benefits when you purchase a car from us. Our cars come with a warranty to give you peace of mind, and our exceptional you",
    },
    {
      icon: Shield,
      title: "Secure Delivery",
      description:
        "At Unique Car, we offer a range of benefits when you purchase a car from us. Our cars come with a warranty to give you peace of mind, and our exceptional you",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-2xl font-medium text-black/60">
          Find Your Dream Car
        </p>
        <h2 className="text-5xl font-bold mt-4 mb-4 font-mona">
          PICK YOUR CAR
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`relative p-8 rounded-3xl ${
              index === 1 ? "bg-white shadow-xl" : "bg-gray-100"
            }`}
          >
            {/* Icon */}
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
              <benefit.icon
                className="w-10 h-10 text-white"
                strokeWidth={1.5}
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center mb-4 text-black">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-center text-sm mb-6 leading-relaxed">
              {benefit.description}
            </p>

            {/* Button */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg">
              Learn More
            </button>
          </motion.div>
        ))}
      </div>

      {/* Free Test Drive Banner */}
      <motion.div
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative bg-black rounded-[3rem] overflow-hidden h-64 flex items-center"
      >
        {/* Lightning Icon */}
        <div className="absolute left-12 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center z-10">
          <Zap className="w-16 h-16 text-black fill-black" />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center px-4 z-10">
          <h2 className="text-white text-6xl font-bold uppercase tracking-wider mb-2">
            FREE TEST DRIVE
          </h2>
          <p className="text-white/80 text-sm">
            Sign up for early access and be the first to experience
          </p>
        </div>

        {/* Car Image */}
        <div className="absolute right-0 top-0 h-full w-1/3">
          <img
            src="https://purepng.com/public/uploads/large/purepng.com-grey-carcarvehicletransportgrey-9615246266959cnhy.png"
            alt="Car"
            className="h-full w-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CarBenefits;
