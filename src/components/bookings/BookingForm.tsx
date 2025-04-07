
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquareQuote, Loader2 } from 'lucide-react';

// Form schema with validation
const bookingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  contact: z.string().min(5, {
    message: "Please provide a valid email or phone number.",
  }),
  service: z.string({
    required_error: "Please select a service.",
  }),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  onSubmit: (data: BookingFormValues) => void;
  isSubmitting: boolean;
  formSubmitted: boolean;
}

const BookingForm = ({ onSubmit, isSubmitting, formSubmitted }: BookingFormProps) => {
  // Initialize form with react-hook-form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      service: "",
      message: "",
    },
  });

  // Available services
  const services = [
    "Residential Cleaning",
    "Commercial Cleaning",
    "Deep Cleaning",
    "Post-Construction Cleaning",
    "Move In/Move Out Cleaning",
    "Office Cleaning",
    "Carpet Cleaning",
    "Window Cleaning",
    "Other Services"
  ];
  
  // Handle form submission
  const handleSubmit = (values: BookingFormValues) => {
    onSubmit(values);
  };
  
  if (formSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-8 text-center animate-reveal">
        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <MessageSquareQuote size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-brand-primary mb-3">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          Your quotation request has been sent. We're connecting you with our team via WhatsApp for a personalized response.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-brand-primary hover:bg-brand-secondary text-white"
        >
          Request Another Quote
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 animate-reveal">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-primary">Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-primary">Email or Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email or phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-primary">Service Required</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-primary">Additional Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us more about your cleaning needs (optional)" 
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-6 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <MessageSquareQuote size={20} />
                <span>Get My Quotation Now</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
