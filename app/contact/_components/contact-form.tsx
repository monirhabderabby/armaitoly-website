"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { baseUrl } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message must not exceed 1000 characters." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function ContactForm({ isSubmitting = false }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["contact"],
    mutationFn: (data: ContactFormValues) =>
      fetch(`${baseUrl}/contact`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    mutate(values);
    form.reset();
  };

  const isLoading = isSubmitting || isPending;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Name"
                  className="h-9 rounded-none border-gray-300 bg-white text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="hello@example.com"
                  className="h-9 rounded-none border-gray-300 bg-white text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write here..."
                  rows={4}
                  className="resize-none rounded-none border-gray-300 bg-white text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 rounded-none bg-primary/90 hover:bg-primary cursor-pointer text-white text-sm font-medium tracking-wide transition-colors duration-200 disabled:opacity-60"
        >
          {isLoading ? "Sending..." : "Contact Us"}
        </Button>
      </form>
    </Form>
  );
}
