"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "./Footer";

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <section
        ref={ref}
        className="py-20 w-full flex items-center justify-center flex-1"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">
                Let&apos;s talk
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Full name"
                    className="bg-background border-none text-text "
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-background border-none text-text "
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="bg-background border-none text-text "
                />
                <Textarea
                  placeholder="Message"
                  className="bg-background border-none text-text  min-h-[200px]"
                />
                <div className="text-error text-sm">
                  Please complete required fields correctly
                </div>
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-background text-primary border border-primary hover:bg-primary hover:text-background transition-colors"
                >
                  Send!
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
