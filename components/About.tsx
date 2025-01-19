import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="container p-4 flex flex-col gap-4">
      <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
      <div className="flex flex-col gap-8 justify-center items-center sm:flex-row">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-end max-w-sm sm:max-w-lg min-w-[296px]"
        >
          <Image
            src={"/Capybara.png"}
            alt={"Logo image"}
            width={500}
            height={500}
          />
        </motion.div>
        <div className="flex flex-col space-y-6 max-w-sm sm:max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-white/10 text-white p-4 rounded-3xl rounded-bl-none"
          >
            <p className="text-xl">
              I was born in the middle of the Sierras in Tandil, Argentina.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="group relative bg-white/10 text-white p-4 rounded-3xl rounded-bl-none"
          >
            <p className="text-xl">
              I&apos;m passionate about nature and love to bring organic,
              <span className="text-primary"> usability-focused</span>{" "}
              solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="group relative bg-white/10 text-white p-4 rounded-3xl rounded-bl-none"
          >
            <p className="text-xl">
              I try to make things easy, always keeping an eye on{" "}
              <span className="text-primary">user experience</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
