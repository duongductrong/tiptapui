"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"

export interface PartialIntroductionProps {}

const PartialIntroduction = (props: PartialIntroductionProps) => {
  return (
    <motion.div
      className="flex flex-col py-12 md:py-16 items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
        Powered by Tiptap
      </Badge>

      <div className="space-y-3">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Extend Your Editor&apos;s
        </h2>
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">
          Capabilities
        </h2>
      </div>

      <div className="mt-6 space-y-2 max-w-2xl">
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Customize workflows, enhance formatting, and maintain
          <span className="font-medium text-foreground">
            {" "}
            full control
          </span>{" "}
          over your content
        </p>
      </div>
    </motion.div>
  )
}

export default PartialIntroduction
