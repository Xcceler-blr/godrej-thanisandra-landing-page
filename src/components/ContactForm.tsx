import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HubSpotIntegration } from "@/lib/hubspot-integration";
import { useNavigate } from "react-router-dom";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  downloadUrl?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").nonempty("Name is required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = ({ isOpen, onClose, title = "Get in Touch", downloadUrl }: ContactFormProps) => {
  const [thankYou, setThankYou] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: ""
    },
  });

  // Allowed Purpose options for Google Form
  const PURPOSE_OPTIONS = [
    "About - Learn More About Godrej",
    "Floor Plan - Download Floor Plans",
    "Project Highlights - Schedule Site Visit",
    "Amenities - Schedule Amenities Tour",
    "Learn More About Location",
    "Pre-Launch Special Offer",
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
    if (title.includes("Pre-Launch") || title.includes("Special Offer")) return "Pre-Launch Special Offer";
    return "Get in Touch";
  }

  // Map form titles to HubSpot form types
  function getHubSpotFormType(title: string): 'download' | 'lead-capture' | 'site-visit' | 'booking-offer' {
    if (title.includes("Floor Plan") || title.includes("Download")) {
      return 'download';
    } else if (title.includes("Site Visit") || title.includes("Schedule")) {
      return 'site-visit';
    } else if (title.includes("Pre-Launch") || title.includes("Special Offer")) {
      return 'booking-offer';
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
      formPayload.append("entry.1294608166", getPurposeValue(title)); // Purpose
      
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
        phone: data.phone,
        additionalData: {
          source: title,
          page_url: window.location.href
        }
      });

      // If a download URL is provided, trigger download before redirect
      if (downloadUrl) {
        try {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', '');
          link.setAttribute('target', '_blank');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          console.warn('Download trigger failed:', e);
        }
      }

      // Redirect to Thank You page
      reset();
      onClose();
      navigate('/thank-you');
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
          <DialogTitle className="text-center text-xl font-bold text-primary mb-10">
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

            <Button type="submit" variant="cta" className="w-full mt-6" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </form>
        )}

        </div>
      </DialogContent>
    </Dialog>
  );
};