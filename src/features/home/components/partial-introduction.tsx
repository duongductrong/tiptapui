"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Badge } from "@/components/ui/badge"
import { motion, Variants } from "motion/react"

export interface PartialIntroductionProps {}

const variants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

const PartialIntroduction = (props: PartialIntroductionProps) => {
  return (
    <motion.div
      className="flex flex-col py-12 md:py-16 items-center text-center"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
    >
      <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
        Shadcn/ui + tiptap
      </Badge>

      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Extend Your Editor&apos;s
        </h2>
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
          Capabilities
        </h2>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 space-y-2 max-w-2xl">
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Customize workflows, enhance formatting, and maintain
          <span className="font-medium text-foreground">
            {" "}
            full control
          </span>{" "}
          over your content
        </p>
      </motion.div>
    </motion.div>
  )
}

export default PartialIntroduction
