import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Thank You | Godrej Thanisandra";
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Thanks for your enquiry. Our team will contact you shortly.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16">
      <img
        src="/Assets/Godrej.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 thank-you-bg"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        decoding="async"
        width="1200"
        height="800"
      />
      <div className="relative z-10 max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #B9105E 0%, #3777C5 50%, #56A7E0 100%)" }}>
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Thank You!</h1>
        <p className="text-muted-foreground mb-8">We’ve received your enquiry. Our executive will reach out to you shortly to assist further.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/')} className="!bg-[#B9105E] !text-white hover:!bg-[#a00d4e] px-8">Return to Home</Button>
          <a href="/" className="hidden" aria-hidden="true">Home</a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;


