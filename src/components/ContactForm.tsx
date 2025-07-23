import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, Phone, Mail, User } from "lucide-react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ContactForm = ({ isOpen, onClose, title = "Get in Touch" }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [thankYou, setThankYou] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsentError("");
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to proceed.",
        variant: "destructive",
      });
      return;
    }
    if (!consent) {
      setConsentError("You must agree to be contacted regarding your enquiry.");
      return;
    }
    setSubmitting(true);
    // Google Form POST
    const formPayload = new FormData();
    formPayload.append("entry.1338687725", formData.name);
    formPayload.append("entry.1492404407", formData.phone);
    formPayload.append("entry.1765571584", formData.email);
    formPayload.append("entry.1294608166", getPurposeValue(title)); // Purpose
    formPayload.append("entry.182177265", consent ? "I agree to be contacted regarding my enquiry" : ""); // Consent
    try {
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfmhAoHV0oaodPJsJuhcXyDF554xaGkKqaQAkXTd-lCmGexaA/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formPayload,
      });
      setThankYou("Thank you for your interest! Our executive will contact you shortly to assist you further.");
      setFormData({ name: "", phone: "", email: "" });
      setConsent(false);
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your enquiry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="accent-primary w-4 h-4"
                required
              />
              <label htmlFor="consent" className="text-sm select-none cursor-pointer">
                I agree to be contacted regarding my enquiry
              </label>
            </div>
            {consentError && (
              <p className="text-xs text-red-500 mt-1">{consentError}</p>
            )}
            <Button type="submit" variant="cta" className="w-full mt-6" disabled={!consent || submitting}>
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