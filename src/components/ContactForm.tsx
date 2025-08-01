import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, Phone, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HubSpotIntegration } from "@/lib/hubspot-integration";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").nonempty("Name is required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = ({ isOpen, onClose, title = "Get in Touch" }: ContactFormProps) => {
  const [thankYou, setThankYou] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      consent: false as any, // Type assertion to handle the literal type
    },
  });

  // Allowed Purpose options for Google Form
  const PURPOSE_OPTIONS = [
    "About - Learn More About Godrej",
    "Floor Plan - Download Floor Plans",
    "Project Highlights - Schedule Site Visit",
    "Amenities - Schedule Amenities Tour",
    "Learn More About Location",
    "Get in Touch"
  ];
  function getPurposeValue(title: string) {
    if (!title) return "Get in Touch";
    if (PURPOSE_OPTIONS.includes(title)) return title;
    if (title.includes("About")) return "About - Learn More About Godrej";
    if (title.includes("Floor Plan")) return "Floor Plan - Download Floor Plans";
    if (title.includes("Project Highlights")) return "Project Highlights - Schedule Site Visit";
    if (title.includes("Amenities")) return "Amenities - Schedule Amenities Tour";
    if (title.includes("Location")) return "Learn More About Location";
    return "Get in Touch";
  }

  // Map form titles to HubSpot form types
  function getHubSpotFormType(title: string): 'download' | 'lead-capture' | 'site-visit' {
    if (title.includes("Floor Plan") || title.includes("Download")) {
      return 'download';
    } else if (title.includes("Site Visit") || title.includes("Schedule")) {
      return 'site-visit';
    } else {
      return 'lead-capture';
    }
  }

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    
    try {
      // Submit to Google Forms (existing functionality)
      const formPayload = new FormData();
      formPayload.append("entry.1338687725", data.name);
      formPayload.append("entry.1492404407", data.phone);
      formPayload.append("entry.1765571584", data.email);
      formPayload.append("entry.1294608166", getPurposeValue(title)); // Purpose
      formPayload.append("entry.182177265", data.consent ? "I agree to be contacted regarding my enquiry" : ""); // Consent
      
      // Submit to Google Forms
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfmhAoHV0oaodPJsJuhcXyDF554xaGkKqaQAkXTd-lCmGexaA/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formPayload,
      });

      // Submit to HubSpot (new functionality)
      const hubSpotFormType = getHubSpotFormType(title);
      await HubSpotIntegration.submitToForm(hubSpotFormType, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        consent: data.consent,
        additionalData: {
          source: title,
          page_url: window.location.href
        }
      });

      setThankYou("Thank you for your interest! Our executive will contact you shortly to assist you further.");
      reset();
    } catch (err) {
      console.error('Form submission error:', err);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your enquiry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Extract user-facing title (remove section identifier if present)
  let userTitle = title;
  if (title && title.includes(' - ')) {
    userTitle = title.split(' - ').slice(1).join(' - ');
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => { setThankYou(null); onClose(); }}>
      <DialogContent
        style={{ borderRadius: '10px' }}
        onPointerDownOutside={onClose}
      >
        <div className="px-[20px] pr-[30px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary">
            {thankYou ? "Thank You!" : userTitle}
          </DialogTitle>
        </DialogHeader>
        {thankYou ? (
          <div className="py-8 text-center">
            <p className="text-base text-muted-foreground mb-6">{thankYou}</p>
            <Button className="mx-auto" onClick={() => { setThankYou(null); onClose(); }}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your full name"
                autoComplete="name"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="Enter your phone number"
                autoComplete="tel"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="consent"
                type="checkbox"
                {...register("consent")}
                className="accent-primary w-4 h-4"
              />
              <label htmlFor="consent" className="text-sm select-none cursor-pointer">
                I agree to be contacted regarding my enquiry
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-red-500 mt-1">{errors.consent.message}</p>
            )}
            <Button type="submit" variant="cta" className="w-full mt-6" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </form>
        )}
        {!thankYou && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            By submitting this form, you agree to receive updates about Godrej Thanisandra.
          </p>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
};