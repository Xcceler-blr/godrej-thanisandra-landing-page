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
    
    // Ensure full height on body and html
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
  }, []);

  return (
    <div 
      className="relative flex items-center justify-center overflow-hidden px-4 py-16"
      style={{
        minHeight: '100vh',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Background Image */}
      <img
        src="/Assets/godrej.webp"
        alt="Godrej Thanisandra Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ 
          objectFit: 'cover', 
          objectPosition: 'center',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
        decoding="async"
        width="1920"
        height="1080"
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-lg w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-white/20">
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


