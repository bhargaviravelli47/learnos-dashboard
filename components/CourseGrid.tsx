"use client";

import { motion } from "framer-motion";
import { Course } from "@/types";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {courses.map((course, index) => (
        <motion.div key={course.id} variants={itemVariants}>
          <CourseCard course={course} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
