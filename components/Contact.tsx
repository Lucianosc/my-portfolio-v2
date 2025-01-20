import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "./Footer";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

type ContactFormData = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Reset form and show success message
      reset();
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
    } catch (error) {
      console.error(
        "Error submitting form:",
        error,
        error instanceof Error ? error.message : "Failed to send message"
      );
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to send message",
      });
    }
  };

  return (
    <>
      <section
        ref={ref}
        className="p-4 w-full container flex justify-center items-center flex-1"
      >
        <div className="container p-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-white">
                Let&apos;s talk
              </h2>
              {submitStatus.type && (
                <div
                  className={`mb-4 p-4 rounded-xl ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input
                      {...register("fullName", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      aria-invalid={!!errors.fullName}
                      required
                      placeholder="Full name"
                      className="bg-background border-none text-foreground"
                    />
                    {errors.fullName && (
                      <p className="text-error text-sm">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      aria-invalid={!!errors.email}
                      required
                      type="email"
                      placeholder="Email"
                      className="bg-background border-none text-foreground"
                    />
                    {errors.email && (
                      <p className="text-error text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 5,
                        message: "Subject must be at least 5 characters",
                      },
                    })}
                    aria-invalid={!!errors.subject}
                    required
                    placeholder="Subject"
                    className="bg-background border-none text-foreground"
                  />
                  {errors.subject && (
                    <p className="text-error text-sm">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Textarea
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    aria-invalid={!!errors.message}
                    required
                    placeholder="Message"
                    className="bg-background border-none text-foreground min-h-[200px]"
                  />
                  {errors.message && (
                    <p className="text-error text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="relative inset-0 flex items-center justify-center w-full md:w-auto bg-background text-primary border border-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <LoaderCircle
                    className={`absolute animate-spin ${
                      isSubmitting ? "block" : "invisible"
                    }`}
                    strokeWidth={3}
                  />
                  <p className={`${isSubmitting ? "invisible" : "block"}`}>
                    Send!
                  </p>
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

export default Contact;
